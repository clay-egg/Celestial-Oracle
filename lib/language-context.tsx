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

    // Hero
    "hero.title": "Celestial Oracle",
    "hero.subtitle": "Unveil the Mysteries of Your Destiny",
    "hero.desc": "Ancient wisdom meets celestial calculation. Your zodiac sign, numerology, lunar phase, and cosmic timing converge to reveal what the universe holds for you.",
    "hero.personal_btn": "Personal Reading",
    "hero.general_btn": "General Horoscope",

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
  },
  th: {
    // Nav
    "nav.brand": "Celestial Oracle",
    "nav.personal": "ดูดวงส่วนตัว",
    "nav.general": "ดูดวงทั่วไป",
    "nav.home": "หน้าแรก",

    // Hero
    "hero.title": "Celestial Oracle",
    "hero.subtitle": "เปิดเผยความลับแห่งชะตาชีวิตของคุณ",
    "hero.desc": "ภูมิปัญญาโบราณผสานกับการคำนวณจักรราศี ราศีของคุณ ตัวเลขศาสตร์ ข้างขึ้นข้างแรม และจังหวะจักรวาลรวมกันเพื่อเปิดเผยสิ่งที่จักรวาลมีไว้ให้คุณ",
    "hero.personal_btn": "ดูดวงส่วนตัว",
    "hero.general_btn": "ดูดวงทั่วไป",

    // Personal Reading
    "personal.title": "ดูดวงส่วนตัว",
    "personal.subtitle": "แบ่งปันข้อมูลของคุณและถามคำถามที่คุณอยากรู้ ออราเคิลจะส่งต่อปัญญาจักรราศีผ่านราศีของคุณ ตัวเลขศาสตร์จากวันเกิด ข้างขึ้นข้างแรม และพลังจักรวาลในขณะนี้",
    "personal.name": "ชื่อของคุณ",
    "personal.name_placeholder": "กรอกชื่อเต็มของคุณ",
    "personal.age": "อายุ",
    "personal.age_placeholder": "กรอกอายุ",
    "personal.birth_date": "วันเกิด",
    "personal.gender": "เพศ",
    "personal.gender_select": "เลือก (ไม่จำเป็น)",
    "personal.gender_female": "หญิง",
    "personal.gender_male": "ชาย",
    "personal.gender_nonbinary": "ไม่ระบุเพศ",
    "personal.gender_other": "ไม่ต้องการระบุ",
    "personal.zodiac": "ราศีของคุณ",
    "personal.relationship": "สถานะความสัมพันธ์",
    "personal.rel_select": "เลือกสถานะ",
    "personal.rel_single": "โสด",
    "personal.rel_in_relationship": "มีแฟน",
    "personal.rel_married": "แต่งงานแล้ว",
    "personal.rel_complicated": "ซับซ้อน",
    "personal.rel_separated": "แยกทาง / หย่าร้าง",
    "personal.occupation": "อาชีพ / สถานะชีวิต",
    "personal.occ_placeholder": "เช่น นักศึกษา, พนักงานออฟฟิศ, ฟรีแลนซ์...",
    "personal.concern": "คุณกังวลเรื่องอะไรมากที่สุด?",
    "personal.concern_select": "เลือกความกังวลหลัก",
    "personal.concern_love": "ความรัก & ความสัมพันธ์",
    "personal.concern_career": "อาชีพ & การเงิน",
    "personal.concern_health": "สุขภาพ & ความเป็นอยู่",
    "personal.concern_family": "ครอบครัว & บ้าน",
    "personal.concern_spiritual": "การเติบโตทางจิตวิญญาณ",
    "personal.concern_decision": "การตัดสินใจครั้งสำคัญ",
    "personal.question": "คำถามของคุณสำหรับออราเคิล",
    "personal.question_placeholder": "ถามอะไรก็ได้ที่หนักอกหนักใจ...",
    "personal.question_tip": "ยิ่งถามเฉพาะเจาะจง ยิ่งได้คำตอบลึกซึ้ง เช่น \"ความสัมพันธ์จะดีขึ้นไหมปีนี้?\" หรือ \"ควรเปลี่ยนสายอาชีพดีไหม?\"",
    "personal.submit": "เปิดเผยดวงชะตา",
    "personal.revealing": "ออราเคิลกำลังรับพลังจักรวาล...",
    "personal.revealing_sub": "อ่านดวงดาว คำนวณตัวเลข ปรึกษาข้างขึ้นข้างแรม...",
    "personal.result_title": "ดวงชะตาของคุณถูกเปิดเผยแล้ว",
    "personal.result_subtitle": "จักรวาลพูดผ่านสัญลักษณ์โบราณและการเรียงตัวของดวงดาว",
    "personal.cosmic": "การเรียงตัวของจักรวาล",
    "personal.lunar": "อิทธิพลของดวงจันทร์",
    "personal.time_energy": "พลังงานช่วงเวลา",
    "personal.seasonal": "ปัญญาฤดูกาล",
    "personal.numerology": "ตัวเลขศาสตร์",
    "personal.answer": "คำตอบสำหรับคำถามของคุณ",
    "personal.advice": "คำแนะนำส่วนตัว",
    "personal.overall": "พลังงานโดยรวม",
    "personal.warning": "คำเตือนจากจักรวาล",
    "personal.lucky_numbers": "เลขนำโชค",
    "personal.lucky_day": "วันนำโชค",
    "personal.lucky_color": "สีนำโชค",
    "personal.ask_again": "ถามออราเคิลอีกครั้ง",

    // General Reading
    "general.title": "ดูดวงทั่วไป",
    "general.subtitle": "เลือกราศีของคุณ หมวดชีวิต และช่วงเวลา ดวงดาวจะคำนวณการเรียงตัวของธาตุ ข้างขึ้นข้างแรม พลังฤดูกาล และตำแหน่งดาวเคราะห์เพื่อให้พยากรณ์จักรวาลของคุณ",
    "general.step1": "เลือกราศีของคุณ",
    "general.step2": "ด้านใดของชีวิต?",
    "general.step2_for": "ดูดวงให้",
    "general.step3": "เลือกช่วงเวลา",
    "general.love": "ความรัก",
    "general.love_desc": "ความรัก ความสัมพันธ์ และสายใยทางอารมณ์",
    "general.wealth": "การเงิน",
    "general.wealth_desc": "การเงิน อาชีพ และความมั่งคั่ง",
    "general.health": "สุขภาพ",
    "general.health_desc": "สุขภาพกาย พลังชีวิต และความกระปรี้กระเปร่า",
    "general.daily": "รายวัน",
    "general.daily_desc": "วันนี้",
    "general.weekly": "รายสัปดาห์",
    "general.weekly_desc": "สัปดาห์นี้",
    "general.monthly": "รายเดือน",
    "general.monthly_desc": "เดือนนี้",
    "general.yearly": "รายปี",
    "general.yearly_desc": "ปีนี้",
    "general.reveal": "เปิดเผยดวงชะตา",
    "general.revealing": "กำลังปรึกษาแผนภูมิจักรวาล...",
    "general.revealing_sub": "เรียงตัวดาวเคราะห์ อ่านธาตุ คำนวณอิทธิพลจักรวาล...",
    "general.overview": "ภาพรวม",
    "general.details": "รายละเอียดจักรวาล",
    "general.advice": "คำแนะนำจากออราเคิล",
    "general.caution": "ข้อควรระวัง",
    "general.lucky_numbers": "เลขนำโชค",
    "general.best_day": "วันที่ดีที่สุด",
    "general.cosmic_rating": "คะแนนจักรวาล",
    "general.cosmic_fav": "ความเป็นมงคลจักรวาล",
    "general.affirmation": "คำยืนยันของคุณ",
    "general.new_reading": "ดูดวงใหม่",
    "general.back_zodiac": "กลับไปเลือกราศี",
    "general.back_category": "กลับไปเลือกหมวด",

    // Footer
    "footer.how_title": "ออราเคิลทำงานอย่างไร",
    "footer.celestial_title": "การเรียงตัวจักรวาล",
    "footer.celestial_desc": "ราศี ดาวเคราะห์ปกครอง ธาตุ และคุณภาพของคุณถูกรวมกับตำแหน่งดาวเคราะห์ปัจจุบันเพื่อจัดทำแผนที่อิทธิพลจักรวาลของคุณ",
    "footer.temporal_title": "ปัจจัยด้านเวลา",
    "footer.temporal_desc": "ข้างขึ้นข้างแรม ช่วงเวลาของวัน และพลังฤดูกาลถูกคำนวณแบบเรียลไทม์ เหมือนกับที่หมอดูอ่านจังหวะตอนที่คุณเดินเข้ามา",
    "footer.numerology_title": "ตัวเลขศาสตร์ส่วนบุคคล",
    "footer.numerology_desc": "เลขชื่อและเลขเส้นทางชีวิตของคุณถูกคำนวณด้วยตัวเลขศาสตร์พีทาโกรัส เพิ่มชั้นที่เป็นเอกลักษณ์ส่วนตัวให้กับการดูดวงของคุณ",
    "footer.disclaimer": "Celestial Oracle - เพื่อความบันเทิงและการใคร่ครวญส่วนตัว",
    "footer.tagline": "ดวงดาวส่องทาง แต่คุณต้องเดินเอง",
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
