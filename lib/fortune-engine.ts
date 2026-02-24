// Fortune Teller Engine v2
// Detects question type, calculates a cosmic score, and provides
// clear, direct, mystical-but-understandable answers.

// ─── Zodiac Data ────────────────────────────────────────────
export const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

export const ZODIAC_DATA: Record<ZodiacSign, {
  element: string; quality: string; ruler: string; symbol: string;
  dateRange: string; traits: string[]; luckyNumbers: number[];
  luckyDay: string; color: string; strengths: string[]; challenges: string[];
}> = {
  Aries: {
    element: "Fire", quality: "Cardinal", ruler: "Mars", symbol: "Ram",
    dateRange: "Mar 21 - Apr 19",
    traits: ["courageous", "determined", "confident", "enthusiastic", "passionate"],
    luckyNumbers: [1, 8, 17], luckyDay: "Tuesday", color: "Red",
    strengths: ["leadership", "initiative", "bravery"],
    challenges: ["impatience", "impulsiveness", "short temper"],
  },
  Taurus: {
    element: "Earth", quality: "Fixed", ruler: "Venus", symbol: "Bull",
    dateRange: "Apr 20 - May 20",
    traits: ["reliable", "patient", "practical", "devoted", "responsible"],
    luckyNumbers: [2, 6, 9], luckyDay: "Friday", color: "Green",
    strengths: ["persistence", "loyalty", "sensuality"],
    challenges: ["stubbornness", "possessiveness", "resistance to change"],
  },
  Gemini: {
    element: "Air", quality: "Mutable", ruler: "Mercury", symbol: "Twins",
    dateRange: "May 21 - Jun 20",
    traits: ["gentle", "affectionate", "curious", "adaptable", "witty"],
    luckyNumbers: [5, 7, 14], luckyDay: "Wednesday", color: "Yellow",
    strengths: ["communication", "versatility", "intellect"],
    challenges: ["indecisiveness", "restlessness", "inconsistency"],
  },
  Cancer: {
    element: "Water", quality: "Cardinal", ruler: "Moon", symbol: "Crab",
    dateRange: "Jun 21 - Jul 22",
    traits: ["tenacious", "imaginative", "loyal", "emotional", "sympathetic"],
    luckyNumbers: [2, 3, 15], luckyDay: "Monday", color: "Silver",
    strengths: ["intuition", "nurturing", "emotional depth"],
    challenges: ["moodiness", "insecurity", "clinginess"],
  },
  Leo: {
    element: "Fire", quality: "Fixed", ruler: "Sun", symbol: "Lion",
    dateRange: "Jul 23 - Aug 22",
    traits: ["creative", "passionate", "generous", "warm-hearted", "cheerful"],
    luckyNumbers: [1, 3, 10], luckyDay: "Sunday", color: "Gold",
    strengths: ["creativity", "confidence", "generosity"],
    challenges: ["arrogance", "stubbornness", "self-centeredness"],
  },
  Virgo: {
    element: "Earth", quality: "Mutable", ruler: "Mercury", symbol: "Maiden",
    dateRange: "Aug 23 - Sep 22",
    traits: ["loyal", "analytical", "kind", "hardworking", "practical"],
    luckyNumbers: [5, 14, 23], luckyDay: "Wednesday", color: "Navy Blue",
    strengths: ["attention to detail", "reliability", "analytical mind"],
    challenges: ["overthinking", "criticism", "perfectionism"],
  },
  Libra: {
    element: "Air", quality: "Cardinal", ruler: "Venus", symbol: "Scales",
    dateRange: "Sep 23 - Oct 22",
    traits: ["cooperative", "diplomatic", "gracious", "fair-minded", "social"],
    luckyNumbers: [4, 6, 13], luckyDay: "Friday", color: "Pink",
    strengths: ["harmony", "justice", "partnership"],
    challenges: ["indecision", "avoidance of conflict", "self-pity"],
  },
  Scorpio: {
    element: "Water", quality: "Fixed", ruler: "Pluto", symbol: "Scorpion",
    dateRange: "Oct 23 - Nov 21",
    traits: ["resourceful", "brave", "passionate", "stubborn", "mysterious"],
    luckyNumbers: [8, 11, 18], luckyDay: "Tuesday", color: "Crimson",
    strengths: ["determination", "passion", "resourcefulness"],
    challenges: ["jealousy", "secrecy", "possessiveness"],
  },
  Sagittarius: {
    element: "Fire", quality: "Mutable", ruler: "Jupiter", symbol: "Archer",
    dateRange: "Nov 22 - Dec 21",
    traits: ["generous", "idealistic", "great humor", "adventurous", "optimistic"],
    luckyNumbers: [3, 7, 9], luckyDay: "Thursday", color: "Blue",
    strengths: ["optimism", "freedom", "philosophy"],
    challenges: ["impatience", "tactlessness", "over-promising"],
  },
  Capricorn: {
    element: "Earth", quality: "Cardinal", ruler: "Saturn", symbol: "Sea-Goat",
    dateRange: "Dec 22 - Jan 19",
    traits: ["responsible", "disciplined", "self-control", "good managers"],
    luckyNumbers: [4, 8, 13], luckyDay: "Saturday", color: "Brown",
    strengths: ["ambition", "discipline", "patience"],
    challenges: ["pessimism", "rigidity", "emotional detachment"],
  },
  Aquarius: {
    element: "Air", quality: "Fixed", ruler: "Uranus", symbol: "Water Bearer",
    dateRange: "Jan 20 - Feb 18",
    traits: ["progressive", "original", "independent", "humanitarian"],
    luckyNumbers: [4, 7, 11], luckyDay: "Saturday", color: "Turquoise",
    strengths: ["innovation", "independence", "humanitarianism"],
    challenges: ["emotional detachment", "unpredictability", "stubbornness"],
  },
  Pisces: {
    element: "Water", quality: "Mutable", ruler: "Neptune", symbol: "Fish",
    dateRange: "Feb 19 - Mar 20",
    traits: ["compassionate", "artistic", "intuitive", "gentle", "wise"],
    luckyNumbers: [3, 9, 12], luckyDay: "Thursday", color: "Sea Green",
    strengths: ["empathy", "creativity", "spirituality"],
    challenges: ["escapism", "over-sensitivity", "idealism"],
  },
};

