import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { ZODIAC_DATA, ZodiacSign } from "@/lib/fortune-engine";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Ordered by quality — falls back automatically on quota/error
const MODELS = [
    "llama-3.3-70b-versatile",
    "llama-3.1-70b-versatile",
    "mixtral-8x7b-32768",
];

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return true;
    }

    if (record.count >= RATE_LIMIT_MAX) {
        return false;
    }

    record.count++;
    return true;
}

export interface FortuneAPIRequest {
    type: "personal" | "general";
    data: any;
}

function generatePersonalPrompt(data: any) {
    const { name, meta, question, occupation, birthPlace } = data;
    const zodiac = ZODIAC_DATA[meta.zodiacSign as ZodiacSign];

    return `You are a mystical celestial oracle. Respond ONLY with a valid JSON object.

Context:
- User: ${name} (Age ${meta.age})
- Zodiac: ${meta.zodiacSign} (${zodiac.element} element, ${zodiac.quality} quality, ruled by ${zodiac.ruler})
- Traits: ${zodiac.traits.join(", ")}
- Strengths: ${zodiac.strengths.join(", ")}
- Challenges: ${zodiac.challenges.join(", ")}
- Cosmic Score: ${meta.cosmicScore}/100 (Verdict: ${meta.verdictLevel})
- Question: "${question}"

Task: Generate a personalized fortune reading. 
- Use the provided zodiac traits to make it specific.
- "elementalReading" and "elementalReadingTh" must be exactly 4 short sentences providing a direct prediction.
- All other fields should be 1-2 sentences.
- Be decisive based on the cosmic score.
- Language: English and Thai. 

CRITICAL LANGUAGE RULES:
1. For all fields ending in "Th", use ONLY the Thai script (ก-ฮ, vowels, and Thai marks).
2. STERN WARNING: ABSOLUTELY NO Chinese (Hanzi), Japanese (Kanji/Kana), or Korean (Hangul) characters are allowed. 
3. Do NOT use characters from other scripts even if they seem relevant. If a Thai word is missing, use a descriptive Thai phrase.

JSON Structure:
{
  "greeting": "...", "greetingTh": "...",
  "cosmicAlignment": "...", "cosmicAlignmentTh": "...",
  "lunarInfluence": "...", "lunarInfluenceTh": "...",
  "timeEnergy": "...", "timeEnergyTh": "...",
  "seasonalWisdom": "...", "seasonalWisdomTh": "...",
  "numerologyInsight": "...", "numerologyInsightTh": "...",
  "elementalReading": "...", "elementalReadingTh": "...",
  "personalAdvice": "...", "personalAdviceTh": "...",
  "overallEnergy": "...", "overallEnergyTh": "...",
  "warnings": "...", "warningsTh": "...",
  "closingMessage": "...", "closingMessageTh": "...",
  "luckyNumbers": [number, number, number],
  "luckyDay": "...", "luckyDayTh": "...",
  "luckyColor": "...", "luckyColorTh": "..."
}`;
}

function generateGeneralPrompt(data: any) {
    const { zodiacSign, category, period, meta } = data;
    const zodiac = ZODIAC_DATA[zodiacSign as ZodiacSign];

    return `You are a mystical celestial oracle. Respond ONLY with a valid JSON object.

Context:
- Sign: ${zodiacSign} (${zodiac.element} element, ruled by ${zodiac.ruler})
- Traits: ${zodiac.traits.join(", ")}
- Category: ${category} | Period: ${period}
- Cosmic rating: ${meta.rating}/5

Task: Generate a ${period} ${category} horoscope.
- "details" and "detailsTh" must be exactly 4 short sentences.
- All other fields 1-2 sentences.
- Language: English and Thai.

CRITICAL LANGUAGE RULES:
1. For all fields ending in "Th", use ONLY Thai script. 
2. ABSOLUTELY NO Chinese, Japanese, or Korean characters.

JSON Structure:
{
  "overview": "...", "overviewTh": "...",
  "details": "...", "detailsTh": "...",
  "advice": "...", "adviceTh": "...",
  "caution": "...", "cautionTh": "...",
  "affirmation": "...", "affirmationTh": "...",
  "luckyNumbers": [number, number, number],
  "bestDay": "...", "bestDayTh": "...",
  "luckyColor": "...", "luckyColorTh": "..."
}`;
}

async function callGroq(prompt: string): Promise<string> {
    for (const model of MODELS) {
        try {
            const completion = await groq.chat.completions.create({
                model,
                messages: [{ role: "user", content: prompt }],
                response_format: { type: "json_object" },
                temperature: 0.9,
                max_tokens: 4096,
            });
            const content = completion.choices[0]?.message?.content ?? "";
            const finishReason = completion.choices[0]?.finish_reason;
            if (finishReason === "length") {
                console.warn(`[Fortune API] Response truncated by ${model}, trying next model...`);
                if (model !== MODELS[MODELS.length - 1]) continue;
            }
            return content;
        } catch (err: unknown) {
            const status = (err as { status?: number })?.status;
            if ((status === 429 || status === 503) && model !== MODELS[MODELS.length - 1]) {
                console.warn(`[Fortune API] Quota/error on ${model}, trying next model...`);
                continue;
            }
            throw err;
        }
    }
    throw new Error("All models exhausted");
}

export async function POST(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    if (!checkRateLimit(ip)) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    if (!process.env.GROQ_API_KEY) {
        console.error("[Fortune API] GROQ_API_KEY is not set in .env.local");
        return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
    }

    let rawText = "";
    try {
        const body: FortuneAPIRequest = await req.json();

        // Input Validation
        if (body.type === "personal") {
            const { name, question } = body.data;
            if (!name || name.length > 50) {
                return NextResponse.json({ error: "Invalid name. Maximum 50 characters allowed." }, { status: 400 });
            }
            if (!question || question.length > 300) {
                return NextResponse.json({ error: "Invalid question. Maximum 300 characters allowed." }, { status: 400 });
            }
        }

        const prompt = body.type === "personal"
            ? generatePersonalPrompt(body.data)
            : generateGeneralPrompt(body.data);

        rawText = await callGroq(prompt);

        // Strip markdown fences just in case
        const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
        const parsed = JSON.parse(cleaned);

        // Robust Sanitization: Strip non-Thai/English characters from Thai fields
        const thaiRegex = /[^\u0E00-\u0E7F\x00-\x7F]/g;
        for (const key in parsed) {
            if (key.endsWith("Th") && typeof parsed[key] === "string") {
                parsed[key] = parsed[key].replace(thaiRegex, "");
            }
        }

        return NextResponse.json(parsed);
    } catch (err) {
        console.error("[Fortune API Error]", err);
        if (rawText) console.error("[Fortune API Raw]", rawText.slice(0, 300));
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
