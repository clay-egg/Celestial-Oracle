"use client";

import { Moon, Sun, Sparkles, BookOpen, Clock, Fingerprint, Compass, Star, Infinity } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { usePathname } from "next/navigation";

export function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();

  let content = [
    {
      icon: <Sun className="w-7 h-7 text-primary" />,
      title: t("footer.celestial_title"),
      desc: t("footer.celestial_desc"),
    },
    {
      icon: <Moon className="w-7 h-7 text-primary" />,
      title: t("footer.temporal_title"),
      desc: t("footer.temporal_desc"),
    },
    {
      icon: <Sparkles className="w-7 h-7 text-primary" />,
      title: t("footer.numerology_title"),
      desc: t("footer.numerology_desc"),
    },
  ];

  if (pathname === "/personal") {
    content = [
      {
        icon: <Fingerprint className="w-7 h-7 text-primary" />,
        title: t("footer.personal_title1"),
        desc: t("footer.personal_desc1"),
      },
      {
        icon: <Clock className="w-7 h-7 text-primary" />,
        title: t("footer.personal_title2"),
        desc: t("footer.personal_desc2"),
      },
      {
        icon: <Infinity className="w-7 h-7 text-primary" />,
        title: t("footer.personal_title3"),
        desc: t("footer.personal_desc3"),
      },
    ];
  } else if (pathname === "/general") {
    content = [
      {
        icon: <Compass className="w-7 h-7 text-primary" />,
        title: t("footer.general_title1"),
        desc: t("footer.general_desc1"),
      },
      {
        icon: <Star className="w-7 h-7 text-primary" />,
        title: t("footer.general_title2"),
        desc: t("footer.general_desc2"),
      },
      {
        icon: <Clock className="w-7 h-7 text-primary" />,
        title: t("footer.general_title3"),
        desc: t("footer.general_desc3"),
      },
    ];
  } else if (pathname === "/tarot") {
    content = [
      {
        icon: <BookOpen className="w-7 h-7 text-primary" />,
        title: t("footer.tarot_title1"),
        desc: t("footer.tarot_desc1"),
      },
      {
        icon: <Sparkles className="w-7 h-7 text-primary" />,
        title: t("footer.tarot_title2"),
        desc: t("footer.tarot_desc2"),
      },
      {
        icon: <Moon className="w-7 h-7 text-primary" />,
        title: t("footer.tarot_title3"),
        desc: t("footer.tarot_desc3"),
      },
    ];
  }

  return (
    <footer className="relative py-20 px-4 border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-sans gold-text tracking-wider mb-8">
            {t("footer.how_title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4 p-6 rounded-xl bg-secondary/30 border border-border/50">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-sans text-sm text-primary uppercase tracking-widest text-center">
                  {item.title}
                </h3>
                <p className="font-serif text-base text-muted-foreground leading-relaxed text-center">
                  {item.desc}
                </p>
              </div>
            ))}
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