// ─── Helpers ────────────────────────────────────────────────

export function getZodiacSign(birthDate: string): ZodiacSign {
  // birthDate format is YYYY-MM-DD
  const date = new Date(birthDate);
  // Ensure we correctly parse the day and month
  // Using UTC to avoid timezone shift on local parse
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();

  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return "Aries";
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return "Taurus";
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return "Gemini";
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return "Cancer";
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return "Leo";
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return "Virgo";
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return "Libra";
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return "Scorpio";
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return "Sagittarius";
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return "Capricorn";
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return "Aquarius";
  return "Pisces"; // Feb 19 - Mar 20
}

export function calculateAge(birthDate: string): number {
  const bd = new Date(birthDate);
  const now = new Date();
  let age = now.getUTCFullYear() - bd.getUTCFullYear();
  const m = now.getUTCMonth() - bd.getUTCMonth();
  if (m < 0 || (m === 0 && now.getUTCDate() < bd.getUTCDate())) {
    age--;
  }
  return age;
}


function nameNumber(name: string): number {
  const v: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9, s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  };
  let s = name.toLowerCase().split("").reduce((a, c) => a + (v[c] || 0), 0);
  while (s > 9 && s !== 11 && s !== 22) s = s.toString().split("").reduce((a, d) => a + +d, 0);
  return s;
}

function lifePathNumber(bd: Date): number {
  let s = (bd.getDate() + bd.getMonth() + 1 + bd.getFullYear()).toString().split("").reduce((a, d) => a + +d, 0);
  while (s > 9 && s !== 11 && s !== 22) s = s.toString().split("").reduce((a, d) => a + +d, 0);
  return s;
}

