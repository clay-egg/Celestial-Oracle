"use client";

import { Moon, Sun, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative py-20 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-sans gold-text tracking-wider mb-8">
            {t("footer.how_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-secondary/30 border border-border/50">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Sun className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-sans text-sm text-primary uppercase tracking-widest">
                {t("footer.celestial_title")}
              </h3>
              <p className="font-serif text-sm text-muted-foreground leading-relaxed text-center">
                {t("footer.celestial_desc")}
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-secondary/30 border border-border/50">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Moon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-sans text-sm text-primary uppercase tracking-widest">
                {t("footer.temporal_title")}
              </h3>
              <p className="font-serif text-sm text-muted-foreground leading-relaxed text-center">
                {t("footer.temporal_desc")}
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-secondary/30 border border-border/50">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-sans text-sm text-primary uppercase tracking-widest">
                {t("footer.numerology_title")}
              </h3>
              <p className="font-serif text-sm text-muted-foreground leading-relaxed text-center">
                {t("footer.numerology_desc")}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border" />
          <Sparkles className="w-4 h-4 text-primary/50" />
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Bottom */}
        <div className="text-center">
          <p className="font-serif text-sm text-muted-foreground mb-2">
            {t("footer.disclaimer")}
          </p>
          <p className="font-serif text-xs text-muted-foreground/60">
            {t("footer.tagline")}
          </p>
        </div>
      </div>
    </footer>
  );
}
