import React from 'react';
import { GuillochePattern } from './GuillochePattern';
import { AmPmSubdial } from './AmPmSubdial';
import { SecondsSubdial } from './SecondsSubdial';
import { EquationDisplay } from './EquationDisplay';
import { EquationSolution } from '../engine/equationEngine';

interface WatchDialProps {
  solution: EquationSolution;
  isPm: boolean;
  secondsAngle: number;
}

export const WatchDial: React.FC<WatchDialProps> = ({
  solution,
  isPm,
  secondsAngle,
}) => {
  return (
    <div
      className="relative w-full h-full rounded-full overflow-hidden select-none"
      style={{
        boxShadow: `
          inset 0 6px 12px rgba(60, 45, 20, 0.45),
          inset 0 -4px 8px rgba(255, 255, 255, 0.6),
          inset 0 0 0 2px #C5B387,
          inset 0 0 20px rgba(100, 80, 45, 0.25)
        `,
      }}
    >
      {/* 1. Intricate Guilloché Background Canvas */}
      <GuillochePattern size={800} />

      {/* 2. Dial Outer Perimeter Bevel & Fine Minute Track Ring */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 800"
      >
        <defs>
          <radialGradient id="dialRimBevel" cx="45%" cy="40%" r="55%">
            <stop offset="92%" stopColor="transparent" />
            <stop offset="97%" stopColor="rgba(140, 115, 75, 0.35)" />
            <stop offset="100%" stopColor="rgba(60, 45, 25, 0.65)" />
          </radialGradient>
        </defs>

        <circle cx="400" cy="400" r="396" fill="url(#dialRimBevel)" />
        <circle cx="400" cy="400" r="392" fill="none" stroke="#C5B387" strokeWidth="1.5" />
        <circle cx="400" cy="400" r="388" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="0.8" />
      </svg>

      {/* 3. Three-Subdial Vertical Layout (12 o'clock, Equator, 6 o'clock) */}
      <div className="absolute inset-0 flex flex-col items-center justify-between py-[12%] px-[6%] pointer-events-auto">
        {/* Top: AM/PM Indicator at 12 o'clock */}
        <div className="z-10 transform scale-[0.9] sm:scale-100 transition-transform">
          <AmPmSubdial isPm={isPm} size={150} />
        </div>

        {/* Center: Equation Display at Equator */}
        <div className="z-20 my-auto transform scale-[0.88] sm:scale-100 transition-transform">
          <EquationDisplay solution={solution} />
        </div>

        {/* Bottom: Continuous Sweeping Seconds at 6 o'clock */}
        <div className="z-10 transform scale-[0.9] sm:scale-100 transition-transform">
          <SecondsSubdial secondsAngle={secondsAngle} size={150} />
        </div>
      </div>
    </div>
  );
};

