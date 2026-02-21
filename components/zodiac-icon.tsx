interface ZodiacIconProps {
  sign: string;
  className?: string;
  size?: number;
}

export function ZodiacIcon({ sign, className = "", size = 32 }: ZodiacIconProps) {
  const renderPaths = () => {
    switch (sign) {
      case "Aries":
        return (
          <>
            {/* Ram horns */}
            <path d="M20 60 Q20 20 35 25 Q42 28 40 40" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M60 60 Q60 20 45 25 Q38 28 40 40" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "Taurus":
        return (
          <>
            {/* Bull head circle and horns */}
            <circle cx="40" cy="50" r="16" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M24 40 Q20 20 30 18" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M56 40 Q60 20 50 18" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "Gemini":
        return (
          <>
            {/* Twin pillars */}
            <line x1="30" y1="20" x2="30" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="20" x2="50" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M22 22 Q40 14 58 22" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M22 58 Q40 66 58 58" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "Cancer":
        return (
          <>
            {/* Crab claws / 69 rotated */}
            <path d="M50 34 A12 12 0 1 0 38 34" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M30 46 A12 12 0 1 0 42 46" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "Leo":
        return (
          <>
            {/* Lion mane loop */}
            <circle cx="32" cy="48" r="12" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M44 48 Q56 48 56 36 Q56 24 44 24" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "Virgo":
        return (
          <>
            {/* Maiden symbol */}
            <line x1="22" y1="20" x2="22" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="34" y1="20" x2="34" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="46" y1="20" x2="46" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M22 24 Q28 18 34 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M34 24 Q40 18 46 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M46 50 Q58 44 56 58" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        );
      case "Libra":
        return (
          <>
            {/* Scales */}
            <line x1="20" y1="58" x2="60" y2="58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="46" x2="60" y2="46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M24 46 Q40 24 56 46" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "Scorpio":
        return (
          <>
            {/* Scorpion tail with arrow */}
            <line x1="20" y1="20" x2="20" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="32" y1="20" x2="32" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="44" y1="20" x2="44" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M20 24 Q26 18 32 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M32 24 Q38 18 44 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M44 58 Q56 58 56 46" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M52 50 L56 46 L60 50" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        );
      case "Sagittarius":
        return (
          <>
            {/* Archer's arrow */}
            <line x1="22" y1="58" x2="58" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="42" y1="22" x2="58" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="58" y1="22" x2="58" y2="38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="30" y1="42" x2="42" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </>
        );
      case "Capricorn":
        return (
          <>
            {/* Sea-goat symbol */}
            <path d="M22 24 Q22 54 36 54 Q48 54 48 40 Q48 30 40 28" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M48 54 Q54 62 58 54 Q62 46 54 42" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        );
      case "Aquarius":
        return (
          <>
            {/* Water waves */}
            <path d="M18 34 Q26 24 34 34 Q42 44 50 34 Q58 24 62 34" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M18 50 Q26 40 34 50 Q42 60 50 50 Q58 40 62 50" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "Pisces":
        return (
          <>
            {/* Two fish arcs with line */}
            <path d="M22 22 Q44 30 22 58" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M58 22 Q36 30 58 58" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <line x1="18" y1="40" x2="62" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </>
        );
      default:
        return <circle cx="40" cy="40" r="16" stroke="currentColor" strokeWidth="2" fill="none" />;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`${sign} zodiac sign`}
      role="img"
    >
      {renderPaths()}
    </svg>
  );
}
