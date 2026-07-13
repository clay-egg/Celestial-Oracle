import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-70b-versatile",
  "mixtral-8x7b-32768",
];

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.lastReset > 60000) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (record.count >= 10) return false;
  record.count++;
  return true;
}

async function callGroq(prompt: string): Promise<string> {
  for (const model of MODELS) {
    try {
      const completion = await groq.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.9,
        max_tokens: 2048,
      });
      return completion.choices[0]?.message?.content ?? "";
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status;
      if ((status === 429 || status === 503) && model !== MODELS[MODELS.length - 1]) continue;
      throw err;
    }
  }
  throw new Error("All models exhausted");
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "anonymous";
  if (!checkRateLimit(ip))
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  if (!process.env.GROQ_API_KEY)
    return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });

  try {
    const { cards, question } = await req.json();

    if (!Array.isArray(cards) || cards.length !== 3)
      return NextResponse.json({ error: "Exactly 3 cards required" }, { status: 400 });

    const [past, present, future] = cards;
    const questionLine = question?.trim()
      ? `The seeker's question: "${question.trim()}"`
      : "The seeker has come without a specific question, seeking general guidance.";

    const prompt = `You are a wise and mystical tarot reader interpreting a three-card Past–Present–Future spread.

${questionLine}

The three cards drawn are:
- PAST: ${past.name} — Keywords: ${past.keywords.join(", ")}. Meaning: ${past.upright}
- PRESENT: ${present.name} — Keywords: ${present.keywords.join(", ")}. Meaning: ${present.upright}
- FUTURE: ${future.name} — Keywords: ${future.keywords.join(", ")}. Meaning: ${future.upright}

Task: Write an immersive, flowing tarot interpretation. Be specific, evocative, and personal. Weave the three cards into a unified narrative.

CRITICAL LANGUAGE RULES for Thai fields:
1. Use ONLY Thai script (ก-ฮ and vowel marks).
2. ABSOLUTELY NO Chinese, Japanese, or Korean characters.

Respond ONLY with valid JSON in this exact structure:
{
  "interpretation": "A rich 3-4 sentence combined narrative weaving all three cards together, addressing the question directly.",
  "interpretationTh": "Thai translation of interpretation",
  "pastMessage": "1-2 sentences specifically about the Past card and what it reveals about the seeker's journey.",
  "pastMessageTh": "Thai translation",
  "presentMessage": "1-2 sentences specifically about the Present card and current energies at play.",
  "presentMessageTh": "Thai translation",
  "futureMessage": "1-2 sentences specifically about the Future card and what lies ahead.",
  "futureMessageTh": "Thai translation",
  "advice": "One powerful, direct piece of advice synthesized from the reading.",
  "adviceTh": "Thai translation",
  "affirmation": "A short mystical affirmation (10-15 words) for the seeker to carry with them.",
  "affirmationTh": "Thai translation"
}`;

    const rawText = await callGroq(prompt);
    const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
    const parsed = JSON.parse(cleaned);

    // Strip non-Thai characters from Thai fields
    const thaiRegex = /[^\u0E00-\u0E7F\x00-\x7F]/g;
    for (const key in parsed) {
      if (key.endsWith("Th") && typeof parsed[key] === "string") {
        parsed[key] = parsed[key].replace(thaiRegex, "");
      }
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[Tarot API Error]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
