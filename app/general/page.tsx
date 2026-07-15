import type { Metadata } from "next";
import { GeneralReadingSection } from "@/components/general-reading";

export const metadata: Metadata = {
  title: "General Horoscope — Daily, Weekly & Monthly Zodiac Readings",
  description:
    "Pick your zodiac sign and explore love, wealth, or health horoscopes for today, this week, this month, or this year. Powered by real-time planetary positions and lunar phase calculations.",
  alternates: {
    canonical: "https://celestial-oracle-three.vercel.app/general",
  },
  openGraph: {
    title: "General Horoscope — Daily, Weekly & Monthly Zodiac Readings",
    description:
      "Pick your zodiac sign and explore love, wealth, or health horoscopes for today, this week, this month, or this year.",
    url: "https://celestial-oracle-three.vercel.app/general",
  },
  twitter: {
    card: "summary_large_image",
    title: "General Horoscope — Daily, Weekly & Monthly Zodiac Readings",
    description:
      "Pick your zodiac sign and explore love, wealth, or health horoscopes for today, this week, this month, or this year.",
  },
};

export default function GeneralPage() {
  return (
    <div className="pt-20">
      <GeneralReadingSection />
    </div>
  );
}
