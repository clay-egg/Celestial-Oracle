/**
 * Complete 78-card Rider-Waite-Smith (1909 public domain) tarot dataset
 * with Fisher-Yates shuffle utility.
 */

export interface TarotCard {
  id: string;
  name: string;
  arcana: "major" | "minor";
  suit?: "wands" | "cups" | "swords" | "pentacles";
  number: number;
  imageUrl: string;       // served from /public/tarot/cards/
  keywords: string[];
  upright: string;
  reversed: string;
  description: string;
}

const CARD_BASE = "/tarot/cards";

// ---------------------------------------------------------------------------
// Major Arcana (22 cards)
// ---------------------------------------------------------------------------
const MAJOR_ARCANA: TarotCard[] = [
  {
    id: "major-0", name: "The Fool", arcana: "major", number: 0,
    imageUrl: `${CARD_BASE}/ar00.jpg`,
    keywords: ["beginnings", "innocence", "spontaneity", "free spirit"],
    upright: "New beginnings, a leap of faith, unlimited potential, and adventure ahead.",
    reversed: "Recklessness, naivety, risk-taking without foresight.",
    description: "The Fool stands at the edge of a cliff, carefree and full of optimism, about to embark on a new journey.",
  },
  {
    id: "major-1", name: "The Magician", arcana: "major", number: 1,
    imageUrl: `${CARD_BASE}/ar01.jpg`,
    keywords: ["manifestation", "power", "skill", "concentration"],
    upright: "Willpower, desire, creation, and manifestation of your goals.",
    reversed: "Manipulation, poor planning, untapped talents.",
    description: "The Magician channels the four elements — Wand, Cup, Sword, and Pentacle — to manifest will into reality.",
  },
  {
    id: "major-2", name: "The High Priestess", arcana: "major", number: 2,
    imageUrl: `${CARD_BASE}/ar02.jpg`,
    keywords: ["intuition", "mystery", "subconscious", "inner knowledge"],
    upright: "Intuition, sacred knowledge, the subconscious mind, and divine feminine.",
    reversed: "Secrets, disconnection from intuition, withdrawal.",
    description: "The High Priestess sits between pillars of light and dark, guarding the veil between the visible and hidden worlds.",
  },
  {
    id: "major-3", name: "The Empress", arcana: "major", number: 3,
    imageUrl: `${CARD_BASE}/ar03.jpg`,
    keywords: ["femininity", "beauty", "abundance", "nature"],
    upright: "Femininity, beauty, nature, abundance, and nurturing.",
    reversed: "Creative block, dependence, smothering energy.",
    description: "The Empress embodies fertility and the abundance of nature, seated on her throne surrounded by lush greenery.",
  },
  {
    id: "major-4", name: "The Emperor", arcana: "major", number: 4,
    imageUrl: `${CARD_BASE}/ar04.jpg`,
    keywords: ["authority", "structure", "control", "fatherhood"],
    upright: "Authority, father figure, structure, and solid foundations.",
    reversed: "Tyranny, rigidity, domination, inflexibility.",
    description: "The Emperor sits upon a stone throne adorned with ram heads, representing authority, stability and worldly power.",
  },
  {
    id: "major-5", name: "The Hierophant", arcana: "major", number: 5,
    imageUrl: `${CARD_BASE}/ar05.jpg`,
    keywords: ["tradition", "conformity", "morality", "beliefs"],
    upright: "Spiritual wisdom, religious beliefs, conformity, tradition.",
    reversed: "Personal beliefs, freedom, challenging the status quo.",
    description: "The Hierophant is the spiritual authority who transmits sacred knowledge through established institutions.",
  },
  {
    id: "major-6", name: "The Lovers", arcana: "major", number: 6,
    imageUrl: `${CARD_BASE}/ar06.jpg`,
    keywords: ["love", "harmony", "relationships", "choices"],
    upright: "Love, harmony, relationships, values alignment, and choices.",
    reversed: "Self-love, disharmony, imbalance, misalignment of values.",
    description: "Two figures stand beneath an angel, representing the sacred bond of love and the gravity of choices made from the heart.",
  },
  {
    id: "major-7", name: "The Chariot", arcana: "major", number: 7,
    imageUrl: `${CARD_BASE}/ar07.jpg`,
    keywords: ["control", "willpower", "victory", "assertion"],
    upright: "Control, willpower, success, action, and determination.",
    reversed: "Self-discipline lost, opposition, lack of direction.",
    description: "The Charioteer commands two sphinxes of opposing forces, representing the triumph of will over contradiction.",
  },
  {
    id: "major-8", name: "Strength", arcana: "major", number: 8,
    imageUrl: `${CARD_BASE}/ar08.jpg`,
    keywords: ["strength", "courage", "patience", "inner power"],
    upright: "Strength, courage, patience, control, and compassion.",
    reversed: "Inner strength lost, self-doubt, low energy.",
    description: "A woman gently closes the jaws of a lion — inner strength, not brute force, is the true power.",
  },
  {
    id: "major-9", name: "The Hermit", arcana: "major", number: 9,
    imageUrl: `${CARD_BASE}/ar09.jpg`,
    keywords: ["soul-searching", "introspection", "guidance", "solitude"],
    upright: "Soul-searching, introspection, being alone, and inner guidance.",
    reversed: "Isolation, loneliness, withdrawal.",
    description: "The Hermit holds a lantern aloft in the dark, illuminating only the next step on the path of inner truth.",
  },
  {
    id: "major-10", name: "Wheel of Fortune", arcana: "major", number: 10,
    imageUrl: `${CARD_BASE}/ar10.jpg`,
    keywords: ["good luck", "karma", "life cycles", "fate"],
    upright: "Good luck, karma, life cycles, fate, and a turning point.",
    reversed: "Bad luck, resistance to change, breaking cycles.",
    description: "The great wheel turns endlessly — what rises must fall, and what falls must rise again.",
  },
  {
    id: "major-11", name: "Justice", arcana: "major", number: 11,
    imageUrl: `${CARD_BASE}/ar11.jpg`,
    keywords: ["justice", "fairness", "truth", "cause and effect"],
    upright: "Justice, fairness, truth, cause and effect.",
    reversed: "Unfairness, dishonesty, lack of accountability.",
    description: "Justice holds sword and scales, reminding us that every action has an equal and inevitable consequence.",
  },
  {
    id: "major-12", name: "The Hanged Man", arcana: "major", number: 12,
    imageUrl: `${CARD_BASE}/ar12.jpg`,
    keywords: ["pause", "surrender", "letting go", "new perspectives"],
    upright: "Pause, surrender, letting go, and new perspectives.",
    reversed: "Delays, resistance, stalling, indecision.",
    description: "Suspended willingly upside-down, the Hanged Man sees the world differently — surrender grants enlightenment.",
  },
  {
    id: "major-13", name: "Death", arcana: "major", number: 13,
    imageUrl: `${CARD_BASE}/ar13.jpg`,
    keywords: ["endings", "change", "transformation", "transition"],
    upright: "Endings, change, transformation, and transition.",
    reversed: "Resistance to change, personal transformation, inner purging.",
    description: "Death rides a white horse, signifying not literal death but the inevitable ending that clears the way for new life.",
  },
  {
    id: "major-14", name: "Temperance", arcana: "major", number: 14,
    imageUrl: `${CARD_BASE}/ar14.jpg`,
    keywords: ["balance", "moderation", "patience", "purpose"],
    upright: "Balance, moderation, patience, purpose, and meaning.",
    reversed: "Imbalance, excess, self-healing, re-alignment needed.",
    description: "An angel pours water between two cups in perfect flow — patience and balance create alchemical transformation.",
  },
  {
    id: "major-15", name: "The Devil", arcana: "major", number: 15,
    imageUrl: `${CARD_BASE}/ar15.jpg`,
    keywords: ["shadow self", "attachment", "addiction", "restriction"],
    upright: "Shadow self, attachment, addiction, restriction, and sexuality.",
    reversed: "Releasing limiting beliefs, exploring dark thoughts, detachment.",
    description: "Two figures are chained before the Devil, yet the chains are loose — our bondage is ultimately of our own making.",
  },
  {
    id: "major-16", name: "The Tower", arcana: "major", number: 16,
    imageUrl: `${CARD_BASE}/ar16.jpg`,
    keywords: ["sudden change", "upheaval", "chaos", "revelation"],
    upright: "Sudden change, upheaval, chaos, revelation, and awakening.",
    reversed: "Personal transformation, fear of change, averting disaster.",
    description: "Lightning strikes a tower and figures fall — false foundations crumble so that truth can be built anew.",
  },
  {
    id: "major-17", name: "The Star", arcana: "major", number: 17,
    imageUrl: `${CARD_BASE}/ar17.jpg`,
    keywords: ["hope", "faith", "purpose", "renewal", "spirituality"],
    upright: "Hope, faith, purpose, renewal, and spirituality.",
    reversed: "Lack of faith, despair, self-trust issues, disconnection.",
    description: "A woman pours water from two vessels beneath a brilliant star — hope and healing flow freely after the storm.",
  },
  {
    id: "major-18", name: "The Moon", arcana: "major", number: 18,
    imageUrl: `${CARD_BASE}/ar18.jpg`,
    keywords: ["illusion", "fear", "the subconscious", "dreams"],
    upright: "Illusion, fear, the subconscious, and confusion.",
    reversed: "Release of fear, repressed emotion, inner confusion.",
    description: "The Moon casts ambiguous shadows — the path between the pillars winds through the realm of dreams and deception.",
  },
  {
    id: "major-19", name: "The Sun", arcana: "major", number: 19,
    imageUrl: `${CARD_BASE}/ar19.jpg`,
    keywords: ["positivity", "fun", "warmth", "success", "vitality"],
    upright: "Positivity, fun, warmth, success, and vitality.",
    reversed: "Inner child, feeling down, overly optimistic.",
    description: "A radiant child rides triumphantly beneath the blazing sun — pure joy, clarity, and success.",
  },
  {
    id: "major-20", name: "Judgement", arcana: "major", number: 20,
    imageUrl: `${CARD_BASE}/ar20.jpg`,
    keywords: ["judgement", "rebirth", "inner calling", "absolution"],
    upright: "Judgement, rebirth, inner calling, and absolution.",
    reversed: "Self-doubt, inner critic, ignoring the call.",
    description: "An angel sounds a trumpet and the dead rise — a moment of profound awakening and judgment of the soul.",
  },
  {
    id: "major-21", name: "The World", arcana: "major", number: 21,
    imageUrl: `${CARD_BASE}/ar21.jpg`,
    keywords: ["completion", "integration", "accomplishment", "travel"],
    upright: "Completion, integration, accomplishment, and travel.",
    reversed: "Seeking personal closure, short-cuts, delays.",
    description: "A dancer at the center of a wreath — the cycle is complete; every ending is also a new beginning.",
  },
];