function lunarPhase(date: Date): { phase: string; bonus: number } {
  const known = new Date(2000, 0, 6).getTime();
  const age = (((date.getTime() - known) / 86400000) % 29.53 + 29.53) % 29.53;
  if (age < 1.85) return { phase: "New Moon", bonus: 8 };
  if (age < 7.38) return { phase: "Waxing Crescent", bonus: 6 };
  if (age < 9.23) return { phase: "First Quarter", bonus: 4 };
  if (age < 14.77) return { phase: "Waxing Gibbous", bonus: 7 };
  if (age < 16.61) return { phase: "Full Moon", bonus: 9 };
  if (age < 22.15) return { phase: "Waning Gibbous", bonus: 5 };
  if (age < 23.99) return { phase: "Last Quarter", bonus: 3 };
  return { phase: "Waning Crescent", bonus: 2 };
}

function timeBonus(h: number): number {
  if (h >= 5 && h < 8) return 7;   // dawn - spiritual
  if (h >= 8 && h < 12) return 8;  // morning - active
  if (h >= 12 && h < 14) return 6; // midday
  if (h >= 14 && h < 17) return 5; // afternoon
  if (h >= 17 && h < 20) return 7; // twilight
  if (h >= 20 && h < 23) return 6; // evening
  return 4;                          // midnight
}

function seasonBonus(m: number): number {
  if (m >= 2 && m <= 4) return 7;  // spring
  if (m >= 5 && m <= 7) return 8;  // summer
  if (m >= 8 && m <= 10) return 6; // autumn
  return 5;                          // winter
}

// ─── Question Type Detection ────────────────────────────────

type QuestionType = "yes_no" | "outcome" | "choice" | "timing" | "open";

function detectQuestionType(q: string): QuestionType {
  const lower = q.toLowerCase();

  // Yes/No questions
  const yesNoPatterns = [
    /\bwill\b.*\b(i|he|she|they|we|my|it)\b/i,
    /\bshould\b.*\b(i|he|she|they|we)\b/i,
    /\bam i\b/i,
    /\bis (he|she|it|this|that|there)\b/i,
    /\bcan i\b/i,
    /\bdoes\b.*\b(he|she|it|my)\b/i,
    /\bdo i\b/i,
    /\bจะ.*ไหม/i,
    /\bจะ.*มั้ย/i,
    /\bจะ.*ได้ไหม/i,
    /\bใช่ไหม/i,
    /\bหรือเปล่า/i,
    /\bpass\b/i, /\bfail\b/i, /\bget\b.*\bjob\b/i,
    /\baccept(ed)?\b/i, /\bpromot(e|ed|ion)\b/i,
    /\bwin\b/i, /\blose\b/i,
    /\bbreak\s?up\b/i, /\bmarr(y|ied|iage)\b/i,
    /\bpregnant\b/i, /\bhired?\b/i,
    /\bสอบผ่าน/i, /\bสอบติด/i, /\bสอบได้/i,
    /\bรับ.*เข้า/i,
  ];
  if (yesNoPatterns.some(p => p.test(lower))) return "yes_no";

  // Choice questions
  if (/\bor\b/i.test(lower) || /\bหรือ\b/.test(lower) || /\bchoose\b/i.test(lower)) return "choice";

  // Timing questions
  if (/\bwhen\b/i.test(lower) || /\bhow long\b/i.test(lower) || /\bเมื่อไหร่/.test(lower) || /\bอีกนาน/.test(lower)) return "timing";

  // Outcome questions
  if (/\bhow\b/i.test(lower) || /\bwhat.*happen\b/i.test(lower) || /\boutcome\b/i.test(lower) || /\bresult\b/i.test(lower)) return "outcome";

  return "open";
}

// ─── Topic Detection ────────────────────────────────────────

export type Topic = "love" | "career" | "education" | "health" | "finance" | "family" | "spiritual" | "general";

