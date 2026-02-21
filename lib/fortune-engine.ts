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

function nameNumber(name: string): number {
  const v: Record<string, number> = {
    a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8,
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

type Topic = "love" | "career" | "education" | "health" | "finance" | "family" | "spiritual" | "general";

function detectTopic(q: string, concern: string): Topic {
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
  age: number; relationship: string;
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

// ─── Verdict Generator ──────────────────────────────────────

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

// ─── Answer Generators (by question type) ───────────────────

function generateYesNoAnswer(score: number, topic: Topic, zodiac: typeof ZODIAC_DATA[ZodiacSign], question: string): { answer: string; answerTh: string } {
  const lower = question.toLowerCase();
  const isExam = /pass|exam|test|สอบ|เรียน/.test(lower);
  const isJob = /job|hire|interview|promot|งาน|สมัคร|เลื่อน/.test(lower);
  const isLove = /love|marry|relationship|รัก|แฟน|แต่งงาน/.test(lower);
  const isBreakup = /break.?up|เลิก|แยก/.test(lower);

  if (score >= 75) {
    if (isExam) return {
      answer: `The stars strongly favor you. Your ${zodiac.element} energy combined with the current cosmic alignment suggests you are very likely to pass. Your natural ${zodiac.strengths[0]} will carry you through. Trust your preparation and stay focused - the universe supports your success.`,
      answerTh: `ดวงดาวเข้าข้างคุณอย่างมาก พลัง${zodiac.element}ของคุณรวมกับการเรียงตัวของจักรวาลในขณะนี้บ่งชี้ว่าคุณมีโอกาสสูงมากที่จะสอบผ่าน ความ${zodiac.strengths[0]}โดยธรรมชาติจะพาคุณผ่านไปได้ เชื่อมั่นในการเตรียมตัวของคุณและมุ่งมั่นไว้ จักรวาลสนับสนุนความสำเร็จของคุณ`,
    };
    if (isJob) return {
      answer: `The cosmic energies are strongly aligned in your favor. Your ${zodiac.traits[0]} nature and the current planetary position of ${zodiac.ruler} indicate this opportunity is meant for you. You are very likely to get it. Present yourself with confidence.`,
      answerTh: `พลังจักรวาลเรียงตัวเข้าข้างคุณอย่างมาก ธรรมชาติที่${zodiac.traits[0]}ของคุณและตำแหน่งดาว${zodiac.ruler}ในปัจจุบันบ่งชี้ว่าโอกาสนี้มีไว้สำหรับคุณ คุณมีโอกาสสูงมากที่จะได้งาน แสดงตัวด้วยความมั่นใจ`,
    };
    if (isLove) return {
      answer: `The answer from the cosmos is a resounding yes. The ${zodiac.element} energy in your chart harmonizes beautifully with the current lunar cycle. Love is strongly favored - open your heart and let things unfold naturally.`,
      answerTh: `คำตอบจากจักรวาลคือ "ใช่" อย่างแน่นอน พลัง${zodiac.element}ในดวงชะตาของคุณสอดคล้องกับวงจรจันทร์ปัจจุบันอย่างสวยงาม ความรักเป็นมงคลอย่างมาก เปิดหัวใจและปล่อยให้ทุกอย่างดำเนินไปอย่างเป็นธรรมชาติ`,
    };
    return {
      answer: `The celestial alignment is strongly in your favor. The answer leans heavily toward yes. Your ${zodiac.element} spirit and the power of ${zodiac.ruler} converge to support this outcome. Move forward with confidence.`,
      answerTh: `การเรียงตัวของดวงดาวเข้าข้างคุณอย่างมาก คำตอบเอียงไปทาง "ใช่" อย่างชัดเจน จิตวิญญาณ${zodiac.element}และพลังของ${zodiac.ruler}ร่วมกันสนับสนุนผลลัพธ์นี้ เดินหน้าด้วยความมั่นใจ`,
    };
  }

  if (score >= 55) {
    if (isExam) return {
      answer: `The stars show a favorable path, but not without effort. You have a good chance of passing if you put in focused study. Your ${zodiac.challenges[0]} tendency could be a risk - stay disciplined. The cosmic energy supports those who prepare.`,
      answerTh: `ดวงดาวแสดงเส้นทางที่ดี แต่ต้องอาศัยความพยายาม คุณมีโอกาสดีที่จะสอบผ่านหากเตรียมตัวอย่างจริงจัง นิสัย${zodiac.challenges[0]}ของคุณอาจเป็นความเสี่ยง ต้องมีวินัย พลังจักรวาลสนับสนุนคนที่เตรียมพร้อม`,
    };
    if (isJob) return {
      answer: `There is a good chance, but competition may be fierce. Your ${zodiac.strengths[1]} gives you an edge. Prepare thoroughly and let your ${zodiac.traits[1]} nature shine. The outcome favors you if you show genuine effort.`,
      answerTh: `มีโอกาสดี แต่การแข่งขันอาจรุนแรง ความ${zodiac.strengths[1]}ให้ข้อได้เปรียบ เตรียมตัวให้ดีและแสดงความ${zodiac.traits[1]}ออกมา ผลลัพธ์จะเข้าข้างคุณหากแสดงความพยายามอย่างจริงจัง`,
    };
    if (isBreakup) return {
      answer: `The cosmic energy suggests tension exists, but a breakup is not certain. Communication and effort from both sides can steer this in a better direction. Your ${zodiac.element} nature holds the key - use it wisely.`,
      answerTh: `พลังจักรวาลบ่งชี้ว่ามีความตึงเครียด แต่การเลิกกันยังไม่แน่นอน การสื่อสารและความพยายามจากทั้งสองฝ่ายสามารถนำทางไปในทิศทางที่ดีกว่า ธรรมชาติ${zodiac.element}ของคุณเป็นกุญแจสำคัญ`,
    };
    return {
      answer: `The signs point toward yes, but it is not guaranteed. Your effort and timing will make the difference. The ${zodiac.quality.toLowerCase()} quality of your sign supports you here. Stay focused and the odds are in your favor.`,
      answerTh: `สัญญาณชี้ไปทาง "ใช่" แต่ยังไม่การันตี ความพยายามและจังหวะเวลาจะเป็นตัวตัดสิน คุณสมบัติ${zodiac.quality}ของราศีคุณสนับสนุนเรื่องนี้ มุ่งมั่นไว้ โอกาสเข้าข้างคุณ`,
    };
  }

  if (score >= 35) {
    if (isExam) return {
      answer: `The cosmos show a challenging road ahead. Passing is possible, but requires significantly more effort than you may expect. Avoid distractions, revisit your weak areas, and study with intensity. The stars reward hard work over luck right now.`,
      answerTh: `จักรวาลแสดงเส้นทางที่ท้าทาย การสอบผ่านเป็นไปได้ แต่ต้องใช้ความพยายามมากกว่าที่คุณคาดไว้ หลีกเลี่ยงสิ่งรบกวน ทบทวนจุดอ่อน และอ่านหนังสืออย่างจริงจัง ดวงดาวให้รางวัลคนที่ขยันมากกว่าโชค`,
    };
    if (isJob) return {
      answer: `This may not be the right timing. The cosmic energy suggests delays or unexpected obstacles. It does not mean no forever, but right now the stars advise patience and preparing for better opportunities ahead.`,
      answerTh: `อาจยังไม่ใช่จังหวะที่ถูกต้อง พลังจักรวาลบ่งชี้ความล่าช้าหรืออุปสรรคที่ไม่คาดคิด ไม่ได้หมายความว่า "ไม่" ตลอดไป แต่ตอนนี้ดวงดาวแนะนำให้อดทนและเตรียมพร้อมสำหรับโอกาสที่ดีกว่าข้างหน้า`,
    };
    return {
      answer: `The cosmic reading suggests uncertainty. The answer could go either way and depends heavily on your actions. This is a moment that requires patience and strategic thinking. Do not rush decisions.`,
      answerTh: `การอ่านดวงชี้ให้เห็นความไม่แน่นอน คำตอบอาจไปได้ทั้งสองทางและขึ้นอยู่กับการกระทำของคุณเป็นอย่างมาก นี่คือช่วงเวลาที่ต้องอดทนและคิดอย่างรอบคอบ อย่าเร่งรีบตัดสินใจ`,
    };
  }

  if (isExam) return {
    answer: `The stars indicate a difficult period for this exam. The odds are currently against you, but this is not a final sentence. If you can postpone or allow more preparation time, the cosmic energy will shift more favorably. Otherwise, double your efforts.`,
    answerTh: `ดวงดาวบ่งชี้ช่วงเวลาที่ยากลำบากสำหรับการสอบนี้ โอกาสในขณะนี้ไม่เข้าข้าง แต่นี่ไม่ใช่คำตัดสินสุดท้าย หากเลื่อนได้หรือมีเวลาเตรียมตัวมากขึ้น พลังจักรวาลจะเปลี่ยนแปลงในทางที่ดี ไม่งั้นต้องทุ่มเทเป็นสองเท่า`,
  };
  return {
    answer: `The cosmic alignment does not favor this at the moment. The answer leans toward no for now. However, the stars are always shifting. Be patient, focus on self-improvement, and watch for better timing in the coming weeks.`,
    answerTh: `การเรียงตัวของจักรวาลไม่เข้าข้างเรื่องนี้ในขณะนี้ คำตอบเอียงไปทาง "ยังไม่ใช่ตอนนี้" อย่างไรก็ตาม ดวงดาวเปลี่ยนแปลงเสมอ อดทน มุ่งพัฒนาตัวเอง และจับตาดูจังหวะที่ดีกว่าในสัปดาห์ข้างหน้า`,
  };
}

function generateOpenAnswer(score: number, topic: Topic, zodiac: typeof ZODIAC_DATA[ZodiacSign]): { answer: string; answerTh: string } {
  const v = getVerdict(score);
  const topicAdvice: Record<Topic, { en: string; th: string }> = {
    love: { en: `In matters of the heart, your ${zodiac.element} nature seeks ${zodiac.element === "Water" ? "deep emotional bonds" : zodiac.element === "Fire" ? "passionate connections" : zodiac.element === "Earth" ? "stable devotion" : "intellectual chemistry"}. The current cosmic cycle is ${v.level === "very_positive" || v.level === "positive" ? "opening doors for love" : "asking you to be patient in romance"}.`, th: `ในเรื่องของหัวใจ ธรรมชาติ${zodiac.element}ของคุณแสวงหา${zodiac.element === "Water" ? "สายใยทางอารมณ์ที่ลึกซึ้ง" : zodiac.element === "Fire" ? "ความเชื่อมต่อที่หลงใหล" : zodiac.element === "Earth" ? "ความทุ่มเทที่มั่นคง" : "เคมีทางสติปัญญา"} วงจรจักรวาลในปัจจุบัน${v.level === "very_positive" || v.level === "positive" ? "กำลังเปิดประตูให้ความรัก" : "ขอให้คุณอดทนในเรื่องความรัก"}` },
    career: { en: `Your professional path is influenced by ${zodiac.ruler}. This period is ${v.level === "very_positive" ? "excellent for bold career moves" : v.level === "positive" ? "good for steady progress" : "better suited for planning than acting"}. Lean into your ${zodiac.strengths[0]} as your greatest professional asset.`, th: `เส้นทางอาชีพของคุณได้รับอิทธิพลจาก${zodiac.ruler} ช่วงเวลานี้${v.level === "very_positive" ? "เหมาะอย่างยิ่งสำหรับการก้าวกระโดดในอาชีพ" : v.level === "positive" ? "ดีสำหรับความก้าวหน้าที่มั่นคง" : "เหมาะกับการวางแผนมากกว่าลงมือทำ"} ใช้ความ${zodiac.strengths[0]}เป็นทรัพย์สินทางอาชีพที่ดีที่สุดของคุณ` },
    education: { en: `Your mind is sharp as a ${zodiac.symbol}. ${v.level === "very_positive" || v.level === "positive" ? "This is a favorable time for learning and academic success." : "Focus and discipline will be key to academic achievement right now."} Your ${zodiac.traits[2] || zodiac.traits[0]} quality supports deep understanding.`, th: `จิตใจคุณเฉียบแหลมดั่ง${zodiac.symbol} ${v.level === "very_positive" || v.level === "positive" ? "นี่คือช่วงเวลาที่ดีสำหรับการเรียนรู้และความสำเร็จทางวิชาการ" : "สมาธิและวินัยจะเป็นกุญแจสู่ความสำเร็จทางการศึกษาในตอนนี้"} ความ${zodiac.traits[2] || zodiac.traits[0]}ของคุณสนับสนุนความเข้าใจอย่างลึกซึ้ง` },
    health: { en: `Your ${zodiac.element} constitution ${v.level === "very_positive" || v.level === "positive" ? "is strong and vitality flows well" : "needs extra care during this period"}. Focus on ${zodiac.element === "Fire" ? "managing energy levels" : zodiac.element === "Water" ? "emotional balance and hydration" : zodiac.element === "Earth" ? "consistent daily routines" : "mental rest and deep breathing"}.`, th: `ร่างกาย${zodiac.element}ของคุณ${v.level === "very_positive" || v.level === "positive" ? "แข็งแรงและพลังชีวิตไหลดี" : "ต้องดูแลเป็นพิเศษในช่วงนี้"} เน้นที่${zodiac.element === "Fire" ? "การจัดการระดับพลังงาน" : zodiac.element === "Water" ? "สมดุลอารมณ์และดื่มน้ำมากๆ" : zodiac.element === "Earth" ? "กิจวัตรประจำวันที่สม่ำเสมอ" : "พักผ่อนจิตใจและหายใจลึกๆ"}` },
    finance: { en: `Financial energy from ${zodiac.ruler} is ${v.level === "very_positive" ? "very strong - this is a lucrative period" : v.level === "positive" ? "favorable - good returns on wise investments" : "moderate - save more than you spend"}. Your ${zodiac.element} nature ${zodiac.element === "Earth" ? "naturally builds wealth through patience" : "benefits from structured financial planning"}.`, th: `พลังการเงินจาก${zodiac.ruler} ${v.level === "very_positive" ? "แข็งแกร่งมาก นี่คือช่วงทำเงิน" : v.level === "positive" ? "เป็นมงคล ลงทุนอย่างชาญฉลาดจะได้ผลตอบแทนดี" : "ปานกลาง ออมมากกว่าใช้"} ธรรมชาติ${zodiac.element}ของคุณ${zodiac.element === "Earth" ? "สร้างความมั่งคั่งผ่านความอดทนอย่างเป็นธรรมชาติ" : "ได้ประโยชน์จากการวางแผนการเงินที่มีระบบ"}` },
    family: { en: `Family bonds are ${v.level === "very_positive" || v.level === "positive" ? "strengthening during this cycle" : "going through a period of adjustment"}. Your ${zodiac.traits[0]} nature helps you ${v.level === "very_positive" ? "bring harmony to the home" : "navigate family dynamics with grace"}.`, th: `สายใยครอบครัว${v.level === "very_positive" || v.level === "positive" ? "แข็งแกร่งขึ้นในรอบนี้" : "กำลังผ่านช่วงปรับตัว"} ความ${zodiac.traits[0]}ของคุณช่วยให้${v.level === "very_positive" ? "นำความสมดุลมาสู่บ้าน" : "รับมือกับพลวัตในครอบครัวอย่างนุ่มนวล"}` },
    spiritual: { en: `Your spiritual path as a ${zodiac.symbol} is ${v.level === "very_positive" || v.level === "positive" ? "illuminated right now - insights come easily" : "in a quiet growth phase - be patient with yourself"}. The ${zodiac.element} element connects you to ${zodiac.element === "Water" ? "intuition and dreams" : zodiac.element === "Fire" ? "transformative energy" : zodiac.element === "Earth" ? "grounded wisdom" : "higher consciousness"}.`, th: `เส้นทางจิตวิญญาณในฐานะ${zodiac.symbol}ของคุณ${v.level === "very_positive" || v.level === "positive" ? "สว่างไสวในตอนนี้ ปัญญามาง่าย" : "อยู่ในช่วงเติบโตอย่างเงียบๆ อดทนกับตัวเอง"} ธาตุ${zodiac.element}เชื่อมต่อคุณกับ${zodiac.element === "Water" ? "สัญชาตญาณและความฝัน" : zodiac.element === "Fire" ? "พลังแห่งการเปลี่ยนแปลง" : zodiac.element === "Earth" ? "ปัญญาที่มั่นคง" : "จิตสำนึกที่สูงขึ้น"}` },
    general: { en: `The cosmos see you at a ${v.level === "very_positive" ? "powerful turning point" : v.level === "positive" ? "period of growth" : "moment of reflection"}. As a ${zodiac.symbol} ruled by ${zodiac.ruler}, trust your ${zodiac.strengths[0]}. ${v.level === "very_positive" || v.level === "positive" ? "This is a good time to act on what matters to you." : "Patience and careful planning will serve you better than haste."}`, th: `จักรวาลเห็นคุณอยู่ที่${v.level === "very_positive" ? "จุดเปลี่ยนที่ทรงพลัง" : v.level === "positive" ? "ช่วงเวลาแห่งการเติบโต" : "ช่วงเวลาแห่งการใคร่ครวญ"} ในฐานะ${zodiac.symbol}ภายใต้การปกครองของ${zodiac.ruler} เชื่อมั่นใน${zodiac.strengths[0]}ของคุณ ${v.level === "very_positive" || v.level === "positive" ? "นี่เป็นเวลาที่ดีที่จะลงมือทำในสิ่งที่สำคัญ" : "ความอดทนและการวางแผนจะดีกว่าความเร่งรีบ"}` },
  };
  return { answer: topicAdvice[topic].en, answerTh: topicAdvice[topic].th };
}

// ─── Personal Reading ───────────────────────────────────────

export interface PersonalReadingInput {
  name: string; age: number; zodiacSign: ZodiacSign;
  birthDate: string; gender: string; question: string;
  relationship?: string; occupation?: string; concern?: string;
}

export interface PersonalReading {
  verdict: string;
  verdictTh: string;
  verdictLevel: string;
  cosmicScore: number;
  answer: string;
  answerTh: string;
  advice: string;
  adviceTh: string;
  warning: string;
  warningTh: string;
  luckyNumbers: number[];
  luckyDay: string;
  luckyColor: string;
  lunarPhase: string;
}

export function generatePersonalReading(input: PersonalReadingInput): PersonalReading {
  const now = new Date();
  const zodiac = ZODIAC_DATA[input.zodiacSign];
  const nn = nameNumber(input.name);
  const lp = lifePathNumber(new Date(input.birthDate));
  const lunar = lunarPhase(now);
  const tb = timeBonus(now.getHours());
  const sb = seasonBonus(now.getMonth());
  const signIndex = ZODIAC_SIGNS.indexOf(input.zodiacSign);
  const topic = detectTopic(input.question, input.concern || "");
  const qType = detectQuestionType(input.question);

  const score = calculateCosmicScore({
    nameNum: nn, lifePath: lp, lunarBonus: lunar.bonus,
    timeB: tb, seasonB: sb, signIndex, element: zodiac.element,
    topic, concern: input.concern || "", age: input.age,
    relationship: input.relationship || "",
  });

  const verdict = getVerdict(score);

  // Generate answer based on question type
  let answerData: { answer: string; answerTh: string };
  if (qType === "yes_no") {
    answerData = generateYesNoAnswer(score, topic, zodiac, input.question);
  } else {
    answerData = generateOpenAnswer(score, topic, zodiac);
  }

  // Advice
  const advices = [
    { en: `Your ${zodiac.strengths[0]} is your greatest asset right now. Lean into it and watch for your tendency toward ${zodiac.challenges[0]} which could hold you back.`, th: `${zodiac.strengths[0]}ของคุณคือทรัพย์สินที่ดีที่สุดในตอนนี้ พึ่งพามันและระวังนิสัย${zodiac.challenges[0]}ที่อาจฉุดรั้งคุณ` },
    { en: `${zodiac.ruler} guides you toward using your ${zodiac.traits[1]} nature. The ${lunar.phase} amplifies intuition - trust your gut feelings in the coming days.`, th: `${zodiac.ruler}นำทางคุณให้ใช้ความ${zodiac.traits[1]}ของตัวเอง ${lunar.phase}เพิ่มพลังสัญชาตญาณ เชื่อใจความรู้สึกภายในในวันต่อๆ ไป` },
    { en: `Focus on what you can control. Your ${zodiac.quality.toLowerCase()} energy helps you ${zodiac.quality === "Cardinal" ? "start new paths" : zodiac.quality === "Fixed" ? "stay the course" : "adapt to changes"}. Small consistent steps will bring the biggest results.`, th: `เน้นที่สิ่งที่คุณควบคุมได้ พลัง${zodiac.quality}ช่วยให้คุณ${zodiac.quality === "Cardinal" ? "เริ่มเส้นทางใหม่" : zodiac.quality === "Fixed" ? "มุ่งมั่นในเส้นทาง" : "ปรับตัวกับการเปลี่ยนแปลง"} ก้าวเล็กๆ สม่ำเสมอจะนำมาซึ่งผลลัพธ์ที่ยิ่งใหญ่ที่สุด` },
  ];
  const seed = (nn + lp + signIndex + now.getDate()) % advices.length;
  const advice = advices[seed];

  // Warning
  const warnings = [
    { en: `Be mindful of ${zodiac.challenges[0]} in the coming days. The ${lunar.phase} can amplify emotional reactions.`, th: `ระวัง${zodiac.challenges[0]}ในวันต่อๆ ไป ${lunar.phase}อาจเพิ่มปฏิกิริยาทางอารมณ์` },
    { en: `Do not let ${zodiac.challenges[1] || zodiac.challenges[0]} cloud your judgment. Trust the process and stay grounded.`, th: `อย่าปล่อยให้${zodiac.challenges[1] || zodiac.challenges[0]}บดบังวิจารณญาณ เชื่อมั่นในกระบวนการและมั่นคงไว้` },
  ];

  const dailySeed = (now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate() + nn) % 100;
  const luckyNums = zodiac.luckyNumbers.map(n => ((n + dailySeed) % 49) + 1);

  return {
    verdict: verdict.label,
    verdictTh: verdict.labelTh,
    verdictLevel: verdict.level,
    cosmicScore: score,
    answer: answerData.answer,
    answerTh: answerData.answerTh,
    advice: advice.en,
    adviceTh: advice.th,
    warning: warnings[seed % warnings.length].en,
    warningTh: warnings[seed % warnings.length].th,
    luckyNumbers: luckyNums,
    luckyDay: zodiac.luckyDay,
    luckyColor: zodiac.color,
    lunarPhase: lunar.phase,
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
  advice: string;
  adviceTh: string;
  rating: number;
  luckyNumbers: number[];
  bestDay: string;
  caution: string;
  cautionTh: string;
  affirmation: string;
  affirmationTh: string;
}

// Concise, mystical, understandable readings
const READINGS: Record<Category, Record<Period, { en: string[]; th: string[] }>> = {
  love: {
    daily: {
      en: [
        "A tender glow surrounds your heart today. If single, stay open to unexpected conversations. If committed, a small gesture of affection will reignite warmth.",
        "Emotional honesty is your greatest power today. Say what you feel without fear. Love rewards the brave and the vulnerable alike.",
        "Romance flows gently. Listen more than you speak, and someone's true feelings will reveal themselves to you.",
      ],
      th: [
        "แสงอ่อนโอบล้อมหัวใจคุณวันนี้ ถ้าโสด เปิดรับการสนทนาที่ไม่คาดฝัน ถ้ามีคู่ ท่าทางเล็กๆ ที่อ่อนหวานจะจุดความอบอุ่นขึ้นมาใหม่",
        "ความซื่อสัตย์ทางอารมณ์คือพลังที่ยิ่งใหญ่ที่สุดของคุณวันนี้ พูดในสิ่งที่รู้สึกโดยไม่ต้องกลัว ความรักให้รางวัลคนกล้าและคนเปิดเผย",
        "ความรักไหลเอื่อยๆ ฟังมากกว่าพูด แล้วความรู้สึกที่แท้จริงของใครบางคนจะเปิดเผยให้คุณเห็น",
      ],
    },
    weekly: {
      en: [
        "Early this week, clear communication resolves lingering tension. By midweek, a social event opens new doors. The weekend brings emotional depth and meaningful bonding.",
        "Existing relationships deepen through shared experiences. Singles may find attraction in unexpected places. Thursday holds particular promise.",
      ],
      th: [
        "ต้นสัปดาห์ การสื่อสารที่ชัดเจนจะคลี่คลายความตึงเครียดที่ค้างคา กลางสัปดาห์ งานสังคมเปิดประตูใหม่ สุดสัปดาห์นำมาซึ่งความลึกซึ้งทางอารมณ์",
        "ความสัมพันธ์ที่มีอยู่จะลึกซึ้งขึ้นผ่านประสบการณ์ร่วม คนโสดอาจพบแรงดึงดูดในที่ไม่คาดคิด วันพฤหัสเป็นวันที่ดีเป็นพิเศษ",
      ],
    },
    monthly: {
      en: [
        "The first week invites self-reflection on past patterns. Weeks two and three bring dynamic social energy and potential new connections. The final week calls for deeper commitment or self-love.",
        "Old patterns may resurface to be healed. By mid-month, clarity emerges about what your heart truly needs. A new chapter begins before month's end.",
      ],
      th: [
        "สัปดาห์แรกเชิญให้ทบทวนรูปแบบในอดีต สัปดาห์สองและสามนำพลังสังคมและโอกาสพบคนใหม่ สัปดาห์สุดท้ายเรียกร้องการผูกพันที่ลึกขึ้นหรือการรักตัวเอง",
        "รูปแบบเก่าอาจปรากฏขึ้นเพื่อรักษา กลางเดือน ความชัดเจนจะปรากฏว่าหัวใจต้องการอะไรจริงๆ บทใหม่เริ่มก่อนสิ้นเดือน",
      ],
    },
    yearly: {
      en: [
        "A year of transformation in love. The first quarter heals old wounds. Spring and summer ignite passion. Autumn deepens commitment. Winter brings warmth and belonging.",
      ],
      th: [
        "ปีแห่งการเปลี่ยนแปลงในความรัก ไตรมาสแรกรักษาบาดแผลเก่า ฤดูใบไม้ผลิและฤดูร้อนจุดประกายความหลงใหล ฤดูใบไม้ร่วงทำให้ผูกพันลึกซึ้งขึ้น ฤดูหนาวนำความอบอุ่นและความรู้สึกเป็นส่วนหนึ่ง",
      ],
    },
  },
  wealth: {
    daily: {
      en: [
        "Financial currents flow favorably today. An opportunity may come through a conversation. Avoid impulse purchases in the afternoon.",
        "A past investment of time or money begins to show returns. Trust your instincts about money matters today.",
        "Small financial decisions today have longer ripple effects than you realize. Review your plans carefully.",
      ],
      th: [
        "กระแสการเงินไหลดีวันนี้ โอกาสอาจมาจากบทสนทนา หลีกเลี่ยงการซื้อของตามอารมณ์ในช่วงบ่าย",
        "การลงทุนในอดีตไม่ว่าเวลาหรือเงินเริ่มให้ผลตอบแทน เชื่อสัญชาตญาณเรื่องเงินวันนี้",
        "การตัดสินใจทางการเงินเล็กๆ วันนี้มีผลกระทบยาวนานกว่าที่คุณคิด ทบทวนแผนอย่างรอบคอบ",
      ],
    },
    weekly: {
      en: [
        "Monday through Wednesday: review and restructure your approach. Thursday brings a potential income opportunity. Weekend is for long-term planning.",
        "A week of financial awakening. Spending patterns need adjustment early on. Midweek may present a business proposition.",
      ],
      th: [
        "จันทร์ถึงพุธ: ทบทวนและปรับโครงสร้างแนวทาง พฤหัสนำโอกาสรายได้ สุดสัปดาห์เหมาะกับการวางแผนระยะยาว",
        "สัปดาห์แห่งการตื่นตัวทางการเงิน รูปแบบการใช้จ่ายต้องปรับตั้งแต่ต้นสัปดาห์ กลางสัปดาห์อาจมีข้อเสนอทางธุรกิจ",
      ],
    },
    monthly: {
      en: [
        "First ten days: clear debts and organize. Mid-month: an unexpected income opportunity arrives. Final days: save and invest wisely for the future.",
        "What you believe about money is being challenged constructively. Mid-month brings a financial crossroads. The stars favor calculated risks.",
      ],
      th: [
        "สิบวันแรก: ชำระหนี้และจัดระเบียบ กลางเดือน: โอกาสรายได้ที่ไม่คาดคิดมาถึง วันสุดท้าย: ออมและลงทุนอย่างชาญฉลาด",
        "สิ่งที่คุณเชื่อเรื่องเงินกำลังถูกท้าทายอย่างสร้างสรรค์ กลางเดือนมาถึงทางแยกทางการเงิน ดวงดาวสนับสนุนความเสี่ยงที่คิดคำนวณแล้ว",
      ],
    },
    yearly: {
      en: [
        "The first quarter builds foundations. Spring and summer bring expansion. Autumn consolidates gains. Winter rewards wise planning with security and abundance.",
      ],
      th: [
        "ไตรมาสแรกสร้างรากฐาน ฤดูใบไม้ผลิและฤดูร้อนนำการขยายตัว ฤดูใบไม้ร่วงรวบรวมผลกำไร ฤดูหนาวให้รางวัลการวางแผนที่ดีด้วยความมั่นคงและความอุดมสมบูรณ์",
      ],
    },
  },
  health: {
    daily: {
      en: [
        "Your body is receptive to healing today. Focus on hydration and gentle movement. Listen to your body's whispers before they become shouts.",
        "The mind-body connection is strong today. Release stress through stretching or walking. Energy peaks in the morning.",
        "Vital energy is strong today but needs conscious direction. Physical activity in the morning, rest in the evening.",
      ],
      th: [
        "ร่างกายพร้อมรับการเยียวยาวันนี้ เน้นดื่มน้ำและเคลื่อนไหวเบาๆ ฟังเสียงกระซิบของร่างกายก่อนที่มันจะต้องตะโกน",
        "ความเชื่อมต่อกาย-ใจแข็งแกร่งวันนี้ ปล่อยความเครียดผ่านการยืดเหยียดหรือเดิน พลังงานสูงสุดในตอนเช้า",
        "พลังชีวิตแข็งแรงวันนี้แต่ต้องบังคับทิศทางอย่างมีสติ ออกกำลังตอนเช้า พักผ่อนตอนเย็น",
      ],
    },
    weekly: {
      en: [
        "First half: lighter eating and more water. Midweek: peak energy for exercise. Weekend: rest and recovery. New health habits started now will stick.",
        "Balance is the theme. Give your nervous system rest through mindful practices. Alternate activity with recovery.",
      ],
      th: [
        "ครึ่งแรก: กินเบาๆ ดื่มน้ำมากขึ้น กลางสัปดาห์: พลังสูงสุดสำหรับออกกำลัง สุดสัปดาห์: พักผ่อนฟื้นฟู นิสัยสุขภาพที่เริ่มตอนนี้จะยั่งยืน",
        "สมดุลคือหัวใจ ให้ระบบประสาทพักผ่อนผ่านการฝึกสติ สลับกิจกรรมกับการฟื้นตัว",
      ],
    },
    monthly: {
      en: [
        "New Moon phase: set health intentions. Waxing phase: increase intensity. Full Moon: change unhealthy habits. Waning phase: rest and release.",
        "A month of health awareness. Address concerns early for easy resolution. Consistency brings noticeable improvements by month's end.",
      ],
      th: [
        "เดือนมืด: ตั้งเจตนาด้านสุขภาพ ข้างขึ้น: เพิ่มความเข้มข้น วันเพ็ญ: เปลี่ยนนิสัยที่ไม่ดี ข้างแรม: พักผ่อนและปลดปล่อย",
        "เดือนแห่งการตระหนักด้านสุขภาพ จัดการปัญหาแต่เนิ่นๆ จะแก้ได้ง่าย ความสม่ำเสมอนำมาซึ่งการเปลี่ยนแปลงที่เห็นได้ชัดเมื่อสิ้นเดือน",
      ],
    },
    yearly: {
      en: [
        "First quarter breaks old patterns. Spring transforms your energy. Summer tests consistency. Autumn refines your approach. Winter brings deep rest and renewal.",
      ],
      th: [
        "ไตรมาสแรกทำลายรูปแบบเก่า ฤดูใบไม้ผลิเปลี่ยนแปลงพลังงาน ฤดูร้อนทดสอบความสม่ำเสมอ ฤดูใบไม้ร่วงปรับแต่งแนวทาง ฤดูหนาวนำการพักผ่อนลึกและการฟื้นตัว",
      ],
    },
  },
};

const AFFIRMATIONS: Record<Category, { en: string[]; th: string[] }> = {
  love: {
    en: [
      "I am worthy of deep, genuine love and I attract it effortlessly.",
      "My heart is open to giving and receiving love in its highest form.",
      "The love I seek is also seeking me.",
    ],
    th: [
      "ฉันสมควรได้รับความรักที่ลึกซึ้งและจริงใจ และฉันดึงดูดมันอย่างเป็นธรรมชาติ",
      "หัวใจของฉันเปิดรับการให้และรับความรักในรูปแบบสูงสุด",
      "ความรักที่ฉันตามหา กำลังตามหาฉันเช่นกัน",
    ],
  },
  wealth: {
    en: [
      "Abundance flows to me from expected and unexpected sources.",
      "I am a magnet for prosperity and my wealth grows daily.",
      "Financial freedom is my birthright and I claim it with gratitude.",
    ],
    th: [
      "ความอุดมสมบูรณ์ไหลมาหาฉันจากแหล่งที่คาดและไม่คาดคิด",
      "ฉันเป็นแม่เหล็กแห่งความมั่งคั่ง และความร่ำรวยของฉันเติบโตทุกวัน",
      "อิสรภาพทางการเงินเป็นสิทธิ์โดยกำเนิดของฉัน และฉันรับมันด้วยความกตัญญู",
    ],
  },
  health: {
    en: [
      "My body is a temple of healing and every cell vibrates with wellness.",
      "Healing energy flows through me, restoring balance and vitality.",
      "Every breath fills me with life force and renewed energy.",
    ],
    th: [
      "ร่างกายของฉันเป็นวิหารแห่งการเยียวยา และทุกเซลล์สั่นสะเทือนด้วยสุขภาพดี",
      "พลังการเยียวยาไหลผ่านฉัน ฟื้นฟูสมดุลและความมีชีวิตชีวา",
      "ทุกลมหายใจเติมเต็มฉันด้วยพลังชีวิตและพลังงานที่ฟื้นใหม่",
    ],
  },
};

export function generateGeneralReading(
  zodiacSign: ZodiacSign, category: Category, period: Period,
): GeneralReading {
  const now = new Date();
  const zodiac = ZODIAC_DATA[zodiacSign];
  const lunar = lunarPhase(now);
  const signIndex = ZODIAC_SIGNS.indexOf(zodiacSign);
  const catIndex = ["love", "wealth", "health"].indexOf(category);
  const perIndex = ["daily", "weekly", "monthly", "yearly"].indexOf(period);
  const dateSeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const seed = (signIndex * 7 + catIndex * 13 + perIndex * 17 + dateSeed) % 1000;

  const readings = READINGS[category][period];
  const overview = readings.en[seed % readings.en.length];
  const overviewTh = readings.th[seed % readings.th.length];

  // Rating
  const lunarBonus = lunar.phase.includes("Full") || lunar.phase.includes("New") ? 1 : 0;
  const elementalBonus = (zodiac.element === "Fire" && category === "wealth") ||
    (zodiac.element === "Water" && category === "love") ||
    (zodiac.element === "Earth" && category === "health") ? 1 : 0;
  const rating = Math.min(5, Math.max(1, (seed % 5) + 1 + lunarBonus + elementalBonus));

  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const periodLabel = period.charAt(0).toUpperCase() + period.slice(1);

  const advices: { en: string[]; th: string[] } = {
    en: [
      `Lean into your ${zodiac.traits[0]} nature and let ${zodiac.strengths[0]} guide you.`,
      `The ${lunar.phase} amplifies your ${zodiac.element} energy. Use it wisely.`,
      `Trust your ${zodiac.strengths[1] || zodiac.strengths[0]} to navigate this ${period} cycle.`,
    ],
    th: [
      `พึ่งพาความ${zodiac.traits[0]}ของคุณ และให้${zodiac.strengths[0]}นำทาง`,
      `${lunar.phase}เพิ่มพลัง${zodiac.element}ของคุณ ใช้อย่างชาญฉลาด`,
      `เชื่อมั่นใน${zodiac.strengths[1] || zodiac.strengths[0]}เพื่อรับมือกับรอบ${period}นี้`,
    ],
  };

  const cautions: { en: string[]; th: string[] } = {
    en: [
      `Watch for ${zodiac.challenges[0]} during this period.`,
      `The ${lunar.phase} may amplify ${zodiac.challenges[1] || zodiac.challenges[0]}.`,
    ],
    th: [
      `ระวัง${zodiac.challenges[0]}ในช่วงนี้`,
      `${lunar.phase}อาจเพิ่ม${zodiac.challenges[1] || zodiac.challenges[0]}`,
    ],
  };

  const affs = AFFIRMATIONS[category];
  const luckyNums = zodiac.luckyNumbers.map(n => ((n * (seed % 10 + 1) + catIndex) % 49) + 1);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const bestDay = period === "daily" ? "Today" : days[(seed + signIndex) % 7];

  return {
    title: `${periodLabel} ${categoryLabel} Reading for ${zodiacSign}`,
    zodiacSign, category, period,
    overview,
    overviewTh,
    advice: advices.en[seed % advices.en.length],
    adviceTh: advices.th[seed % advices.th.length],
    rating,
    luckyNumbers: luckyNums,
    bestDay,
    caution: cautions.en[seed % cautions.en.length],
    cautionTh: cautions.th[seed % cautions.th.length],
    affirmation: affs.en[seed % affs.en.length],
    affirmationTh: affs.th[seed % affs.th.length],
  };
}
