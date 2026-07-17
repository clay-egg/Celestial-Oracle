"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Language = "en" | "th";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.brand": "Celestial Oracle",
    "nav.personal": "Personal Reading",
    "nav.general": "General Horoscope",
    "nav.home": "Home",
    "nav.tarot": "Tarot Reading",

    // Hero
    "hero.title": "Celestial Oracle",
    "hero.subtitle": "Unveil the Mysteries of Your Destiny",
    "hero.desc": "Ancient wisdom meets celestial calculation. Your zodiac sign, numerology, lunar phase, and cosmic timing converge to reveal what the universe holds for you.",
    "hero.personal_btn": "Personal Reading",
    "hero.general_btn": "General Horoscope",
    "hero.tarot_btn": "Tarot Reading",

    // Personal Reading
    "personal.title": "Personal Oracle Reading",
    "personal.subtitle": "Share your details and ask your burning question. The Oracle channels celestial wisdom through your zodiac sign, birth numerology, lunar phase, and the cosmic energy of this very moment.",
    "personal.name": "Your Name",
    "personal.name_placeholder": "Enter your full name",
    "personal.age": "Your Age",
    "personal.age_placeholder": "Enter your age",
    "personal.birth_date": "Date of Birth",
    "personal.gender": "Gender",
    "personal.gender_select": "Select (optional)",
    "personal.gender_female": "Female",
    "personal.gender_male": "Male",
    "personal.gender_nonbinary": "Non-binary",
    "personal.gender_other": "Prefer not to say",
    "personal.zodiac": "Your Zodiac Sign",
    "personal.relationship": "Relationship Status",
    "personal.rel_select": "Select your status",
    "personal.rel_single": "Single",
    "personal.rel_in_relationship": "In a Relationship",
    "personal.rel_married": "Married",
    "personal.rel_complicated": "It's Complicated",
    "personal.rel_separated": "Separated / Divorced",
    "personal.occupation": "Occupation / Life Situation",
    "personal.occ_placeholder": "e.g. Student, Office worker, Freelancer...",
    "personal.concern": "What Are You Most Concerned About?",
    "personal.concern_select": "Select your main concern",
    "personal.concern_love": "Love & Relationships",
    "personal.concern_career": "Career & Finance",
    "personal.concern_health": "Health & Wellbeing",
    "personal.concern_family": "Family & Home",
    "personal.concern_spiritual": "Spiritual Growth",
    "personal.concern_decision": "A Big Decision",
    "personal.question": "Your Question for the Oracle",
    "personal.question_placeholder": "Ask anything that weighs on your heart or mind...",
    "personal.question_tip": "Be specific for a deeper reading. For example: \"Will my relationship improve this year?\" or \"Should I change my career path?\"",
    "personal.submit": "Reveal My Fortune",
    "personal.revealing": "The Oracle channels the cosmic energies...",
    "personal.revealing_sub": "Reading the stars, calculating your numerology, consulting the lunar phase...",
    "personal.result_title": "Your Reading Has Been Revealed",
    "personal.result_subtitle": "The cosmos speaks through ancient symbols and celestial alignments",
    "personal.cosmic": "Cosmic Alignment",
    "personal.lunar": "Lunar Influence",
    "personal.time_energy": "Time Energy",
    "personal.seasonal": "Seasonal Wisdom",
    "personal.numerology": "Numerology Insight",
    "personal.answer": "Answer to Your Question",
    "personal.advice": "Personal Advice",
    "personal.overall": "Overall Energy",
    "personal.warning": "Celestial Warning",
    "personal.lucky_numbers": "Lucky Numbers",
    "personal.lucky_day": "Lucky Day",
    "personal.lucky_color": "Lucky Color",
    "personal.ask_again": "Ask the Oracle Again",

    // General Reading
    "general.title": "General Horoscope",
    "general.subtitle": "Choose your zodiac sign, a life category, and a time period. The stars calculate your elemental alignment, lunar phase, seasonal energy, and planetary positions to deliver your cosmic forecast.",
    "general.step1": "Choose Your Zodiac Sign",
    "general.step2": "What Aspect of Life?",
    "general.step2_for": "Reading for",
    "general.step3": "Choose Your Time Period",
    "general.love": "Love",
    "general.love_desc": "Romance, relationships, and emotional connections",
    "general.wealth": "Wealth",
    "general.wealth_desc": "Finances, career, and material abundance",
    "general.health": "Health",
    "general.health_desc": "Physical wellness, vitality, and energy",
    "general.daily": "Daily",
    "general.daily_desc": "Today",
    "general.weekly": "Weekly",
    "general.weekly_desc": "This Week",
    "general.monthly": "Monthly",
    "general.monthly_desc": "This Month",
    "general.yearly": "Yearly",
    "general.yearly_desc": "This Year",
    "general.reveal": "Reveal My Horoscope",
    "general.revealing": "Consulting the celestial charts...",
    "general.revealing_sub": "Aligning planets, reading elements, calculating cosmic influences...",
    "general.overview": "Overview",
    "general.details": "Cosmic Details",
    "general.advice": "Oracle Advice",
    "general.caution": "Caution",
    "general.lucky_numbers": "Lucky Numbers",
    "general.best_day": "Best Day",
    "general.cosmic_rating": "Cosmic Rating",
    "general.cosmic_fav": "Cosmic Favorability",
    "general.affirmation": "Your Affirmation",
    "general.new_reading": "New Reading",
    "general.back_zodiac": "Back to zodiac selection",
    "general.back_category": "Back to category selection",

    // Footer
    "footer.how_title": "How the Oracle Works",
    "footer.celestial_title": "Celestial Alignment",
    "footer.celestial_desc": "Your zodiac sign, ruling planet, element, and quality are combined with the current planetary positions to map your cosmic influence.",
    "footer.temporal_title": "Temporal Factors",
    "footer.temporal_desc": "The current lunar phase, time of day, and seasonal energy are calculated in real-time, just as a fortune teller reads the moment you walk in.",
    "footer.numerology_title": "Personal Numerology",
    "footer.numerology_desc": "Your name number and life path number are derived using Pythagorean numerology, adding a deeply personal layer to your reading.",
    "footer.disclaimer": "Celestial Oracle - For entertainment and personal reflection purposes.",
    "footer.tagline": "The stars illuminate the path, but you must walk it.",

    // Footer - Personal
    "footer.personal_title1": "Astrological Profile",
    "footer.personal_desc1": "Your birth date and chosen zodiac sign map your unique energetic signature and current life path.",
    "footer.personal_title2": "Cosmic Timing",
    "footer.personal_desc2": "We calculate the exact phase of the moon and the planetary transits to understand the energies surrounding your question.",
    "footer.personal_title3": "Numerological Resonance",
    "footer.personal_desc3": "The vibration of your name and age are synthesized using Pythagorean numerology to deepen the reading.",

    // Footer - General
    "footer.general_title1": "Zodiac Blueprint",
    "footer.general_desc1": "The core traits, ruling planet, and elemental nature of your selected sign form the foundation of the forecast.",
    "footer.general_title2": "Life Sector Alignment",
    "footer.general_desc2": "The chosen category directs the cosmic lens towards the specific astrological houses governing love, wealth, or health.",
    "footer.general_title3": "Temporal Projection",
    "footer.general_desc3": "Planetary movements are cast forward over your chosen timeframe to reveal incoming trends and opportunities.",

    // Footer - Tarot
    "footer.tarot_title1": "The Fool's Journey",
    "footer.tarot_desc1": "The Rider-Waite-Smith deck contains 78 archetypes that mirror the human experience and the soul's evolution.",
    "footer.tarot_title2": "The Spread",
    "footer.tarot_desc2": "A classic three-card spread connects the energies of your Past, the reality of your Present, and the potential of your Future.",
    "footer.tarot_title3": "The Oracle's Wisdom",
    "footer.tarot_desc3": "The Oracle channels the traditional meanings and visual symbolism of your drawn cards into a unified, personal narrative.",


    // Tarot
    "tarot.title": "Three-Card Tarot Reading",
    "tarot.subtitle": "Draw three cards from the Rider–Waite–Smith deck and receive a Past, Present, and Future reading guided by ancient tarot wisdom.",
    "tarot.begin_title": "Begin Your Tarot Session",
    "tarot.begin_desc": "Focus your mind, take a breath, and ask your question. When you feel ready, the cards will be shuffled and spread before you.",
    "tarot.question_label": "Your Question (Optional)",
    "tarot.question_placeholder": "What weighs on your heart? Or leave blank for a general reading...",
    "tarot.optional": "Optional",
    "tarot.begin_btn": "Shuffle the Deck",
    "tarot.shuffling": "The cards are being shuffled by cosmic forces...",
    "tarot.pick_prompt": "Choose your cards:",
    "tarot.pick_sub": "Hover to sense the energy. Click to choose. Select 3 cards.",
    "tarot.arranging": "The fates are arranging your cards...",
    "tarot.revealing": "Your destiny is being revealed...",
    "tarot.interpreting": "The Oracle is reading the cosmic alignment...",
    "tarot.try_again": "Try Again",
    "tarot.past": "Past",
    "tarot.present": "Present",
    "tarot.future": "Future",
    "tarot.the_reading": "Your Tarot Reading",
    "tarot.your_question": "Your Question",
    "tarot.oracle_advice": "Oracle Advice",
    "tarot.affirmation": "Your Affirmation",
    "tarot.card_meanings": "Card Meanings",
    "tarot.new_reading": "New Reading",
    "tarot.your_spread": "Your Spread",
    "tarot.reveal_reading": "Reveal My Reading",
  },
  th: {
    // Nav
    "nav.brand": "Celestial Oracle",
    "nav.personal": "ดูดวงส่วนตัว",
    "nav.general": "ดูดวงทั่วไป",
    "nav.home": "หน้าแรก",
    "nav.tarot": "ไพ่ทาโรต์",

    // Hero
    "hero.title": "Celestial Oracle",
    "hero.subtitle": "ไขความลับแห่งชะตาชีวิตคุณ",
    "hero.desc": "ภูมิปัญญาโบราณพบกับพลังดวงดาว ราศี ตัวเลขชีวิต ข้างขึ้นข้างแรม และจังหวะจักรวาล รวมกันเพื่อบอกว่าฟ้าดินมีอะไรรอคุณอยู่",
    "hero.personal_btn": "ดูดวงส่วนตัว",
    "hero.general_btn": "ดูดวงทั่วไป",
    "hero.tarot_btn": "ไพ่ทาโรต์",

    // Personal Reading
    "personal.title": "ดูดวงส่วนตัว",
    "personal.subtitle": "บอกข้อมูลของคุณแล้วถามเรื่องที่อยู่ในใจ ออราเคิลจะเชื่อมโยงพลังจักรวาลผ่านราศี ตัวเลขวันเกิด ข้างขึ้นข้างแรม และพลังงานของจักรวาล ณ ขณะนี้มาตอบคำถามของคุณ",
    "personal.name": "ชื่อของคุณ",
    "personal.name_placeholder": "ใส่ชื่อ-นามสกุล",
    "personal.age": "อายุ",
    "personal.age_placeholder": "ใส่อายุ",
    "personal.birth_date": "วันเกิด",
    "personal.gender": "เพศ",
    "personal.gender_select": "เลือก (ถ้าต้องการ)",
    "personal.gender_female": "ผู้หญิง",
    "personal.gender_male": "ผู้ชาย",
    "personal.gender_nonbinary": "ไม่จำกัดเพศ",
    "personal.gender_other": "ไม่ขอระบุ",
    "personal.zodiac": "ราศีของคุณ",
    "personal.relationship": "สถานะความสัมพันธ์",
    "personal.rel_select": "เลือกสถานะปัจจุบัน",
    "personal.rel_single": "โสด",
    "personal.rel_in_relationship": "มีแฟนแล้ว",
    "personal.rel_married": "แต่งงานแล้ว",
    "personal.rel_complicated": "ซับซ้อนหน่อย",
    "personal.rel_separated": "เลิกกัน / หย่าร้าง",
    "personal.occupation": "อาชีพ / สถานการณ์ตอนนี้",
    "personal.occ_placeholder": "เช่น นักศึกษา, มนุษย์เงินเดือน, ฟรีแลนซ์...",
    "personal.concern": "ตอนนี้กังวลเรื่องอะไรมากที่สุด?",
    "personal.concern_select": "เลือกเรื่องที่ค้างคาใจ",
    "personal.concern_love": "ความรัก & ความสัมพันธ์",
    "personal.concern_career": "การงาน & การเงิน",
    "personal.concern_health": "สุขภาพ & ความเป็นอยู่",
    "personal.concern_family": "ครอบครัว & บ้าน",
    "personal.concern_spiritual": "การเติบโตภายใน",
    "personal.concern_decision": "ตัดสินใจเรื่องสำคัญ",
    "personal.question": "คำถามที่อยากถามออราเคิล",
    "personal.question_placeholder": "ถามได้เลยทุกอย่างที่ค้างคาใจ...",
    "personal.question_tip": "ยิ่งถามชัดเจนเท่าไหร่ คำตอบยิ่งลึกและตรงจุด เช่น \"ความสัมพันธ์จะดีขึ้นไหมปีนี้?\" หรือ \"ควรเปลี่ยนงานดีไหม?\"",
    "personal.submit": "เปิดดูดวงชะตา",
    "personal.revealing": "ออราเคิลกำลังรับพลังจากดวงดาว...",
    "personal.revealing_sub": "กำลังอ่านดาว คำนวณตัวเลขชีวิต และสำรวจข้างขึ้นข้างแรม...",
    "personal.result_title": "ดวงชะตาของคุณถูกเปิดเผยแล้ว",
    "personal.result_subtitle": "จักรวาลส่งสารผ่านสัญลักษณ์โบราณและแนวดาว",
    "personal.cosmic": "แนวดาวจักรวาล",
    "personal.lunar": "อิทธิพลดวงจันทร์",
    "personal.time_energy": "พลังงานแห่งช่วงเวลา",
    "personal.seasonal": "พลังฤดูกาล",
    "personal.numerology": "ตัวเลขศาสตร์",
    "personal.answer": "คำตอบสำหรับคำถามของคุณ",
    "personal.advice": "คำแนะนำเฉพาะตัวสำหรับคุณ",
    "personal.overall": "พลังงานโดยรวม",
    "personal.warning": "สิ่งที่ควรระวัง",
    "personal.lucky_numbers": "เลขมงคล",
    "personal.lucky_day": "วันมงคล",
    "personal.lucky_color": "สีมงคล",
    "personal.ask_again": "ถามใหม่อีกครั้ง",

    // General Reading
    "general.title": "ดูดวงทั่วไป",
    "general.subtitle": "เลือกราศี หมวดชีวิต และช่วงเวลาที่อยากรู้ ดวงดาวจะคำนวณทุกอย่างตั้งแต่ธาตุ ข้างขึ้นข้างแรม พลังฤดูกาล จนถึงตำแหน่งดาวเคราะห์เพื่อเปิดดวงให้คุณ",
    "general.step1": "เลือกราศีของคุณ",
    "general.step2": "อยากรู้เรื่องอะไร?",
    "general.step2_for": "ดูดวงให้",
    "general.step3": "เลือกช่วงเวลา",
    "general.love": "ความรัก",
    "general.love_desc": "เรื่องหัวใจ ความสัมพันธ์ และสายใยอารมณ์",
    "general.wealth": "การเงิน",
    "general.wealth_desc": "เงินทอง การงาน และความมั่งคั่ง",
    "general.health": "สุขภาพ",
    "general.health_desc": "สุขภาพกาย พลังชีวิต และความสดชื่น",
    "general.daily": "รายวัน",
    "general.daily_desc": "วันนี้",
    "general.weekly": "รายสัปดาห์",
    "general.weekly_desc": "สัปดาห์นี้",
    "general.monthly": "รายเดือน",
    "general.monthly_desc": "เดือนนี้",
    "general.yearly": "รายปี",
    "general.yearly_desc": "ปีนี้",
    "general.reveal": "เปิดดูดวงชะตา",
    "general.revealing": "กำลังปรึกษาแผนจักรวาล...",
    "general.revealing_sub": "จัดตำแหน่งดาว อ่านธาตุ คำนวณพลังจักรวาล...",
    "general.overview": "ภาพรวม",
    "general.details": "รายละเอียดดาวเคราะห์",
    "general.advice": "คำแนะนำจากออราเคิล",
    "general.caution": "ข้อควรระวัง",
    "general.lucky_numbers": "เลขมงคล",
    "general.best_day": "วันที่ดีที่สุด",
    "general.cosmic_rating": "คะแนนจากดวงดาว",
    "general.cosmic_fav": "ความเป็นมงคลจากจักรวาล",
    "general.affirmation": "คำยืนยันพลังใจ",
    "general.new_reading": "ดูดวงใหม่",
    "general.back_zodiac": "กลับไปเลือกราศี",
    "general.back_category": "กลับไปเลือกหัวข้อ",

    // Footer
    "footer.how_title": "ออราเคิลทำงานยังไง?",
    "footer.celestial_title": "แนวดาวจักรวาล",
    "footer.celestial_desc": "ราศี ดาวปกครอง ธาตุ และคุณลักษณะของคุณจะถูกนำมารวมกับตำแหน่งดาวเคราะห์ในปัจจุบันเพื่อวาดแผนที่พลังงานจักรวาลของคุณ",
    "footer.temporal_title": "พลังแห่งเวลา",
    "footer.temporal_desc": "ข้างขึ้นข้างแรม ช่วงเวลาของวัน และพลังฤดูกาลถูกคำนวณแบบเรียลไทม์ เหมือนหมอดูที่อ่านดวงตามจังหวะที่คุณเดินเข้ามาพอดี",
    "footer.numerology_title": "ตัวเลขศาสตร์ส่วนตัว",
    "footer.numerology_desc": "เลขชื่อและเลขเส้นทางชีวิตของคุณถูกคำนวณด้วยวิธีพีทาโกรัส เพื่อเพิ่มมิติส่วนตัวที่ลึกซึ้งให้กับการดูดวง",
    "footer.disclaimer": "Celestial Oracle — เพื่อความสนุกและการใคร่ครวญตนเอง",
    "footer.tagline": "ดาวส่องทาง แต่เท้าของคุณต้องก้าวเอง",

    // Footer - Personal
    "footer.personal_title1": "ข้อมูลโหราศาสตร์",
    "footer.personal_desc1": "วันเกิดและราศีที่คุณเลือกจะช่วยกำหนดลายเซ็นพลังงานที่เป็นเอกลักษณ์ของคุณ",
    "footer.personal_title2": "จังหวะแห่งจักรวาล",
    "footer.personal_desc2": "เราคำนวณข้างขึ้นข้างแรมและการโคจรของดาวเพื่อทำความเข้าใจพลังงานรอบข้างคำถามของคุณ",
    "footer.personal_title3": "เสียงสะท้อนตัวเลข",
    "footer.personal_desc3": "พลังสั่นสะเทือนจากชื่อและอายุของคุณถูกวิเคราะห์ด้วยตัวเลขศาสตร์พีทาโกรัสเพื่อเจาะลึกคำทำนาย",

    // Footer - General
    "footer.general_title1": "แผนราศีของคุณ",
    "footer.general_desc1": "ลักษณะพื้นฐาน ดาวปกครอง และธาตุประจำราศีที่คุณเลือกคือรากฐานของคำพยากรณ์ทั้งหมด",
    "footer.general_title2": "การโฟกัสช่วงชีวิต",
    "footer.general_desc2": "หมวดที่คุณเลือกจะชี้เลนส์จักรวาลไปยังบ้านโหราศาสตร์ที่ดูแลเรื่องความรัก การเงิน หรือสุขภาพโดยตรง",
    "footer.general_title3": "การพยากรณ์ข้างหน้า",
    "footer.general_desc3": "การเคลื่อนที่ของดาวจะถูกฉายไปยังช่วงเวลาที่คุณเลือก เพื่อเผยแนวโน้มและโอกาสที่กำลังจะมาถึง",

    // Footer - Tarot
    "footer.tarot_title1": "การเดินทางของ The Fool",
    "footer.tarot_desc1": "สำรับไพ่ Rider-Waite-Smith มีต้นแบบ 78 ใบที่สะท้อนทุกแง่มุมของประสบการณ์มนุษย์และการเติบโตของจิตวิญญาณ",
    "footer.tarot_title2": "การวางไพ่",
    "footer.tarot_desc2": "การเรียงไพ่ 3 ใบแบบดั้งเดิมจะเชื่อมพลังงานอดีต ความจริงของปัจจุบัน และความเป็นไปได้ของอนาคตเข้าด้วยกัน",
    "footer.tarot_title3": "ปัญญาของออราเคิล",
    "footer.tarot_desc3": "ออราเคิลจะผสานความหมายดั้งเดิมและสัญลักษณ์ในไพ่ที่จั่วได้ออกมาเป็นเรื่องราวที่เชื่อมโยงกับชีวิตของคุณโดยตรง",


    // Tarot
    "tarot.title": "ไพ่ทาโรต์สามใบ",
    "tarot.subtitle": "จั่วไพ่สามใบจากสำรับไรเดอร์-เวท แล้วรับคำทำนายอดีต ปัจจุบัน และอนาคตที่ขับเคลื่อนด้วยปัญญาไพ่ทาโรต์ดั้งเดิม",
    "tarot.begin_title": "เริ่มเซสชันไพ่ทาโรต์",
    "tarot.begin_desc": "ทำใจให้นิ่ง หายใจลึกๆ แล้วตั้งคำถามในใจ พอพร้อมแล้วไพ่จะถูกสับและวางให้คุณหยิบเลือก",
    "tarot.question_label": "คำถามของคุณ (ถ้ามี)",
    "tarot.question_placeholder": "มีอะไรค้างคาใจไหม? หรือปล่อยว่างไว้เพื่อรับคำทำนายทั่วไป...",
    "tarot.optional": "ไม่บังคับ",
    "tarot.begin_btn": "สับไพ่เลย",
    "tarot.shuffling": "พลังจักรวาลกำลังสับไพ่ให้คุณ...",
    "tarot.pick_prompt": "หยิบไพ่ของคุณ:",
    "tarot.pick_sub": "เอาเมาส์ไปวางเพื่อสัมผัสพลังงาน กดเพื่อเลือก เลือก 3 ใบ",
    "tarot.arranging": "ชะตาฟ้าดินกำลังจัดเรียงไพ่ให้คุณ...",
    "tarot.revealing": "ดวงชะตากำลังถูกเปิดเผย...",
    "tarot.interpreting": "ออราเคิลกำลังอ่านแนวดาวจักรวาล...",
    "tarot.try_again": "ลองใหม่",
    "tarot.past": "อดีต",
    "tarot.present": "ปัจจุบัน",
    "tarot.future": "อนาคต",
    "tarot.the_reading": "ผลการทำนายไพ่ทาโรต์ของคุณ",
    "tarot.your_question": "คำถามของคุณ",
    "tarot.oracle_advice": "คำแนะนำจากออราเคิล",
    "tarot.affirmation": "คำยืนยันพลังใจ",
    "tarot.card_meanings": "ความหมายของไพ่",
    "tarot.new_reading": "จั่วไพ่ใหม่",
    "tarot.your_spread": "ไพ่ที่คุณเลือก",
    "tarot.reveal_reading": "เปิดคำทำนาย",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const t = useCallback(
    (key: string) => {
      return translations[lang][key] || translations.en[key] || key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