export function detectTopic(q: string, concern: string): Topic {
  const lower = q.toLowerCase() + " " + concern.toLowerCase();
  const topics: [Topic, RegExp[]][] = [
    ["education", [/\bexam\b/i, /\bstudy\b/i, /\bpass\b/i, /\btest\b/i, /\bschool\b/i, /\buniversity\b/i, /\bgrade\b/i, /\bdegree\b/i, /\bclass\b/i, /\bสอบ/i, /\bเรียน/i, /\bมหาวิทยาลัย/i]],
    ["love", [/\blove\b/i, /\brelationship\b/i, /\bpartner\b/i, /\bmarr/i, /\bdating\b/i, /\bsoulmate\b/i, /\bcrush\b/i, /\bboyfriend\b/i, /\bgirlfriend\b/i, /\bex\b/i, /\bbreak.?up\b/i, /\bรัก/i, /\bแฟน/i, /\bคู่/i, /\bหัวใจ/i, /\bแต่งงาน/i]],
    ["career", [/\bjob\b/i, /\bcareer\b/i, /\bwork\b/i, /\bpromot/i, /\bbusiness\b/i, /\bhir(e|ed)\b/i, /\binterview\b/i, /\bresign\b/i, /\bงาน/i, /\bอาชีพ/i, /\bเลื่อนตำแหน่ง/i, /\bสมัครงาน/i]],
    ["finance", [/\bmoney\b/i, /\brich\b/i, /\bdebt\b/i, /\binvest/i, /\bsalary\b/i, /\blotter/i, /\bเงิน/i, /\bหนี้/i, /\bรวย/i, /\bลงทุน/i]],
    ["health", [/\bhealth\b/i, /\bsick\b/i, /\billness\b/i, /\bsurgery\b/i, /\bpregnant\b/i, /\bสุขภาพ/i, /\bป่วย/i, /\bท้อง/i]],
    ["family", [/\bfamily\b/i, /\bparent/i, /\bchild\b/i, /\bmother\b/i, /\bfather\b/i, /\bครอบครัว/i, /\bพ่อ/i, /\bแม่/i, /\bลูก/i]],
    ["spiritual", [/\bspiritual\b/i, /\bpurpose\b/i, /\bdestiny\b/i, /\bkarma\b/i, /\bจิตวิญญาณ/i, /\bกรรม/i]],
  ];
  for (const [topic, patterns] of topics) {
    if (patterns.some(p => p.test(lower))) return topic;
  }
  return "general";
}

// ─── Cosmic Score Calculation ───────────────────────────────
// Produces 0-100 score from all factors, used to determine verdict

function calculateCosmicScore(input: {
  nameNum: number; lifePath: number; lunarBonus: number;
  timeB: number; seasonB: number; signIndex: number;
  element: string; topic: Topic; concern: string;
  age: number; birthPlace: string;
}): number {
  const { nameNum, lifePath, lunarBonus, timeB, seasonB, signIndex, element, topic, age } = input;

  // Base score from numerology (0-18 range, normalize to 0-25)
  const numScore = Math.min(25, ((nameNum + lifePath) / 44) * 25 + 5);

  // Lunar contribution (0-9 range, normalize to 0-20)
  const moonScore = (lunarBonus / 9) * 20;

  // Time + season (0-16 range, normalize to 0-15)
  const temporalScore = ((timeB + seasonB) / 16) * 15;

  // Elemental affinity with topic (0-20)
  const affinityMap: Record<string, Topic[]> = {
    Fire: ["career", "education"],
    Earth: ["finance", "health", "family"],
    Water: ["love", "spiritual", "family"],
    Air: ["education", "career", "spiritual"],
  };
  const affinityBonus = affinityMap[element]?.includes(topic) ? 15 : 8;

  // Age-based factor for certain topics (subtle, 0-5)
  const ageBonus = topic === "education" && age < 30 ? 4 : topic === "career" && age >= 25 && age <= 50 ? 3 : 2;

  // Daily variance using date + sign index (0-15)
  const now = new Date();
  const daySeed = (now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate() + signIndex * 7) % 100;
  const dailyVariance = (daySeed / 100) * 15;

  const total = numScore + moonScore + temporalScore + affinityBonus + ageBonus + dailyVariance;
  return Math.min(100, Math.max(5, Math.round(total)));
}

