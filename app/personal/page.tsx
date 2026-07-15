import type { Metadata } from "next";
import { PersonalReadingSection } from "@/components/personal-reading";

export const metadata: Metadata = {
  title: "Personal Oracle Reading — Your Unique Cosmic Fortune",
  description:
    "Share your name, birth date, and question to receive a deeply personal fortune reading. The Oracle channels your zodiac sign, numerology, lunar phase, and cosmic timing to answer what matters most.",
  alternates: {
    canonical: "https://celestial-oracle-three.vercel.app/personal",
  },
  openGraph: {
    title: "Personal Oracle Reading — Your Unique Cosmic Fortune",
    description:
      "Share your name, birth date, and question to receive a deeply personal fortune reading powered by astrology and numerology.",
    url: "https://celestial-oracle-three.vercel.app/personal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Oracle Reading — Your Unique Cosmic Fortune",
    description:
      "Share your name, birth date, and question to receive a deeply personal fortune reading powered by astrology and numerology.",
  },
};

export default function PersonalPage() {
  return (
    <div className="pt-20">
      <PersonalReadingSection />
    </div>
  );
}
