"use client";

import { useState } from "react";
import { ZODIAC_SIGNS, ZODIAC_DATA, generatePersonalReadingWithAI } from "@/lib/fortune-engine";
import type { ZodiacSign, PersonalReading } from "@/lib/fortune-engine";
import { ZodiacIcon } from "./zodiac-icon";
import { useLanguage } from "@/lib/language-context";
import { Star, Sparkles, Moon, Sun, Hash, Calendar, ShieldAlert, MessageCircle } from "lucide-react";

export function PersonalReadingSection() {
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    gender: "",
    birthPlace: "",
    occupation: "",
    concern: "",
    question: "",
  });
  const [reading, setReading] = useState<PersonalReading | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.question || !formData.birthDate) return;

    setIsRevealing(true);
    setShowResult(false);
    setError(null);

    try {
      // Enrich the question with context from concern, relationship, and occupation
      let enrichedQuestion = formData.question;
      if (formData.concern) enrichedQuestion += ` [concern: ${formData.concern}]`;
      if (formData.birthPlace) enrichedQuestion += ` [birth place: ${formData.birthPlace}]`;
      if (formData.occupation) enrichedQuestion += ` [occupation: ${formData.occupation}]`;

      const result = await generatePersonalReadingWithAI({
        name: formData.name,
        birthDate: formData.birthDate,
        gender: formData.gender,
        question: enrichedQuestion,
        birthPlace: formData.birthPlace,
        occupation: formData.occupation,
        concern: formData.concern,
      });
      setReading(result);
      setShowResult(true);
    } catch (err) {
      setError("The cosmos could not be reached. Please try again.");
      console.error(err);
    } finally {
      setIsRevealing(false);
    }
  };

  const resetForm = () => {
    setShowResult(false);
    setReading(null);
    setError(null);
  };

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-sans gold-text tracking-wider">
              {t("personal.title")}
            </h2>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("personal.subtitle")}
          </p>
        </div>

        {/* Reading Result */}
        {showResult && reading && (
          <div className="animate-fade-in-up mb-12">
            <div className="reading-result rounded-2xl p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center animate-glow-pulse">
                  <ZodiacIcon sign={reading.zodiacSign as string} size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-sans gold-text mb-2">{t("personal.result_title")}</h3>
                <p className="text-muted-foreground font-serif italic">
                  {"\""}{t("personal.result_subtitle")}{"\""}
                </p>
              </div>

              {/* Greeting */}
              <div className="mb-8 p-6 rounded-xl bg-secondary/50 border border-primary/10">
                <p className="font-serif text-lg text-foreground leading-relaxed italic">
                  {reading.greeting}
                </p>
              </div>

              {/* Reading Sections */}
              <div className="flex flex-col gap-6">
                <ReadingBlock
                  icon={<Sun className="w-5 h-5 text-primary" />}
                  title={t("personal.cosmic")}
                  content={reading.cosmicAlignment}
                />
                <ReadingBlock
                  icon={<Moon className="w-5 h-5 text-primary" />}
                  title={t("personal.lunar")}
                  content={reading.lunarInfluence}
                />
                <ReadingBlock
                  icon={<Sparkles className="w-5 h-5 text-primary" />}
                  title={t("personal.time_energy")}
                  content={reading.timeEnergy}
                />
                <ReadingBlock
                  icon={<Calendar className="w-5 h-5 text-primary" />}
                  title={t("personal.seasonal")}
                  content={reading.seasonalWisdom}
                />
                <ReadingBlock
                  icon={<Hash className="w-5 h-5 text-primary" />}
                  title={t("personal.numerology")}
                  content={reading.numerologyInsight}
                />

                <ReadingBlock
                  icon={<Star className="w-5 h-5 text-primary" />}
                  title={t("personal.advice")}
                  content={reading.personalAdvice}
                />
                <ReadingBlock
                  icon={<Star className="w-5 h-5 text-primary" />}
                  title={t("personal.overall")}
                  content={reading.overallEnergy}
                />
                <ReadingBlock
                  icon={<ShieldAlert className="w-5 h-5 text-primary" />}
                  title={t("personal.warning")}
                  content={reading.warnings}
                />
              </div>

              {/* Main answer */}
              <div className="mt-8 p-6 rounded-xl border-2 border-primary/30 bg-primary/5 shadow-[0_0_15px_rgba(201,168,76,0.15)]">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <h4 className="font-sans text-lg text-primary tracking-wide">
                    {t("personal.answer")}
                  </h4>
                </div>
                <p className="font-serif text-lg text-foreground leading-relaxed">
                  {reading.elementalReading}
                </p>
              </div>

              {/* Lucky Details */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-secondary/50 border border-primary/10 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{t("personal.lucky_numbers")}</p>
                  <p className="font-sans text-primary text-lg">{reading.luckyNumbers.join(" - ")}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 border border-primary/10 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{t("personal.lucky_day")}</p>
                  <p className="font-sans text-primary text-lg">{lang === "th" ? reading.luckyDayTh : reading.luckyDay}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 border border-primary/10 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{t("personal.lucky_color")}</p>
                  <p className="font-sans text-primary text-lg">{lang === "th" ? reading.luckyColorTh : reading.luckyColor}</p>
                </div>
              </div>

              {/* Closing */}
              <div className="mt-8 p-6 rounded-xl bg-secondary/50 border border-primary/10 text-center">
                <p className="font-serif text-foreground leading-relaxed italic">
                  {reading.closingMessage}
                </p>
              </div>

              {/* Ask Again */}
              <div className="mt-8 text-center">
                <button
                  onClick={resetForm}
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all"
                >
                  {t("personal.ask_again")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isRevealing && (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in-up">
            <p className="font-serif text-lg text-destructive text-center">{error}</p>
            <button
              onClick={resetForm}
              className="mt-4 px-6 py-2 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all"
            >
              {t("personal.ask_again")}
            </button>
          </div>
        )}

        {/* Revealing Animation */}
        {isRevealing && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-glow-pulse mb-6">
              <Sparkles className="w-10 h-10 text-primary animate-spin" />
            </div>
            <p className="font-serif text-xl text-muted-foreground animate-pulse">
              {t("personal.revealing")}
            </p>
            <p className="font-serif text-sm text-muted-foreground mt-2">
              {t("personal.revealing_sub")}
            </p>
          </div>
        )}

        {/* Input Form */}
        {!showResult && !isRevealing && !error && (
          <form onSubmit={handleSubmit} className="animate-fade-in-up">
            <div className="reading-result rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-sans text-sm text-muted-foreground uppercase tracking-widest">
                    {t("personal.name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder={t("personal.name_placeholder")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-serif placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                  />
                </div>

                {/* Birth Date */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="birthDate" className="font-sans text-sm text-muted-foreground uppercase tracking-widest">
                    {t("personal.birth_date")}
                  </label>
                  <input
                    id="birthDate"
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg bg-secondary border border-border font-serif focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none ${!formData.birthDate ? "text-muted-foreground/50" : "text-foreground"}`}
                  />
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="gender" className="font-sans text-sm text-muted-foreground uppercase tracking-widest">
                    {t("personal.gender")}
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg bg-secondary border border-border font-serif focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none ${!formData.gender ? "text-muted-foreground/50" : "text-foreground"}`}
                  >
                    <option value="">{t("personal.gender_select")}</option>
                    <option value="female">{t("personal.gender_female")}</option>
                    <option value="male">{t("personal.gender_male")}</option>
                    <option value="non-binary">{t("personal.gender_nonbinary")}</option>
                    <option value="other">{t("personal.gender_other")}</option>
                  </select>
                </div>

                {/* Birth Place */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="birthPlace" className="font-sans text-sm text-muted-foreground uppercase tracking-widest">
                    Birth Place
                  </label>
                  <input
                    id="birthPlace"
                    type="text"
                    placeholder="Enter your birth place"
                    value={formData.birthPlace}
                    onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-serif placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                  />
                </div>

                {/* Occupation */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="occupation" className="font-sans text-sm text-muted-foreground uppercase tracking-widest">
                    {t("personal.occupation")}
                  </label>
                  <input
                    id="occupation"
                    type="text"
                    placeholder={t("personal.occ_placeholder")}
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-serif placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                  />
                </div>

                {/* Main Concern */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="concern" className="font-sans text-sm text-muted-foreground uppercase tracking-widest">
                    {t("personal.concern")}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {[
                      { value: "love", label: t("personal.concern_love") },
                      { value: "career", label: t("personal.concern_career") },
                      { value: "health", label: t("personal.concern_health") },
                      { value: "family", label: t("personal.concern_family") },
                      { value: "spiritual", label: t("personal.concern_spiritual") },
                      { value: "decision", label: t("personal.concern_decision") },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, concern: item.value })}
                        className={`px-3 py-2.5 rounded-lg border text-sm font-serif transition-all text-center ${formData.concern === item.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                          }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Submit */}
              <div className="mt-8 text-center">
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="question" className="font-sans text-sm text-muted-foreground uppercase tracking-widest">
                    {t("personal.question")}
                  </label>
                  <textarea
                    id="question"
                    required
                    rows={3}
                    placeholder={t("personal.question_placeholder")}
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-serif placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none resize-none"
                  />
                  <p className="text-xs text-muted-foreground font-serif">
                    {t("personal.question_tip")}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!formData.name || !formData.question || !formData.birthDate}
                  className="px-10 py-4 mt-8 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed animate-glow-pulse"
                >
                  {t("personal.submit")}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function ReadingBlock({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <div className="p-5 rounded-xl bg-secondary/30 border border-border/50">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h4 className="font-sans text-sm text-primary uppercase tracking-widest">{title}</h4>
      </div>
      <p className="font-serif text-foreground leading-relaxed">{content}</p>
    </div>
  );
}