export // ─── Verdict Generator ──────────────────────────────────────

  interface Verdict {
  label: string;     // e.g. "Highly Likely", "Favorable"
  labelTh: string;
  emoji: string;     // for internal use mapping
  level: "very_positive" | "positive" | "neutral" | "cautious" | "challenging";
}

function getVerdict(score: number): Verdict {
  if (score >= 80) return { label: "Highly Favorable", labelTh: "เป็นมงคลอย่างยิ่ง", emoji: "stars", level: "very_positive" };
  if (score >= 65) return { label: "Favorable", labelTh: "เป็นมงคล", emoji: "star", level: "positive" };
  if (score >= 45) return { label: "Possible With Effort", labelTh: "เป็นไปได้ หากพยายาม", emoji: "balance", level: "neutral" };
  if (score >= 30) return { label: "Proceed With Caution", labelTh: "ระวังไว้", emoji: "caution", level: "cautious" };
  return { label: "Challenging Period", labelTh: "ช่วงท้าทาย", emoji: "cloud", level: "challenging" };
}

// Generative AI now handles all text responses directly without static fallback array constraints.

// ─── Personal Reading ───────────────────────────────────────

export interface PersonalReadingInput {
  name: string;
  birthDate: string; // YYYY-MM-DD
  gender?: string;
  question: string;
  age?: number;               // Now optional, auto-calculated if missing
  zodiacSign?: ZodiacSign;    // Now optional, auto-calculated if missing
  birthPlace?: string;
  occupation?: string;
  concern?: string;
}

export interface PersonalReading {
  // Calculated metadata
  age: number;
  zodiacSign: ZodiacSign;
  // Core verdict & scoring
  verdict: string;
  verdictTh: string;
  verdictLevel: string;
  cosmicScore: number;
  // Legacy flat answer (kept for backward compat)
  answer: string;
  answerTh: string;
  advice: string;
  adviceTh: string;
  warning: string;
  warningTh: string;
  // Lucky details
  luckyNumbers: number[];
  luckyDay: string;
  luckyColor: string;
  luckyDayTh: string;
  luckyColorTh: string;
  lunarPhase: string;
  // Rich reading sections (used by the UI)
  greeting: string;
  greetingTh: string;
  cosmicAlignment: string;
  cosmicAlignmentTh: string;
  lunarInfluence: string;
  lunarInfluenceTh: string;
  timeEnergy: string;
  timeEnergyTh: string;
  seasonalWisdom: string;
  seasonalWisdomTh: string;
  numerologyInsight: string;
  numerologyInsightTh: string;
  elementalReading: string;
  elementalReadingTh: string;
  personalAdvice: string;
  personalAdviceTh: string;
  overallEnergy: string;
  overallEnergyTh: string;
  warnings: string;
  warningsTh: string;
  closingMessage: string;
  closingMessageTh: string;
}

export interface BasePersonalReadingMetadata {
  age: number;
  zodiacSign: ZodiacSign;
  verdict: string;
  verdictTh: string;
  verdictLevel: string;
  cosmicScore: number;
  luckyNumbers: number[];
  luckyDay: string;
  luckyColor: string;
  lunarPhase: string;
}

