"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OracleLogo } from "./oracle-logo";
import { useLanguage } from "@/lib/language-context";

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleLang = () => setLang(lang === "en" ? "th" : "en");

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/tarot", label: t("nav.tarot") },
    { href: "/personal", label: t("nav.personal") },
    { href: "/general", label: t("nav.general") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          prefetch={true}
          className="flex items-center gap-2.5 text-primary hover:text-primary/80 transition-colors"
        >
          <OracleLogo size={32} />
          <span className="font-sans text-sm tracking-widest uppercase hidden sm:inline">
            {t("nav.brand")}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              className={`font-serif text-sm transition-colors ${
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all text-xs font-sans uppercase tracking-wider"
            aria-label={lang === "en" ? "Switch to Thai" : "Switch to English"}
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "TH" : "EN"}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-border text-muted-foreground hover:text-primary transition-all text-xs font-sans"
            aria-label={lang === "en" ? "Switch to Thai" : "Switch to English"}
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "TH" : "EN"}
          </button>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-foreground"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {isMobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="flex flex-col px-4 py-4 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className={`font-serif text-left py-3 px-3 rounded-lg transition-colors ${
                  pathname === link.href
                    ? "text-primary bg-primary/5"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