// ---------------------------------------------------------------------------
// Minor Arcana helpers
// ---------------------------------------------------------------------------
type SuitName = "wands" | "cups" | "swords" | "pentacles";
const SUIT_PREFIX: Record<SuitName, string> = {
  wands: "wa", cups: "cu", swords: "sw", pentacles: "pe",
};

const COURT_CARDS = ["Page", "Knight", "Queen", "King"];
const COURT_UPRIGHT: Record<SuitName, Record<string, { keywords: string[]; upright: string; reversed: string; description: string }>> = {
  wands: {
    Page: { keywords: ["enthusiasm", "exploration", "discovery", "free spirit"], upright: "Enthusiasm, exploration, and a free-spirited messenger of new ideas.", reversed: "Setbacks to new ideas, pessimism, lack of direction.", description: "The Page of Wands burns with curiosity and the desire to set off on an adventure." },
    Knight: { keywords: ["energy", "passion", "action", "adventure"], upright: "Energy, passion, inspired action, adventure, and impulsiveness.", reversed: "Passion project, haste, scattered energy.", description: "The Knight of Wands charges forward on a rearing horse, driven by pure fiery ambition." },
    Queen: { keywords: ["courage", "independence", "charisma", "determination"], upright: "Courage, independence, social butterfly, determination, and vibrancy.", reversed: "Selfishness, jealousy, insecurity.", description: "The Queen of Wands radiates warmth and confidence, a natural leader who lights up every room." },
    King: { keywords: ["natural-born leader", "vision", "entrepreneur", "honour"], upright: "Natural-born leader, vision, entrepreneur, and honour.", reversed: "Impulsiveness, haste, ruthlessness, high expectations.", description: "The King of Wands is a master visionary who channels fire into lasting achievement." },
  },
  cups: {
    Page: { keywords: ["creative opportunities", "intuitive messages", "curiosity", "possibility"], upright: "Creative opportunities, intuitive messages, and the magic of emotional curiosity.", reversed: "New ideas blocked, self-doubt, creative blocks.", description: "The Page of Cups receives a surprising message from a fish leaping from his cup — remain open to the unexpected." },
    Knight: { keywords: ["creativity", "romance", "charm", "imagination"], upright: "Creativity, romance, charm, and imagination leading you forward.", reversed: "Moodiness, disappointment, jealousy.", description: "The Knight of Cups rides calmly, following his heart's vision with gentle determination." },
    Queen: { keywords: ["compassionate", "caring", "emotionally stable", "intuitive"], upright: "Compassionate, caring, emotionally stable, and deeply intuitive.", reversed: "Inner feelings, self-care, co-dependency.", description: "The Queen of Cups gazes into her ornate cup, tuned to the unseen currents of emotion and spirit." },
    King: { keywords: ["emotionally balanced", "compassionate", "diplomatic", "wise"], upright: "Emotionally balanced, compassionate, diplomatic, and wise counsel.", reversed: "Emotional manipulation, moodiness, volatility.", description: "The King of Cups rules his watery realm with calm authority and deep emotional wisdom." },
  },
  swords: {
    Page: { keywords: ["new ideas", "curiosity", "thirst for knowledge", "new ways of communicating"], upright: "New ideas, curiosity, thirst for knowledge, and keen intellect.", reversed: "Self-expression blocked, gossip, unprepared.", description: "The Page of Swords stands alert on a hilltop, scanning the horizon with a sharp and restless mind." },
    Knight: { keywords: ["ambitious", "action-oriented", "driven", "fast-thinking"], upright: "Ambitious, action-oriented, driven, and fast-thinking to the point of recklessness.", reversed: "Restlessness, unfocused, impulsive decisions.", description: "The Knight of Swords charges headlong into battle — brilliant, but sometimes heedless of consequences." },
    Queen: { keywords: ["independent", "unbiased judgement", "clear boundaries", "direct communication"], upright: "Independent, unbiased judgement, clear boundaries, and direct communication.", reversed: "Cold-heartedness, cruel words, bitterness.", description: "The Queen of Swords cuts through confusion with precise, compassionate clarity." },
    King: { keywords: ["mental clarity", "intellectual power", "authority", "truth"], upright: "Mental clarity, intellectual power, authority, and truth-telling.", reversed: "Quiet power, inner truth, misuse of power.", description: "The King of Swords commands the realm of thought with absolute authority and incorruptible logic." },
  },
  pentacles: {
    Page: { keywords: ["manifestation", "financial opportunity", "new career opportunity", "skill development"], upright: "Manifestation, financial opportunity, new career opportunity, and skill development.", reversed: "Lack of progress, procrastination, short-term focus.", description: "The Page of Pentacles studies a coin with intense focus — the first steps toward material mastery." },
    Knight: { keywords: ["efficiency", "routine", "conservatism", "methodical"], upright: "Efficiency, routine, conservatism, and methodical work toward long-term goals.", reversed: "Self-discipline lost, boredom, stubbornness.", description: "The Knight of Pentacles moves slowly but purposefully — reliable, hardworking, and patient." },
    Queen: { keywords: ["nurturing", "practical", "providing financially", "working parent"], upright: "Nurturing, practical, providing financially, and a working parent archetype.", reversed: "Financial independence, self-care, work-home conflict.", description: "The Queen of Pentacles holds her coin tenderly, surrounded by abundance she has cultivated with care." },
    King: { keywords: ["abundance", "prosperity", "security", "ambitious"], upright: "Abundance, prosperity, security, and ambitious material achievement.", reversed: "Financially inept, obsessed with wealth, stubbornness.", description: "The King of Pentacles sits upon a throne adorned with vines and bulls — earthly mastery made permanent." },
  },
};

