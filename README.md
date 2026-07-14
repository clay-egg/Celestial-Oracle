# 🔮 Celestial Oracle

> **Real-time AI-driven cosmic insights with brutal honesty.**

Celestial Oracle is a next-generation spiritual engine that combines ancient astrological wisdom with modern Large Language Models to provide deeply personalized and accurate fortune readings. Unlike traditional horoscopes, it calculates alignments in real-time based on your specific life context, questions, and the current state of the stars.

---

## ✨ Features in Detail

### 1. 🔮 Three-Card Tarot Reading
Experience an immersive, authentic tarot session using the classic 78-card Rider-Waite-Smith (1909) deck.
- **Interactive Deck**: Watch the cards shuffle in real-time and spread into a beautiful, interactive fan.
- **User Selection**: Hover and sense the energy of the cards, then hand-pick your 3 cards for the reading.
- **Dynamic Reveal**: Cards are arranged into a Past, Present, and Future spread and revealed with smooth 3D flip animations.
- **The Oracle's Wisdom**: The Oracle synthesizes the traditional visual symbolism of the drawn cards alongside your personal question to deliver a unified, personalized narrative.

### 2. 🎯 Personal Readings
Ask specific questions about your life, love, career, or destiny and receive decisive, uncompromising answers.
- **Deep Personalization**: Inputs include your name, age, zodiac, relationship status, occupation, and a specific question.
- **Cosmic Synthesis**: The Oracle calculates your path using Pythagorean numerology, current lunar phases, seasonal wisdom, and cosmic alignment.
- **Actionable Insights**: You receive a realistic analysis, a 0-100 Cosmic Favorability score, and personalized lucky elements (numbers, days, colors).

### 3. 📅 General Horoscopes
Detailed forecasts tailored to your Zodiac sign across different life sectors.
- **Targeted Sectors**: Choose between Love (relationships/emotions), Wealth (career/finances), or Health (vitality/well-being).
- **Flexible Timeframes**: Cast the planetary movements over Daily, Weekly, Monthly, or Yearly periods.
- **Radar Analysis**: Visualizes your astrological potential via a dynamic radar chart mapping axes like Opportunity, Challenge, Emotional Depth, and Physical Vitality.

### 4. 🇹🇭 Bilingual Support
- **Native Dual Language**: Fully localized interface and AI-generated responses in both English and Thai.

### 5. 🌌 Premium Mystical UI/UX
- **Visuals**: A deep, space-themed aesthetic featuring glowing gradients, glassmorphism, and animated starfields.
- **Animations**: Powered by Framer Motion for buttery-smooth transitions, staggered reveals, and realistic card interactions.
- **Responsive**: Flawless experience across desktop, tablet, and mobile devices.

---

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **AI Engine**: [Groq SDK](https://groq.com/) & [Google Generative AI](https://aistudio.google.com/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State & Context**: React Context (Language/Theme)

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18+ 
- npm or pnpm

### 2. Installation
```bash
git clone <https://github.com/clay-egg/Celestial-Oracle>
cd "Celestial Oracle"
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key_here
# Optional: GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to start your cosmic journey.

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Pages & API)
│   ├── api/              # AI endpoints (fortune, tarot)
│   ├── general/          # General Horoscope pages
│   ├── personal/         # Personal Reading pages
│   └── tarot/            # Three-Card Tarot Reading page
├── components/           # React Components (UI & Logic)
│   ├── tarot/            # Complex Tarot session components & state machine
│   ├── ui/               # Primary UI components (Radix/Shadcn)
│   └── ...               # Custom mystical components (Header, Footer, Starfield)
├── lib/                  # Core Utilities & AI Logic
│   ├── fortune-engine.ts # LLM Prompts and JSON schema validation for horoscopes
│   ├── tarot-data.ts     # Metadata for all 78 Rider-Waite-Smith tarot cards
│   ├── language-context.tsx # Global i18n translation context
│   └── utils.ts          # Tailwind merge & helpers
└── public/               # Static assets
    └── tarot/cards/      # High-res, public domain RWS Tarot card images
```

---

## ⚖️ Ethics & Philosophy
The Celestial Oracle is designed to be a tool for reflection and entertainment. We believe in "Decisive Divination"—providing clear paths rather than vague possibilities. Our AI is tuned to prioritize realism over comfort, helping users face the truth of their current path.

---

