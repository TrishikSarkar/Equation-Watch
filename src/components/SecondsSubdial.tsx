import React from 'react';

interface SecondsSubdialProps {
  secondsAngle: number; // in degrees (0 to 360)
  size?: number;        // logical diameter in px
}

export const SecondsSubdial: React.FC<SecondsSubdialProps> = ({
  secondsAngle,
  size = 160,
}) => {
  return (
    <div
      className="relative rounded-full select-none flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: `
          inset 0 2px 4px rgba(70, 55, 30, 0.45),
          inset 0 -1px 2px rgba(255, 255, 255, 0.7),
          0 1px 3px rgba(0, 0, 0, 0.15)
        `,
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full rounded-full"
        viewBox="0 0 160 160"
      >
        <defs>
          <radialGradient id="secMetallic" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FAF2DF" />
            <stop offset="45%" stopColor="#ECDDB8" />
            <stop offset="85%" stopColor="#DFCEA3" />
            <stop offset="100%" stopColor="#CCA875" />
          </radialGradient>

          <pattern id="secSnailingPattern" width="160" height="160" patternUnits="userSpaceOnUse">
            {[10, 16, 22, 28, 34, 40, 46, 52, 58, 64, 70, 76].map((r) => (
              <circle
                key={r}
                cx="80"
                cy="80"
                r={r}
                fill="none"
                stroke="rgba(160, 135, 90, 0.28)"
                strokeWidth="0.75"
              />
            ))}
          </pattern>
        </defs>

        {/* Base dial fill */}
        <circle cx="80" cy="80" r="78" fill="url(#secMetallic)" />
        {/* Concentric snailing grooves */}
        <circle cx="80" cy="80" r="78" fill="url(#secSnailingPattern)" />

        {/* Outer border & bezel */}
        <circle cx="80" cy="80" r="78" fill="none" stroke="#C8B282" strokeWidth="1.5" />
        <circle cx="80" cy="80" r="79.2" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="0.8" />

        {/* Inner track border */}
        <circle cx="80" cy="80" r="69" fill="none" stroke="rgba(23, 22, 19, 0.25)" strokeWidth="0.75" />

        {/* 60 Seconds / Minutes Graduation Ticks */}
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i * 360) / 60;
          const rad = (angle * Math.PI) / 180;
          const isQuarter = i % 15 === 0; // 0, 15, 30, 45 (12, 3, 6, 9 o'clock)
          const isFive = i % 5 === 0;

          const rOuter = 69;
          const rInner = isQuarter ? 60 : isFive ? 63 : 66;
          const strokeW = isQuarter ? 1.6 : isFive ? 1.2 : 0.75;
          const strokeColor = isQuarter ? '#171613' : isFive ? '#2b2924' : 'rgba(23, 22, 19, 0.65)';

          const x1 = 80 + rOuter * Math.sin(rad);
          const y1 = 80 - rOuter * Math.cos(rad);
          const x2 = 80 + rInner * Math.sin(rad);
          const y2 = 80 - rInner * Math.cos(rad);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={strokeColor}
              strokeWidth={strokeW}
              strokeLinecap="square"
            />
          );
        })}
      </svg>

      {/* Continuously Sweeping Seconds Hand */}
      <div
        className="absolute w-full h-full flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          transform: `rotate(${secondsAngle}deg)`,
        }}
      >
        <svg
          viewBox="0 0 20 160"
          className="w-full h-full overflow-visible drop-shadow-[0_2px_3px_rgba(0,0,0,0.38)]"
        >
          {/* Main needle body pointing upwards to 12 o'clock (tip at y=16) */}
          <path
            d="M 9.5,80 L 9.8,18 L 10,16 L 10.2,18 L 10.5,80 Z"
            fill="#171613"
          />
          {/* Tail counterweight pointing downwards (tail to y=102) */}
          <path
            d="M 9.5,80 L 9.2,95 L 8.5,98 L 8.5,102 L 11.5,102 L 11.5,98 L 10.8,95 L 10.5,80 Z"
            fill="#171613"
          />
          {/* Circular counterweight bead near tail */}
          <circle cx="10" cy="98" r="2.2" fill="#171613" />

          {/* Center Pivot Boss Cap */}
          <circle cx="10" cy="80" r="4.2" fill="#171613" stroke="#2a2a2a" strokeWidth="0.5" />
          <circle cx="10" cy="80" r="1.6" fill="#D4C49B" />
        </svg>
      </div>
    </div>
  );
};