const PIP_DATA: Record<SuitName, Record<number, { keywords: string[]; upright: string; reversed: string; description: string }>> = {
  wands: {
    1: { keywords: ["inspiration", "new opportunities", "growth", "potential"], upright: "Inspiration, new opportunities, growth, and untapped potential.", reversed: "Delays, lack of motivation, weighed down.", description: "A single wand sprouts leaves — the spark of an entirely new creative venture." },
    2: { keywords: ["planning", "making decisions", "leaving comfort zone", "future"], upright: "Planning, making decisions, and leaving the comfort zone for exciting futures.", reversed: "Fear of change, playing it safe, bad planning.", description: "A figure surveys the world from a balcony — great plans take shape in the mind before the journey begins." },
    3: { keywords: ["looking ahead", "expansion", "rapid growth", "foresight"], upright: "Looking ahead, expansion, rapid growth, and long-term vision.", reversed: "Playing small, lack of foresight, obstacles to expansion.", description: "Ships sail toward the horizon — the first ventures out into the world have begun and success is returning." },
    4: { keywords: ["celebration", "joy", "harmony", "homecoming"], upright: "Celebration, joy, harmony, relaxation, and a homecoming.", reversed: "Personal celebration, inner harmony, conflict at home.", description: "Four wands form an archway wreathed in flowers — a moment of communal joy and celebration." },
    5: { keywords: ["conflict", "disagreements", "competition", "tension"], upright: "Conflict, disagreements, competition, tension, and diversity of thought.", reversed: "Inner conflict, conflict avoidance, tension release.", description: "Five figures clash in apparent chaos — the creative tension that ultimately drives growth and innovation." },
    6: { keywords: ["public recognition", "victory", "progress", "self-confidence"], upright: "Public recognition, victory, progress, and well-deserved self-confidence.", reversed: "Private achievement, fall from grace, punishment.", description: "A rider returns in triumph, laurels on his wand — public recognition of hard-won success." },
    7: { keywords: ["challenge", "competition", "perseverance", "defence"], upright: "Challenge, competition, perseverance, and defending your position.", reversed: "Giving up, overwhelmed, defensive.", description: "One figure defends the high ground against six challengers — perseverance and conviction hold the position." },
    8: { keywords: ["rapid action", "movement", "quick decisions", "airborne"], upright: "Rapid action, movement, quick decisions, and news arriving swiftly.", reversed: "Delays, frustration, slowing down, playing for time.", description: "Eight wands fly through open sky — momentum is unstoppable; swift communication and movement." },
    9: { keywords: ["resilience", "grit", "last stand", "persistence"], upright: "Resilience, grit, last stand, persistence, and defending hard-won territory.", reversed: "Inner resources, struggle, overwhelm, paranoia.", description: "A battle-worn figure grips his wand, unwilling to give ground — resilience born of struggle and experience." },
    10: { keywords: ["burden", "extra responsibility", "hard work", "completion"], upright: "Burden, extra responsibility, hard work, and completion near.", reversed: "Doing it all alone, collapse under weight, letting go.", description: "A figure bends under the weight of ten wands — the burden of success and overcommitment." },
  },
  cups: {
    1: { keywords: ["new feelings", "emotional awakening", "creativity", "intuition"], upright: "New feelings, emotional awakening, creativity, and intuition overflowing.", reversed: "Blocked creativity, emptiness, emotional loss.", description: "A dove descends to a cup overflowing — the beginning of emotional and creative abundance." },
    2: { keywords: ["unified love", "partnership", "mutual attraction", "connection"], upright: "Unified love, partnership, mutual attraction, and a powerful new connection.", reversed: "Self-love, breaking up, disharmony in partnership.", description: "Two figures exchange cups below the caduceus of Hermes — a bond of love and mutual respect is sealed." },
    3: { keywords: ["celebration", "friendship", "creativity", "collaborations"], upright: "Celebration, friendship, creativity, community, and joyful collaborations.", reversed: "Independence, alone time, overindulgence.", description: "Three women dance with raised cups — a toast to friendship, shared joy, and communal abundance." },
    4: { keywords: ["meditation", "contemplation", "apathy", "re-evaluation"], upright: "Meditation, contemplation, apathy, and re-evaluation of what truly matters.", reversed: "Retreat, withdrawal, checking in.", description: "A figure beneath a tree ignores three cups while a hand from a cloud offers a fourth — true desire may be unseen." },
    5: { keywords: ["regret", "failure", "disappointment", "pessimism"], upright: "Regret, failure, disappointment, and focusing on what has been lost.", reversed: "Personal setbacks, self-forgiveness, moving on.", description: "A cloaked figure mourns spilled cups, ignoring two still standing — turn around and see what remains." },
    6: { keywords: ["revisiting the past", "childhood memories", "innocence", "joy"], upright: "Revisiting the past, childhood memories, innocence, and nostalgia.", reversed: "Living in the past, forgiveness, lacking playfulness.", description: "Two children share flowers in a garden — the sweet innocence of memory and the gift of simple happiness." },
    7: { keywords: ["opportunities", "choices", "wishful thinking", "illusion"], upright: "Opportunities, choices, wishful thinking, and illusions clouding the path.", reversed: "Alignment, clear purpose, decisive action.", description: "A silhouette faces seven cups of dreams and illusions — not all that glitters is real." },
    8: { keywords: ["disappointment", "abandonment", "withdrawal", "escapism"], upright: "Disappointment, abandonment, withdrawal, and searching for something deeper.", reversed: "Trying again, indecision, aimless drifting.", description: "A figure walks away from eight arranged cups toward distant mountains — the courage to leave behind what no longer serves." },
    9: { keywords: ["contentment", "satisfaction", "gratitude", "wish come true"], upright: "Contentment, satisfaction, gratitude, and a wish granted.", reversed: "Inner happiness, materialism, dissatisfaction.", description: "A satisfied figure sits before nine displayed cups — material comfort and emotional fulfilment achieved." },
    10: { keywords: ["divine love", "blissful relationships", "harmony", "alignment"], upright: "Divine love, blissful relationships, harmony, and alignment with highest purpose.", reversed: "Disconnection from family, broken home, disharmony.", description: "A family rejoices beneath a rainbow of ten cups — the ultimate fulfilment of love, family, and lasting happiness." },
  },
  swords: {
    1: { keywords: ["breakthrough", "new ideas", "mental clarity", "success"], upright: "Breakthrough, new ideas, mental clarity, and cutting through confusion to truth.", reversed: "Inner clarity, re-thinking an idea, clouded judgement.", description: "A sword pierces a crown through clouds — clarity of thought cuts through every obstacle." },
    2: { keywords: ["indecision", "choices", "truce", "stalemate"], upright: "Indecision, choices, truce, stalemate, and difficult decisions requiring balance.", reversed: "Indecision, confusion, information overload.", description: "A blindfolded figure holds two swords crossed — the inner tension of a decision that cannot be delayed forever." },
    3: { keywords: ["heartbreak", "emotional pain", "sorrow", "grief"], upright: "Heartbreak, emotional pain, sorrow, grief, and the wound that brings wisdom.", reversed: "Negative self-talk, releasing pain, optimism returning.", description: "Three swords pierce a heart in the rain — grief and heartbreak that must be fully felt before healing can begin." },
    4: { keywords: ["rest", "restoration", "contemplation", "recovery"], upright: "Rest, restoration, contemplation, recovery, and strategic retreat.", reversed: "Restlessness, burn-out, stress, re-awakening.", description: "A carved figure lies in repose beneath stained glass — rest is not defeat; it is preparation for what comes next." },
    5: { keywords: ["conflict", "disagreements", "competition", "defeat"], upright: "Conflict, disagreements, competition, defeat, and winning at a cost.", reversed: "Reconciliation, making amends, past resentment.", description: "A smirking figure gathers swords while others walk away — hollow victory purchased at the price of others." },
    6: { keywords: ["transition", "change", "rite of passage", "releasing baggage"], upright: "Transition, change, rite of passage, and releasing baggage as you move forward.", reversed: "Resistance to change, unfinished business, stagnation.", description: "A figure ferries passengers away from turbulent waters — moving toward calmer, more hopeful shores." },
    7: { keywords: ["betrayal", "deception", "getting away with something", "strategic action"], upright: "Betrayal, deception, getting away with something, and strategy over force.", reversed: "Imposter syndrome, self-deception, keeping secrets.", description: "A figure sneaks away with five swords — stealth and cunning, though not always honourable." },
    8: { keywords: ["imprisonment", "restriction", "entrapment", "victimhood"], upright: "Imprisonment, restriction, entrapment, and victimhood — you have more freedom than you realise.", reversed: "Self-limiting beliefs, inner critic, open to new perspective.", description: "A bound figure stands surrounded by swords — the imprisonment is largely self-imposed." },
    9: { keywords: ["anxiety", "worry", "fear", "depression", "nightmares"], upright: "Anxiety, worry, fear, depression, and nightmares arising from the depths of the mind.", reversed: "Inner turmoil, deep-seated fears, secrets coming to light.", description: "A figure sits up in bed weeping, nine swords on the wall — the darkest hour of despair before dawn." },
    10: { keywords: ["painful endings", "deep wounds", "betrayal", "rock bottom"], upright: "Painful endings, deep wounds, betrayal, but also the promise of dawn after the darkest night.", reversed: "Recovery, regeneration, resisting an inevitable end.", description: "A figure lies face-down with ten swords in his back — total defeat, yet the sun rises on the horizon." },
  },
  pentacles: {
    1: { keywords: ["manifestation", "financial opportunity", "new venture", "prosperity"], upright: "Manifestation, financial opportunity, new venture, and a seed of lasting prosperity.", reversed: "Lost opportunity, lack of planning, missed chance.", description: "A hand extends from clouds offering a pentacle — a concrete gift from the universe, ready to be cultivated." },
    2: { keywords: ["multiple priorities", "time management", "adaptability", "flexibility"], upright: "Multiple priorities, time management, adaptability, and keeping many balls in the air.", reversed: "Over-committed, disorganised, reprioritising.", description: "A juggler balances two pentacles on infinity ribbons — adaptability and balance keep all things in motion." },
    3: { keywords: ["teamwork", "collaboration", "learning", "implementation"], upright: "Teamwork, collaboration, learning, and skilled implementation of a vision.", reversed: "Disharmony, misalignment, working alone.", description: "A sculptor works in a cathedral while two others observe — mastery is built through collaboration and craft." },
    4: { keywords: ["saving money", "security", "conservatism", "scarcity"], upright: "Saving money, security, conservatism, and the shadow side of hoarding.", reversed: "Over-spending, greed, self-protection.", description: "A figure clutches four coins tightly to his body — security is found, but at the cost of generosity and flow." },
    5: { keywords: ["financial loss", "poverty", "lack mindset", "isolation"], upright: "Financial loss, poverty, lack mindset, isolation, and spiritual poverty.", reversed: "Recovery from financial loss, spiritual poverty, seeking help.", description: "Two figures limp through snow past a lit church window — hardship, but warmth and help are near if sought." },
    6: { keywords: ["giving", "receiving", "sharing wealth", "generosity"], upright: "Giving, receiving, sharing wealth, generosity, and charity in balance.", reversed: "Self-care, unpaid debts, one-sided charity.", description: "A merchant weighs coins and distributes to those in need — the flow of generosity requires both giver and receiver." },
    7: { keywords: ["long-term view", "sustainable results", "perseverance", "investment"], upright: "Long-term view, sustainable results, perseverance, and investment paying off.", reversed: "Lack of long-term vision, limited success, impatience.", description: "A farmer pauses to survey his crop — the results of sustained effort begin to manifest, but the harvest requires patience." },
    8: { keywords: ["apprenticeship", "repetitive tasks", "mastery", "skill development"], upright: "Apprenticeship, repetitive tasks, mastery, and the diligence of developing a craft.", reversed: "Self-development, perfectionism, misdirected activity.", description: "A craftsman carves pentacles in focused dedication — mastery is earned through practice, one stroke at a time." },
    9: { keywords: ["abundance", "luxury", "self-sufficiency", "financial independence"], upright: "Abundance, luxury, self-sufficiency, and the fruits of self-discipline.", reversed: "Self-worth, over-investment in work, hustling.", description: "A woman stands in a lush garden, a hawk on her wrist — she has earned her independence and abundance through effort." },
    10: { keywords: ["wealth", "financial security", "family", "long-term success"], upright: "Wealth, financial security, family, long-term success, and legacy.", reversed: "The dark side of wealth, financial failure, loneliness.", description: "An elder surrounded by family and dogs beneath an archway of pentacles — generational wealth and lasting legacy." },
  },
};

