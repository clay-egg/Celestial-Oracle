export function OracleLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Celestial Oracle logo"
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

      {/* Crystal ball / orb */}
      <circle cx="50" cy="50" r="28" fill="currentColor" opacity="0.05" />
      <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />

      {/* Inner glow */}
      <circle cx="50" cy="48" r="18" fill="currentColor" opacity="0.08" />

      {/* Eye of providence / all-seeing eye */}
      <ellipse cx="50" cy="50" rx="16" ry="10" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.6" />
      <circle cx="50" cy="50" r="2.5" fill="currentColor" opacity="0.9" />

      {/* Light reflection */}
      <circle cx="42" cy="40" r="3" fill="currentColor" opacity="0.15" />

      {/* Crescent moon - top left */}
      <path
        d="M22 22 A10 10 0 0 1 28 14 A8 8 0 0 0 22 22Z"
        fill="currentColor"
        opacity="0.5"
      />

      {/* Star points around the orb */}
      <circle cx="50" cy="12" r="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="50" cy="88" r="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="12" cy="50" r="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="88" cy="50" r="1.5" fill="currentColor" opacity="0.7" />

      {/* Diagonal star points */}
      <circle cx="23" cy="23" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="77" cy="23" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="23" cy="77" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="77" cy="77" r="1" fill="currentColor" opacity="0.5" />

      {/* Connecting lines from stars to ring */}
      <line x1="50" y1="12" x2="50" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="50" y1="78" x2="50" y2="88" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="12" y1="50" x2="22" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="78" y1="50" x2="88" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />

      {/* Base / stand crescent */}
      <path
        d="M36 78 Q50 86 64 78"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
        fill="none"
      />
      <path
        d="M40 82 Q50 88 60 82"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.3"
        fill="none"
      />
    </svg>
  );
}
