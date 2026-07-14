"use client";

import Link from "next/link";
import { OracleLogo } from "./oracle-logo";
import { ZodiacIcon } from "./zodiac-icon";
import { useLanguage } from "@/lib/language-context";

const ORBITING_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Orbiting zodiac ring */}
      <div
        className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full border border-primary/10 hidden sm:block"
        aria-hidden="true"
      >
        {ORBITING_SIGNS.map((sign, i) => {
          const angle = (i / 12) * 360;
          return (
            <div
              key={sign}
              className="absolute animate-twinkle"
              style={{
                top: "50%",
                left: "50%",
                // On mobile (sm), ring is 280px (radius 140px). On md it's 400px (radius 200px).
                // We use css clamp or just a safe fixed translate based on a CSS custom property if we could, 
                // but since it's inline, we'll use a CSS clamp that approximates it: clamp(140px, 30vw, 200px)
                transform: `rotate(${angle}deg) translateX(clamp(140px, 35vw, 200px)) rotate(-${angle}deg) translate(-50%, -50%)`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <ZodiacIcon sign={sign} size={22} className="text-primary/30" />
            </div>
          );
        })}
      </div>

      {/* Center orb */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center animate-glow-pulse mb-8">
          <OracleLogo size={72} className="text-primary animate-float" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-sans gold-text tracking-wider mb-4 leading-tight text-balance px-2">
          {t("hero.title")}
        </h1>

        <p className="font-serif text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed mb-2 px-4">
          {t("hero.subtitle")}
        </p>
        <p className="font-serif text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-10 px-4">
          {t("hero.desc")}
        </p>

        {/* CTA Buttons - Link to separate pages */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6">
          <Link
            href="/personal"
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all text-center"
          >
            {t("hero.personal_btn")}
          </Link>
          <Link
            href="/general"
            className="px-8 py-4 rounded-full border border-primary text-primary font-sans text-sm uppercase tracking-widest hover:bg-primary/10 transition-all text-center"
          >
            {t("hero.general_btn")}
          </Link>
          <Link
            href="/tarot"
            className="px-8 py-4 rounded-full border border-primary/60 text-muted-foreground font-sans text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-all text-center"
          >
            {t("hero.tarot_btn")}
          </Link>
        </div>
      </div>
    </section>
  );
}