function buildMinorArcana(): TarotCard[] {
  const cards: TarotCard[] = [];
  const suits: SuitName[] = ["wands", "cups", "swords", "pentacles"];

  for (const suit of suits) {
    const prefix = SUIT_PREFIX[suit];
    const suitLabel = suit.charAt(0).toUpperCase() + suit.slice(1);

    // Pip cards 1–10
    for (let n = 1; n <= 10; n++) {
      const label = n === 1 ? "Ace" : String(n);
      const data = PIP_DATA[suit][n];
      cards.push({
        id: `${suit}-${n}`,
        name: `${label} of ${suitLabel}`,
        arcana: "minor",
        suit,
        number: n,
        imageUrl: `${CARD_BASE}/${prefix}${String(n).padStart(2, "0")}.jpg`,
        ...data,
      });
    }

    // Court cards 11–14 (Page, Knight, Queen, King)
    const courtOrder = ["Page", "Knight", "Queen", "King"];
    courtOrder.forEach((court, idx) => {
      const n = 11 + idx;
      const data = COURT_UPRIGHT[suit][court];
      cards.push({
        id: `${suit}-${court.toLowerCase()}`,
        name: `${court} of ${suitLabel}`,
        arcana: "minor",
        suit,
        number: n,
        imageUrl: `${CARD_BASE}/${prefix}${String(n).padStart(2, "0")}.jpg`,
        ...data,
      });
    });
  }
  return cards;
}

export const ALL_TAROT_CARDS: TarotCard[] = [
  ...MAJOR_ARCANA,
  ...buildMinorArcana(),
];

export const CARD_BACK_URL = "/tarot/cards/back.jpg";

/**
 * Fisher–Yates shuffle — returns a new shuffled array, never mutates the original.
 */
export function shuffleDeck<T>(deck: T[]): T[] {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Pick `count` unique random cards from the deck (no duplicates).
 */
export function drawCards(deck: TarotCard[], count: number): TarotCard[] {
  return shuffleDeck(deck).slice(0, count);
}