function calculatePersonalMetadata(input: PersonalReadingInput): BasePersonalReadingMetadata {
  const age = input.age ?? calculateAge(input.birthDate);
  const zodiacSign = input.zodiacSign ?? getZodiacSign(input.birthDate);
  const bd = new Date(input.birthDate);
  const now = new Date();

  const nameNum = nameNumber(input.name);
  const lifePath = lifePathNumber(bd);
  const hours = now.getHours();
  const timeB = timeBonus(hours);
  const seasonB = seasonBonus(now.getMonth() + 1);
  const { phase, bonus: lunarBonus } = lunarPhase(now);
  const signIndex = ZODIAC_SIGNS.indexOf(zodiacSign);
  const zodiac = ZODIAC_DATA[zodiacSign];
  const topic = detectTopic(input.question, input.concern || "");

  const score = calculateCosmicScore({
    nameNum, lifePath, lunarBonus, timeB, seasonB,
    signIndex, element: zodiac.element, topic, concern: input.concern || "",
    age, birthPlace: input.birthPlace || ""
  });
  const verdict = getVerdict(score);
  const dailySeed = (now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate() + nameNum) % 100;
  const luckyNums = zodiac.luckyNumbers.map(n => ((n + dailySeed) % 49) + 1);

  return {
    age, zodiacSign, verdict: verdict.label, verdictTh: verdict.labelTh,
    verdictLevel: verdict.level, cosmicScore: score, luckyNumbers: luckyNums,
    luckyDay: zodiac.luckyDay, luckyColor: zodiac.color, lunarPhase: phase
  };
}

// ─── AI-Powered Personal Reading ────────────────────────────
// Calls the Gemini API route and formats into the reading strictly dynamically.

export async function generatePersonalReadingWithAI(input: PersonalReadingInput): Promise<PersonalReading> {
  const meta = calculatePersonalMetadata(input);
  const zodiac = ZODIAC_DATA[meta.zodiacSign];

  // Prompt construction moved to server for security

  const res = await fetch("/api/fortune", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "personal",
      data: {
        ...input,
        meta: meta
      }
    }),
  });

  if (!res.ok) throw new Error("API error - Ensure the AI provider is configured correctly.");
  const aiData = await res.json() as Record<string, any>;

  return {
    ...meta,
    // The core answer mappings from AI
    greeting: aiData.greeting,
    greetingTh: aiData.greetingTh,
    cosmicAlignment: aiData.cosmicAlignment,
    cosmicAlignmentTh: aiData.cosmicAlignmentTh,
    lunarInfluence: aiData.lunarInfluence,
    lunarInfluenceTh: aiData.lunarInfluenceTh,
    timeEnergy: aiData.timeEnergy,
    timeEnergyTh: aiData.timeEnergyTh,
    seasonalWisdom: aiData.seasonalWisdom,
    seasonalWisdomTh: aiData.seasonalWisdomTh,
    numerologyInsight: aiData.numerologyInsight,
    numerologyInsightTh: aiData.numerologyInsightTh,
    elementalReading: aiData.elementalReading,
    elementalReadingTh: aiData.elementalReadingTh,
    personalAdvice: aiData.personalAdvice,
    personalAdviceTh: aiData.personalAdviceTh,
    overallEnergy: aiData.overallEnergy,
    overallEnergyTh: aiData.overallEnergyTh,
    warnings: aiData.warnings,
    warningsTh: aiData.warningsTh,
    closingMessage: aiData.closingMessage,
    closingMessageTh: aiData.closingMessageTh,
    luckyNumbers: aiData.luckyNumbers || meta.luckyNumbers,
    luckyDay: aiData.luckyDay || meta.luckyDay,
    luckyDayTh: aiData.luckyDayTh || aiData.luckyDay || meta.luckyDay,
    luckyColor: aiData.luckyColor || meta.luckyColor,
    luckyColorTh: aiData.luckyColorTh || aiData.luckyColor || meta.luckyColor,
    // Provide explicit fallbacks to text strings for backward compatibility in components
    answer: aiData.elementalReading,
    answerTh: aiData.elementalReadingTh,
    advice: aiData.personalAdvice,
    adviceTh: aiData.personalAdviceTh,
    warning: aiData.warnings,
    warningTh: aiData.warningsTh,
  };
}

// ─── General Horoscope ──────────────────────────────────────

export type Category = "love" | "wealth" | "health";
export type Period = "daily" | "weekly" | "monthly" | "yearly";

