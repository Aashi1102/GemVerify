import React, { useState } from 'react';

interface GeMLogoProps {
  className?: string;
  size?: number;
}

export const GeMLogo: React.FC<GeMLogoProps> = ({ className = "w-10 h-10", size }) => {
  const [hasError, setHasError] = useState(false);

  if (!hasError) {
    return (
      <img
        src="/gem-logo.png"
        alt="Tender Live National Procurement Intelligence Logo"
        width={size}
        height={size}
        className={`${className} object-contain shrink-0`}
        onError={() => setHasError(true)}
        referrerPolicy="no-referrer"
      />
    );
  }

  // High-fidelity SVG representation of the Indian Tricolour, Ashoka Chakra, Tender Doc & Cyber Shield
  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Tender Live Logo"
    >
      <defs>
        {/* Saffron Arc Gradient */}
        <linearGradient id="saffronArc" x1="10" y1="60" x2="85" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF7700" />
          <stop offset="100%" stopColor="#FFAA22" />
        </linearGradient>

        {/* Green Arc Gradient */}
        <linearGradient id="greenArc" x1="15" y1="85" x2="60" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B7A3E" />
          <stop offset="100%" stopColor="#19A855" />
        </linearGradient>

        {/* Blue Bottom Arc Gradient */}
        <linearGradient id="blueArc" x1="25" y1="100" x2="105" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#003D82" />
          <stop offset="60%" stopColor="#0066CC" />
          <stop offset="100%" stopColor="#00A2FF" />
        </linearGradient>

        {/* Shield Cyber Gradient */}
        <linearGradient id="shieldGrad" x1="45" y1="45" x2="85" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0099FF" />
          <stop offset="50%" stopColor="#0066DD" />
          <stop offset="100%" stopColor="#0044B3" />
        </linearGradient>

        {/* Subtle Shield Highlight */}
        <linearGradient id="shieldHighlight" x1="45" y1="45" x2="65" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#66CCFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0066DD" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 1. Saffron Outer Arc */}
      <path
        d="M 12 66 C 10 38 28 14 62 8 C 76 6 88 9 96 15 C 84 10 70 9 58 13 C 32 20 18 40 18 64 C 18 66 14 68 12 66 Z"
        fill="url(#saffronArc)"
      />

      {/* 2. Green Inner Arc */}
      <path
        d="M 32 98 C 16 78 12 50 28 26 C 42 12 64 8 82 14 C 64 12 46 18 36 30 C 22 48 24 74 36 94 C 36 96 34 99 32 98 Z"
        fill="url(#greenArc)"
      />

      {/* 3. Blue Bottom Arc */}
      <path
        d="M 28 94 C 42 110 72 114 96 100 C 110 90 116 74 114 56 C 112 72 102 88 88 96 C 70 106 44 104 30 92 C 28 90 26 92 28 94 Z"
        fill="url(#blueArc)"
      />

      {/* 4. Ashoka Chakra on upper right */}
      <g transform="translate(76, 44)">
        <circle cx="0" cy="0" r="28" stroke="#0F2C59" strokeWidth="2.5" fill="none" opacity="0.9" />
        <circle cx="0" cy="0" r="4.5" fill="#0F2C59" />
        {/* 24 spokes */}
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2="0"
            y2="-27"
            stroke="#0F2C59"
            strokeWidth="1.2"
            transform={`rotate(${i * 15})`}
            opacity="0.85"
          />
        ))}
      </g>

      {/* 5. Document (Tender/Bid Paper) */}
      <g>
        {/* Document base with folded corner */}
        <path
          d="M 32 34 C 32 30 35 27 39 27 L 66 27 L 79 40 L 79 88 C 79 92 76 95 72 95 L 39 95 C 35 95 32 92 32 88 Z"
          fill="#FFFFFF"
          stroke="#0A2540"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Folded ear */}
        <path
          d="M 66 27 L 66 40 L 79 40 Z"
          fill="#0A2540"
          stroke="#0A2540"
          strokeWidth="1"
        />
        {/* Horizontal text lines */}
        <rect x="40" y="44" width="22" height="3.5" rx="1.75" fill="#0055B3" />
        <rect x="40" y="52" width="26" height="3.5" rx="1.75" fill="#0055B3" />
        <rect x="40" y="60" width="20" height="3.5" rx="1.75" fill="#0055B3" />
        <rect x="40" y="68" width="24" height="3.5" rx="1.75" fill="#0055B3" />
        <rect x="40" y="76" width="16" height="3.5" rx="1.75" fill="#0055B3" />
      </g>

      {/* 6. Cyber Security Shield in Foreground */}
      <g filter="drop-shadow(0 4px 6px rgba(0, 51, 102, 0.25))">
        {/* Shield Body */}
        <path
          d="M 54 52 C 68 50 82 54 88 56 C 88 78 76 94 54 102 C 32 94 20 78 20 56 C 26 54 40 50 54 52 Z"
          transform="translate(14, 4) scale(0.85)"
          fill="url(#shieldGrad)"
        />
        {/* Shield Highlight */}
        <path
          d="M 54 53 C 66 51 78 54 84 56 C 84 76 74 90 54 98 C 54 75 54 53 54 53 Z"
          transform="translate(14, 4) scale(0.85)"
          fill="url(#shieldHighlight)"
        />

        {/* Circuit Traces & Nodes on Shield */}
        <g stroke="#60A5FA" strokeWidth="1.2" fill="none" opacity="0.85">
          {/* Left Circuit */}
          <path d="M 46 72 L 52 72 L 56 76" />
          <circle cx="46" cy="72" r="1.5" fill="#60A5FA" />
          
          <path d="M 44 82 L 50 82 L 54 86" />
          <circle cx="44" cy="82" r="1.5" fill="#60A5FA" />

          {/* Right Circuit */}
          <path d="M 76 68 L 72 68 L 68 72" />
          <circle cx="76" cy="68" r="1.5" fill="#60A5FA" />

          <path d="M 78 78 L 72 78 L 68 75" />
          <circle cx="78" cy="78" r="1.5" fill="#60A5FA" />
        </g>

        {/* Bold White Checkmark in Shield */}
        <path
          d="M 50 72 L 57 79 L 72 63"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
};
