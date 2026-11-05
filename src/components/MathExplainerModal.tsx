import React from 'react';
import { getStepByStepBreakdown, EquationSolution } from '../engine/equationEngine';
import { X, CheckCircle2, Calculator, Sparkles, Clock } from 'lucide-react';

interface MathExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  solution: EquationSolution;
  isPm: boolean;
}

export const MathExplainerModal: React.FC<MathExplainerModalProps> = ({
  isOpen,
  onClose,
  solution,
  isPm,
}) => {
  if (!isOpen) return null;

  const { a, b, c, d, e, f, target } = solution;
  const breakdown = getStepByStepBreakdown(a, b, c, d, e, f);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-[#18181b] border border-[#C5B387]/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#e5e5e2] overflow-hidden"
        style={{
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(197, 179, 135, 0.15)',
        }}
      >
        {/* Top Gold Foil Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4C49B] to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#D4C49B]/10 border border-[#D4C49B]/30 text-[#D4C49B]">
              <Calculator size={20} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold tracking-wide text-[#FAF0DA]">
                Mathematical Proof
              </h3>
              <p className="text-xs text-[#a0a09c] font-sans">
                Haute Horlogerie Algebraic Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#a0a09c] hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Master Formula Pill */}
        <div className="my-5 p-4 rounded-xl bg-[#111113] border border-white/5 flex flex-col items-center">
          <span className="text-[11px] uppercase tracking-widest text-[#a0a09c] mb-1">
            Active Watch Complication
          </span>
          <div className="font-mono text-lg sm:text-xl text-[#F8F0DA] font-semibold tracking-wide">
            ({a} × {b} × {c} + {d}) × {e} + {f}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-[#D4C49B]">
            <CheckCircle2 size={14} />
            <span>Evaluates exactly to <strong className="font-mono font-bold text-white">{target}</strong> ({breakdown.timeString} {isPm ? 'PM' : 'AM'})</span>
          </div>
        </div>

        {/* Step-by-Step Breakdown */}
        <div className="space-y-2.5 my-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#a0a09c]">
            Evaluation Sequence:
          </span>
          {breakdown.steps.map((st) => (
            <div
              key={st.step}
              className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5 text-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#D4C49B]/10 text-[#D4C49B] text-xs flex items-center justify-center font-mono">
                  {st.step}
                </span>
                <span className="text-xs text-[#d0d0cc]">{st.description}</span>
              </div>
              <div className="font-mono font-semibold text-[#F8F0DA]">
                {st.math} = <span className="text-[#D4C49B]">{st.result}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#201d17] to-[#151412] border border-[#D4C49B]/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="text-[#D4C49B]" size={20} />
            <div>
              <div className="text-[11px] text-[#a0a09c] uppercase tracking-wider">Resulting Time</div>
              <div className="text-lg font-serif font-bold text-[#F8F0DA]">
                {breakdown.timeString} {isPm ? 'PM' : 'AM'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-[#a0a09c] uppercase tracking-wider">Formula Coverage</div>
            <div className="text-sm font-mono font-semibold text-[#86efac] flex items-center gap-1 justify-end">
              <Sparkles size={13} />
              720 / 720 Mins (100%)
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-[#D4C49B] hover:bg-[#e2d4af] text-[#171613] font-medium tracking-wide transition-all shadow-md active:scale-[0.99]"
          >
            Return to Watch Face
          </button>
        </div>
      </div>
    </div>
  );
};

