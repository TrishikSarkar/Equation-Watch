import React, { useEffect, useState } from 'react';
import { EquationSolution } from '../engine/equationEngine';

interface EquationDisplayProps {
  solution: EquationSolution;
}

interface DigitBoxProps {
  value: number;
  label: string; // for accessibility (e.g. "variable a")
}

const DigitBox: React.FC<DigitBoxProps> = ({ value, label }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setPrevValue(value);
        setIsAnimating(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div
      role="text"
      aria-label={`${label}: ${value}`}
      className="relative flex items-center justify-center overflow-hidden select-none bg-[#FDF9ED] rounded-[3px] border border-[#C5B387]/70"
      style={{
        width: 'clamp(20px, 3.2vw, 30px)',
        height: 'clamp(28px, 4.4vw, 40px)',
        boxShadow: `
          inset 0 1px 2px rgba(80, 60, 25, 0.35),
          inset 0 -1px 1px rgba(255, 255, 255, 0.8),
          0 1px 1px rgba(0, 0, 0, 0.05)
        `,
      }}
    >
      {/* Mechanical roller digit container */}
      <div
        className={`w-full h-full flex items-center justify-center font-mono font-bold text-[#171613] tracking-tighter ${
          isAnimating ? 'digit-rolling' : ''
        }`}
        style={{
          fontSize: 'clamp(16px, 2.5vw, 24px)',
          lineHeight: 1,
        }}
      >
        {value}
      </div>

      {/* Subtle top and bottom cylinder shadow for mechanical disc depth */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-b from-[#8E7954]/25 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-t from-[#8E7954]/20 to-transparent pointer-events-none" />
    </div>
  );
};

export const EquationDisplay: React.FC<EquationDisplayProps> = ({ solution }) => {
  const { a, b, c, d, e, f } = solution;

  return (
    <div
      className="relative select-none flex items-center justify-center transition-all duration-300"
      aria-label={`Current time equation: (${a} times ${b} times ${c} plus ${d}) times ${e} plus ${f}`}
    >
      {/* Outer Pill Cartouche Frame matching Reference Image */}
      <div
        className="flex items-center justify-center px-3 py-2 rounded-lg bg-[#FAF3DE] border border-[#CBB88C]"
        style={{
          boxShadow: `
            inset 0 1.5px 3px rgba(80, 60, 25, 0.4),
            inset 0 -1px 1.5px rgba(255, 255, 255, 0.85),
            0 2px 6px rgba(40, 30, 10, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.5)
          `,
          gap: 'clamp(4px, 0.8vw, 8px)',
        }}
      >
        {/* Left Parenthesis '(' */}
        <span
          className="font-serif font-bold text-[#171613]"
          style={{ fontSize: 'clamp(18px, 2.8vw, 28px)', lineHeight: 1 }}
        >
          (
        </span>

        {/* Digit a */}
        <DigitBox value={a} label="Factor A" />

        {/* Multiplication Symbol '×' */}
        <span
          className="font-serif font-bold text-[#171613] mx-[-1px]"
          style={{ fontSize: 'clamp(14px, 2.2vw, 22px)', lineHeight: 1 }}
        >
          ×
        </span>

        {/* Digit b */}
        <DigitBox value={b} label="Factor B" />

        {/* Multiplication Symbol '×' */}
        <span
          className="font-serif font-bold text-[#171613] mx-[-1px]"
          style={{ fontSize: 'clamp(14px, 2.2vw, 22px)', lineHeight: 1 }}
        >
          ×
        </span>

        {/* Digit c */}
        <DigitBox value={c} label="Factor C" />

        {/* Addition Symbol '+' */}
        <span
          className="font-serif font-bold text-[#171613] mx-[-1px]"
          style={{ fontSize: 'clamp(14px, 2.2vw, 22px)', lineHeight: 1 }}
        >
          +
        </span>

        {/* Digit d */}
        <DigitBox value={d} label="Addend D" />

        {/* Right Parenthesis ')' */}
        <span
          className="font-serif font-bold text-[#171613]"
          style={{ fontSize: 'clamp(18px, 2.8vw, 28px)', lineHeight: 1 }}
        >
          )
        </span>

        {/* Outer Multiplication Symbol '×' */}
        <span
          className="font-serif font-bold text-[#171613] mx-[-1px]"
          style={{ fontSize: 'clamp(14px, 2.2vw, 22px)', lineHeight: 1 }}
        >
          ×
        </span>

        {/* Digit e */}
        <DigitBox value={e} label="Multiplier E" />

        {/* Final Addition Symbol '+' */}
        <span
          className="font-serif font-bold text-[#171613] mx-[-1px]"
          style={{ fontSize: 'clamp(14px, 2.2vw, 22px)', lineHeight: 1 }}
        >
          +
        </span>

        {/* Digit f */}
        <DigitBox value={f} label="Addend F" />
      </div>
    </div>
  );
};

