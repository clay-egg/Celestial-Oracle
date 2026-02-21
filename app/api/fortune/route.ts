import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Ordered by quality — falls back automatically on quota/error
const MODELS = [
    "llama-3.3-70b-versatile",
    "llama-3.1-70b-versatile",
    "mixtral-8x7b-32768",
];

export interface FortuneAPIRequest {
    type: "personal" | "general";
    prompt: string;
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
    if (!process.env.GROQ_API_KEY) {
        console.error("[Fortune API] GROQ_API_KEY is not set in .env.local");
        return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
    }

    let rawText = "";
    try {
        const body: FortuneAPIRequest = await req.json();
        rawText = await callGroq(body.prompt);

        // Strip markdown fences just in case
        const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
        const parsed = JSON.parse(cleaned);

        return NextResponse.json(parsed);
    } catch (err) {
        console.error("[Fortune API Error]", err);
        if (rawText) console.error("[Fortune API Raw]", rawText.slice(0, 300));
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