export interface GeneralReading {
  title: string;
  zodiacSign: ZodiacSign;
  category: Category;
  period: Period;
  overview: string;
  overviewTh: string;
  details: string;
  detailsTh: string;
  advice: string;
  adviceTh: string;
  rating: number;
  luckyNumbers: number[];
  bestDay: string;
  bestDayTh: string;
  luckyColor: string;
  luckyColorTh: string;
  caution: string;
  cautionTh: string;
  affirmation: string;
  affirmationTh: string;
}

export interface BaseGeneralReadingMetadata {
  zodiacSign: ZodiacSign;
  category: Category;
  period: Period;
  rating: number;
  luckyNumbers: number[];
  bestDay: string;
  luckyColor: string;
}

function calculateGeneralMetadata(zodiacSign: ZodiacSign, category: Category, period: Period): BaseGeneralReadingMetadata {
  const now = new Date();
  const zodiac = ZODIAC_DATA[zodiacSign];
  const lunar = lunarPhase(now);
  const signIndex = ZODIAC_SIGNS.indexOf(zodiacSign);
  const catIndex = ["love", "wealth", "health"].indexOf(category);
  const perIndex = ["daily", "weekly", "monthly", "yearly"].indexOf(period);
  const dateSeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const seed = (signIndex * 7 + catIndex * 13 + perIndex * 17 + dateSeed) % 1000;

  const lunarBonus = lunar.phase.includes("Full") || lunar.phase.includes("New") ? 1 : 0;
  const elementalBonus = (zodiac.element === "Fire" && category === "wealth") ||
    (zodiac.element === "Water" && category === "love") ||
    (zodiac.element === "Earth" && category === "health") ? 1 : 0;
  const rating = Math.min(5, Math.max(1, (seed % 5) + 1 + lunarBonus + elementalBonus));

  const luckyNums = zodiac.luckyNumbers.map(n => ((n * (seed % 10 + 1) + catIndex) % 49) + 1);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const bestDay = period === "daily" ? "Today" : days[(seed + signIndex) % 7];

  return { zodiacSign, category, period, rating, luckyNumbers: luckyNums, bestDay, luckyColor: zodiac.color };
}

// ─── AI-Powered General Reading ─────────────────────────────
// Calls the Gemini API route and formats into the reading dynamically.

export async function generateGeneralReadingWithAI(
  zodiacSign: ZodiacSign, category: Category, period: Period,
): Promise<GeneralReading> {
  const meta = calculateGeneralMetadata(zodiacSign, category, period);
  const zodiac = ZODIAC_DATA[zodiacSign];
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const periodLabel = period.charAt(0).toUpperCase() + period.slice(1);

  // Prompt construction moved to server for security

  const res = await fetch("/api/fortune", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "general",
      data: {
        zodiacSign,
        category,
        period,
        meta: meta
      }
    }),
  });

  if (!res.ok) throw new Error("API error - Ensure the AI provider is configured correctly.");
  const aiData = await res.json() as Record<string, any>;

  return {
    title: `${periodLabel} ${categoryLabel} Reading for ${zodiacSign}`,
    ...meta,
    overview: aiData.overview,
    overviewTh: aiData.overviewTh,
    details: aiData.details,
    detailsTh: aiData.detailsTh,
    advice: aiData.advice,
    adviceTh: aiData.adviceTh,
    caution: aiData.caution,
    cautionTh: aiData.cautionTh,
    affirmation: aiData.affirmation,
    affirmationTh: aiData.affirmationTh,
    luckyNumbers: aiData.luckyNumbers || meta.luckyNumbers,
    bestDay: aiData.bestDay || meta.bestDay,
    bestDayTh: aiData.bestDayTh || aiData.bestDay || meta.bestDay,
    luckyColor: aiData.luckyColor || meta.luckyColor,
    luckyColorTh: aiData.luckyColorTh || aiData.luckyColor || meta.luckyColor,
  };
}
