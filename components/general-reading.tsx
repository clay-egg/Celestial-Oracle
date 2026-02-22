"use client";

import { useState } from "react";
import { ZODIAC_SIGNS, ZODIAC_DATA, generateGeneralReadingWithAI } from "@/lib/fortune-engine";
import type { ZodiacSign, Category, Period, GeneralReading } from "@/lib/fortune-engine";
import { ZodiacIcon } from "./zodiac-icon";
import { useLanguage } from "@/lib/language-context";
import { Heart, Coins, Activity, Star, Sparkles, ChevronRight, RotateCcw } from "lucide-react";

export function GeneralReadingSection() {
  const { t, lang } = useLanguage();

  const CATEGORIES: { id: Category; label: string; icon: React.ReactNode; description: string }[] = [
    { id: "love", label: t("general.love"), icon: <Heart className="w-6 h-6" />, description: t("general.love_desc") },
    { id: "wealth", label: t("general.wealth"), icon: <Coins className="w-6 h-6" />, description: t("general.wealth_desc") },
    { id: "health", label: t("general.health"), icon: <Activity className="w-6 h-6" />, description: t("general.health_desc") },
  ];

  const PERIODS: { id: Period; label: string; description: string }[] = [
    { id: "daily", label: t("general.daily"), description: t("general.daily_desc") },
    { id: "weekly", label: t("general.weekly"), description: t("general.weekly_desc") },
    { id: "monthly", label: t("general.monthly"), description: t("general.monthly_desc") },
    { id: "yearly", label: t("general.yearly"), description: t("general.yearly_desc") },
  ];

  const [selectedSign, setSelectedSign] = useState<ZodiacSign | "">("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
  const [selectedPeriod, setSelectedPeriod] = useState<Period | "">("");
  const [reading, setReading] = useState<GeneralReading | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedSign || !selectedCategory || !selectedPeriod) return;

    setIsRevealing(true);
    setShowResult(false);
    setError(null);

    try {
      const result = await generateGeneralReadingWithAI(selectedSign, selectedCategory, selectedPeriod);
      setReading(result);
      setShowResult(true);
    } catch (err) {
      setError("The stars could not be reached. Please try again.");
      console.error(err);
    } finally {
      setIsRevealing(false);
    }
  };

  const reset = () => {
    setShowResult(false);
    setReading(null);
    setStep(1);
    setSelectedSign("");
    setSelectedCategory("");
    setSelectedPeriod("");
    setError(null);
  };

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-sans gold-text tracking-wider">
              {t("general.title")}
            </h2>
            <Star className="w-6 h-6 text-primary" />
          </div>
          <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("general.subtitle")}
          </p>
        </div>

        {/* Result */}
        {showResult && reading && (
          <div className="animate-fade-in-up mb-12">
            <div className="reading-result rounded-2xl p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center animate-glow-pulse">
                  <ZodiacIcon sign={reading.zodiacSign} size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-sans gold-text mb-2">{reading.title}</h3>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < reading.rating ? "text-primary fill-primary" : "text-border"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground font-serif">
                    {reading.rating}/5 {t("general.cosmic_fav")}
                  </span>
                </div>
              </div>

              {/* Overview */}
              <div className="mb-6 p-6 rounded-xl bg-secondary/50 border border-primary/10">
                <h4 className="font-sans text-sm text-primary uppercase tracking-widest mb-3">{t("general.overview")}</h4>
                <p className="font-serif text-lg text-foreground leading-relaxed">{lang === "th" ? reading.overviewTh : reading.overview}</p>
              </div>

              {/* Details */}
              <div className="mb-6 p-5 rounded-xl bg-secondary/30 border border-border/50">
                <h4 className="font-sans text-sm text-primary uppercase tracking-widest mb-3">{t("general.details")}</h4>
                <p className="font-serif text-foreground leading-relaxed">{lang === "th" ? reading.detailsTh : reading.details}</p>
              </div>

              {/* Advice */}
              <div className="mb-6 p-5 rounded-xl border-2 border-primary/30 bg-primary/5">
                <h4 className="font-sans text-sm text-primary uppercase tracking-widest mb-3">{t("general.advice")}</h4>
                <p className="font-serif text-lg text-foreground leading-relaxed">{lang === "th" ? reading.adviceTh : reading.advice}</p>
              </div>

              {/* Caution */}
              <div className="mb-6 p-5 rounded-xl bg-secondary/30 border border-border/50">
                <h4 className="font-sans text-sm text-destructive uppercase tracking-widest mb-3">{t("general.caution")}</h4>
                <p className="font-serif text-foreground leading-relaxed">{lang === "th" ? reading.cautionTh : reading.caution}</p>
              </div>

              {/* Lucky Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-secondary/50 border border-primary/10 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{t("general.lucky_numbers")}</p>
                  <p className="font-sans text-primary text-lg">{reading.luckyNumbers.join(" - ")}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 border border-primary/10 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{t("general.best_day")}</p>
                  <p className="font-sans text-primary text-lg">{lang === "th" ? reading.bestDayTh : reading.bestDay}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 border border-primary/10 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{t("personal.lucky_color")}</p>
                  <p className="font-sans text-primary text-lg">{lang === "th" ? reading.luckyColorTh : reading.luckyColor}</p>
                </div>
              </div>

              {/* Affirmation */}
              <div className="p-6 rounded-xl bg-secondary/50 border border-primary/10 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">{t("general.affirmation")}</p>
                <p className="font-serif text-xl text-primary leading-relaxed italic">
                  {"\""}{lang === "th" ? reading.affirmationTh : reading.affirmation}{"\""}
                </p>
              </div>

              {/* Reset */}
              <div className="mt-8 text-center">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t("general.new_reading")}
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
              onClick={reset}
              className="mt-4 px-6 py-2 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all"
            >
              {t("general.new_reading")}
            </button>
          </div>
        )}

        {/* Loading */}
        {isRevealing && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-glow-pulse mb-6">
              <Sparkles className="w-10 h-10 text-primary animate-spin" />
            </div>
            <p className="font-serif text-xl text-muted-foreground animate-pulse">
              {t("general.revealing")}
            </p>
            <p className="font-serif text-sm text-muted-foreground mt-2">
              {t("general.revealing_sub")}
            </p>
          </div>
        )}

        {/* Step-by-step Selection */}
        {!showResult && !isRevealing && (
          <div className="reading-result rounded-2xl p-8 md:p-12 animate-fade-in-up">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-10">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-sans text-sm transition-all ${step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground border border-border"
                      }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`w-12 md:w-20 h-0.5 ${step > s ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Choose Zodiac */}
            {step === 1 && (
              <div className="animate-fade-in-up">
                <h3 className="text-center font-sans text-xl text-foreground mb-6 tracking-wide">
                  {t("general.step1")}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {ZODIAC_SIGNS.map((sign) => (
                    <button
                      key={sign}
                      type="button"
                      onClick={() => {
                        setSelectedSign(sign);
                        setStep(2);
                      }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all hover:scale-105 ${selectedSign === sign
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                    >
                      <ZodiacIcon sign={sign} size={32} />
                      <span className="text-xs font-sans">{sign}</span>
                      <span className="text-[10px] text-muted-foreground">{ZODIAC_DATA[sign].dateRange}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Choose Category */}
            {step === 2 && (
              <div className="animate-fade-in-up">
                <h3 className="text-center font-sans text-xl text-foreground mb-2 tracking-wide">
                  {t("general.step2")}
                </h3>
                <p className="text-center font-serif text-muted-foreground mb-8">
                  {t("general.step2_for")} {selectedSign}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setStep(3);
                      }}
                      className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-all hover:scale-105 ${selectedCategory === cat.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                    >
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${selectedCategory === cat.id ? "bg-primary/20" : "bg-secondary"
                        }`}>
                        {cat.icon}
                      </div>
                      <span className="font-sans text-lg">{cat.label}</span>
                      <span className="text-xs text-muted-foreground font-serif text-center">{cat.description}</span>
                    </button>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm text-muted-foreground hover:text-primary font-serif transition-colors"
                  >
                    {t("general.back_zodiac")}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Choose Period */}
            {step === 3 && (
              <div className="animate-fade-in-up">
                <h3 className="text-center font-sans text-xl text-foreground mb-2 tracking-wide">
                  {t("general.step3")}
                </h3>
                <p className="text-center font-serif text-muted-foreground mb-8">
                  {selectedSign} - {selectedCategory && CATEGORIES.find(c => c.id === selectedCategory)?.label}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {PERIODS.map((per) => (
                    <button
                      key={per.id}
                      type="button"
                      onClick={() => setSelectedPeriod(per.id)}
                      className={`flex flex-col items-center gap-2 p-5 rounded-xl border transition-all hover:scale-105 ${selectedPeriod === per.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                        }`}
                    >
                      <span className="font-sans text-lg">{per.label}</span>
                      <span className="text-xs text-muted-foreground font-serif">{per.description}</span>
                    </button>
                  ))}
                </div>

                {/* Generate Button */}
                <div className="text-center mt-8">
                  <button
                    onClick={handleGenerate}
                    disabled={!selectedPeriod}
                    className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed animate-glow-pulse"
                  >
                    {t("general.reveal")}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center mt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="text-sm text-muted-foreground hover:text-primary font-serif transition-colors"
                  >
                    {t("general.back_category")}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
