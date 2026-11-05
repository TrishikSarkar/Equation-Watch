import React from 'react';

interface AmPmSubdialProps {
  isPm: boolean;
  size?: number; // Logical diameter of subdial
}

export const AmPmSubdial: React.FC<AmPmSubdialProps> = ({ isPm, size = 160 }) => {
  // Hand angle: AM points UP (0 deg), PM points DOWN (180 deg)
  const handAngle = isPm ? 180 : 0;

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
      {/* Snailing concentric grooves and metallic radial gradient */}
      <svg
        className="absolute inset-0 w-full h-full rounded-full"
        viewBox="0 0 160 160"
      >
        <defs>
          <radialGradient id="ampmMetallic" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FAF2DF" />
            <stop offset="45%" stopColor="#ECDDB8" />
            <stop offset="85%" stopColor="#DFCEA3" />
            <stop offset="100%" stopColor="#CCA875" />
          </radialGradient>

          <pattern id="ampmSnailingPattern" width="160" height="160" patternUnits="userSpaceOnUse">
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

          {/* Sunburst radial sheen lines */}
          <linearGradient id="needleShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="50%" stopColor="#3d3d3d" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>
        </defs>

        {/* Base filled circle */}
        <circle cx="80" cy="80" r="78" fill="url(#ampmMetallic)" />
        {/* Concentric snailing */}
        <circle cx="80" cy="80" r="78" fill="url(#ampmSnailingPattern)" />

        {/* Outer beveled bezel rim */}
        <circle
          cx="80"
          cy="80"
          r="78"
          fill="none"
          stroke="#C8B282"
          strokeWidth="1.5"
        />
        <circle
          cx="80"
          cy="80"
          r="79.2"
          fill="none"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="0.8"
        />

        {/* AM Label */}
        <text
          x="80"
          y="38"
          textAnchor="middle"
          dominantBaseline="central"
          className="font-serif font-semibold tracking-wider fill-[#171613]"
          style={{ fontSize: '15px', letterSpacing: '0.12em' }}
        >
          AM
        </text>

        {/* PM Label */}
        <text
          x="80"
          y="126"
          textAnchor="middle"
          dominantBaseline="central"
          className="font-serif font-semibold tracking-wider fill-[#171613]"
          style={{ fontSize: '15px', letterSpacing: '0.12em' }}
        >
          PM
        </text>
      </svg>

      {/* Needle Hand Pivot & Pointer */}
      <div
        className="absolute w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          transform: `rotate(${handAngle}deg)`,
        }}
      >
        {/* Needle Hand Geometry: leaf/lance shape pointing towards 12 o'clock */}
        <div
          className="relative"
          style={{
            width: '6px',
            height: '46px',
            marginBottom: '46px', // Anchor pivot to bottom of hand
            transformOrigin: '50% 100%',
          }}
        >
          <svg viewBox="0 0 10 70" className="w-full h-full overflow-visible drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]">
            {/* Tapered blued/black steel lance hand */}
            <path
              d="M 5,0 C 7,18 7,52 6.5,70 L 3.5,70 C 3,52 3,18 5,0 Z"
              fill="url(#needleShine)"
            />
            {/* Hand specular spine line */}
            <line x1="5" y1="2" x2="5" y2="68" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
          </svg>
        </div>

        {/* Central Cap Pivot */}
        <div
          className="absolute w-5 h-5 rounded-full bg-gradient-to-tr from-[#171613] via-[#3a3a3a] to-[#0a0a0a] shadow-md border border-[#C8B282]/40 flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#E5D5AF]/80" />
        </div>
      </div>
    </div>
  );
};

