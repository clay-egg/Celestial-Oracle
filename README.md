# 🔮 Celestial Oracle

> **Real-time AI-driven cosmic insights with brutal honesty.**

Celestial Oracle is a next-generation spiritual engine that combines ancient astrological wisdom with modern Large Language Models to provide deeply personalized and accurate fortune readings. Unlike traditional horoscopes, it calculates alignments in real-time based on your specific life context, questions, and the current state of the stars.

---

## ✨ Features

- **🎯 Personal Readings**: Ask specific questions about love, career, or destiny and receive decisive, AI-calculated answers.
- **💀 Brutal Honesty**: No sugarcoating. The Oracle delivers realistic, sometimes stern, but always authentic insights based on cosmic alignment.
- **⚖️ Dynamic Cosmic Scoring**: A real-time 0-100 score calculated by AI factors in your birth data, name numerology, and current lunar phases.
- **📅 General Horoscopes**: Detailed Love, Wealth, and Health forecasts for all Zodiac signs across Daily, Weekly, and Monthly periods.
- **🇹🇭 Bilingual Support**: Native, natural Thai and English responses generated concurrently.
- **🌌 Interactive UI**: A premium, mystical aesthetic with glassmorphism, animated galactic fields, and responsive charts.

---

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **AI Engine**: [Groq SDK](https://groq.com/) & [Google Generative AI](https://aistudio.google.com/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
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
│   ├── api/fortune/      # AI Fortune generation endpoint
│   ├── general/          # General Horoscope pages
│   └── personal/         # Personal Reading pages
├── components/           # React Components (UI & Logic)
│   ├── ui/               # Primary UI components (Radix/Shadcn)
│   └── ...               # Custom mystical components
├── lib/                  # Core Utilities & AI Logic
│   ├── fortune-engine.ts # The heart of the Oracle (Calculations & Prompts)
│   └── utils.ts          # Tailwind merge & helpers
└── public/               # Static assets & icons
```

---

## ⚖️ Ethics & Philosophy
The Celestial Oracle is designed to be a tool for reflection and entertainment. We believe in "Decisive Divination"—providing clear paths rather than vague possibilities. Our AI is tuned to prioritize realism over comfort, helping users face the truth of their current path.

---

