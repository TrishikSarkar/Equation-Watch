import React from 'react';
import { WatchDial } from './WatchDial';
import { EquationSolution } from '../engine/equationEngine';

interface WatchCaseProps {
  solution: EquationSolution;
  isPm: boolean;
  secondsAngle: number;
}

export const WatchCase: React.FC<WatchCaseProps> = ({
  solution,
  isPm,
  secondsAngle,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-10 px-4">
      {/* ================= TOP LEATHER STRAP ================= */}
      <div
        className="leather-strap relative w-48 sm:w-56 h-28 -mb-10 rounded-t-xl overflow-hidden z-0"
        style={{
          boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
        }}
      >
        {/* White / Cream Leather Perimeter Stitching */}
        <div className="absolute inset-x-4 top-2 bottom-0 border-x border-dashed border-[#d8d8d4]/40" />
        {/* Leather crease line */}
        <div className="absolute inset-x-0 bottom-4 h-[2px] bg-black/60 shadow-[0_1px_1px_rgba(255,255,255,0.08)]" />
      </div>

      {/* ================= MAIN WATCH ASSEMBLY ================= */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Outer Case Drop Shadow */}
        <div
          className="absolute -inset-4 sm:-inset-6 rounded-full bg-black/60 blur-2xl pointer-events-none"
          style={{ transform: 'translateY(16px)' }}
        />

        {/* Polished Stainless Steel Case and Lugs (SVG Architecture) */}
        <div
          className="relative w-[340px] h-[340px] xs:w-[380px] xs:h-[380px] sm:w-[460px] sm:h-[460px] md:w-[520px] md:h-[520px] max-w-[90vw] max-h-[90vw] aspect-square"
        >
          {/* Lugs Layer (Behind Bezel) */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0"
            viewBox="0 0 520 520"
          >
            <defs>
              {/* Stainless Steel Polished Gradient */}
              <linearGradient id="lugSteelTopLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#DFDFDC" />
                <stop offset="65%" stopColor="#A8A8A5" />
                <stop offset="100%" stopColor="#757572" />
              </linearGradient>

              <linearGradient id="lugSteelTopRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#DFDFDC" />
                <stop offset="65%" stopColor="#A8A8A5" />
                <stop offset="100%" stopColor="#757572" />
              </linearGradient>

              <linearGradient id="lugSteelBottom" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6E6E6B" />
                <stop offset="40%" stopColor="#A0A09C" />
                <stop offset="70%" stopColor="#ECECE8" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>

              {/* Steel Bezel Conic Gradient Simulation */}
              <radialGradient id="bezelMetallic" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#ECECE9" />
                <stop offset="50%" stopColor="#C8C8C5" />
                <stop offset="75%" stopColor="#A0A09C" />
                <stop offset="100%" stopColor="#6C6C68" />
              </radialGradient>
            </defs>

            {/* Top Left Lug */}
            <path
              d="M 125,55 C 145,20 180,5 200,8 L 195,85 C 165,85 140,95 125,115 Z"
              fill="url(#lugSteelTopLeft)"
              stroke="#A8A8A5"
              strokeWidth="1"
            />
            {/* Top Right Lug */}
            <path
              d="M 395,55 C 375,20 340,5 320,8 L 325,85 C 355,85 380,95 395,115 Z"
              fill="url(#lugSteelTopRight)"
              stroke="#A8A8A5"
              strokeWidth="1"
            />
            {/* Bottom Left Lug */}
            <path
              d="M 125,465 C 145,500 180,515 200,512 L 195,435 C 165,435 140,425 125,405 Z"
              fill="url(#lugSteelBottom)"
              stroke="#A8A8A5"
              strokeWidth="1"
            />
            {/* Bottom Right Lug */}
            <path
              d="M 395,465 C 375,500 340,515 320,512 L 325,435 C 355,435 380,425 395,405 Z"
              fill="url(#lugSteelBottom)"
              stroke="#A8A8A5"
              strokeWidth="1"
            />

            {/* Winding Crown at 3 o'clock */}
            <path
              d="M 508,245 C 518,245 522,250 522,260 C 522,270 518,275 508,275 Z"
              fill="#C7C6C0"
              stroke="#7A7A78"
              strokeWidth="1.2"
            />
            {/* Crown knurling ridges */}
            <line x1="512" y1="248" x2="512" y2="272" stroke="#666" strokeWidth="1" />
            <line x1="516" y1="250" x2="516" y2="270" stroke="#FFFFFF" strokeWidth="1" />
          </svg>

          {/* Stepped Polished Stainless Steel Bezel Ring */}
          <div
            className="absolute inset-0 rounded-full p-[14px] sm:p-[18px] md:p-[22px] z-10"
            style={{
              background: `
                conic-gradient(
                  from 220deg at 50% 50%,
                  #ffffff 0deg,
                  #cfcfcc 35deg,
                  #7d7d7a 75deg,
                  #dedede 110deg,
                  #ffffff 150deg,
                  #a6a6a3 195deg,
                  #595956 240deg,
                  #e3e3e0 290deg,
                  #ffffff 360deg
                )
              `,
              boxShadow: `
                0 20px 40px rgba(0,0,0,0.65),
                0 8px 16px rgba(0,0,0,0.4),
                inset 0 2px 4px rgba(255,255,255,0.9),
                inset 0 -2px 4px rgba(0,0,0,0.6)
              `,
            }}
          >
            {/* Inner Polished Stepped Rehaut Rim */}
            <div
              className="w-full h-full rounded-full p-[4px] sm:p-[6px]"
              style={{
                background: `
                  conic-gradient(
                    from 40deg at 50% 50%,
                    #6b6b67 0deg,
                    #f5f5f2 60deg,
                    #9e9e9a 130deg,
                    #ffffff 190deg,
                    #757571 250deg,
                    #dedede 310deg,
                    #6b6b67 360deg
                  )
                `,
                boxShadow: `
                  inset 0 3px 6px rgba(0,0,0,0.7),
                  0 1px 2px rgba(255,255,255,0.8)
                `,
              }}
            >
              {/* ================= MAIN WATCH DIAL ================= */}
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <WatchDial
                  solution={solution}
                  isPm={isPm}
                  secondsAngle={secondsAngle}
                />

                {/* Subtle Curved Sapphire Glare Reflection */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: `
                      linear-gradient(
                        135deg,
                        rgba(255, 255, 255, 0.22) 0%,
                        rgba(255, 255, 255, 0.08) 25%,
                        rgba(255, 255, 255, 0) 50%,
                        rgba(255, 255, 255, 0.03) 85%,
                        rgba(255, 255, 255, 0.12) 100%
                      )
                    `,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM LEATHER STRAP ================= */}
      <div
        className="leather-strap relative w-48 sm:w-56 h-36 -mt-10 rounded-b-xl overflow-hidden z-0"
        style={{
          boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
        }}
      >
        {/* Stitching */}
        <div className="absolute inset-x-4 top-0 bottom-4 border-x border-dashed border-[#d8d8d4]/40" />
        {/* Strap keeper & buckle hint */}
        <div className="absolute inset-x-12 bottom-6 h-6 rounded-md bg-[#161619] border border-white/10 shadow-inner" />
      </div>
    </div>
  );
};

