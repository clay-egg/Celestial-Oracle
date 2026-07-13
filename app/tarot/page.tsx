import type { Metadata } from "next";
import { TarotSession } from "@/components/tarot/tarot-session";

export const metadata: Metadata = {
  title: "Three-Card Tarot Reading — Celestial Oracle",
  description:
    "Draw three cards from the Rider–Waite–Smith tarot deck. Receive a mystical Past, Present, and Future reading with AI-powered interpretation.",
  openGraph: {
    title: "Three-Card Tarot Reading — Celestial Oracle",
    description:
      "Draw three cards from the Rider–Waite–Smith tarot deck. Receive a mystical Past, Present, and Future reading with AI-powered interpretation.",
  },
};

export default function TarotPage() {
  return <TarotSession />;
}
