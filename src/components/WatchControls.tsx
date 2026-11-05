import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sun,
  Moon,
  Calculator,
  Sliders,
  CheckCircle,
} from 'lucide-react';

interface WatchControlsProps {
  isLive: boolean;
  onToggleLive: () => void;
  isRunningSeconds: boolean;
  onToggleSeconds: () => void;
  demoHour: number;
  demoMinute: number;
  demoIsPm: boolean;
  onChangeDemoTime: (hour: number, minute: number, isPm: boolean) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenMathModal: () => void;
}

export const WatchControls: React.FC<WatchControlsProps> = ({
  isLive,
  onToggleLive,
  isRunningSeconds,
  onToggleSeconds,
  demoHour,
  demoMinute,
  demoIsPm,
  onChangeDemoTime,
  theme,
  onToggleTheme,
  onOpenMathModal,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto mt-6 px-4">
      {/* Sleek Floating Control Bar */}
      <div
        className={`p-3 sm:p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 shadow-xl ${
          theme === 'dark'
            ? 'bg-[#151518]/90 border-white/10 text-[#e5e5e2]'
            : 'bg-[#F4EBD7]/90 border-[#D4C49B]/40 text-[#171613]'
        }`}
      >
        {/* Top Action Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-black/10 dark:border-white/10">
          {/* Live vs Demo Toggle */}
          <button
            onClick={onToggleLive}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
              isLive
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            {isLive ? 'Live Local Clock' : 'Demonstration Mode'}
          </button>

          {/* Quick Action Icons */}
          <div className="flex items-center gap-1.5">
            {/* Inspect Math Button */}
            <button
              onClick={onOpenMathModal}
              title="Inspect Equation & Mathematical Proof"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D4C49B]/20 hover:bg-[#D4C49B]/30 text-[#D4C49B] dark:text-[#E9DDBD] border border-[#D4C49B]/30 text-xs font-medium transition-colors"
            >
              <Calculator size={14} />
              <span>Inspect Math</span>
            </button>

            {/* Play/Pause Seconds */}
            <button
              onClick={onToggleSeconds}
              title={isRunningSeconds ? 'Pause seconds hand' : 'Resume seconds hand'}
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/10 text-xs transition-colors"
              aria-label={isRunningSeconds ? 'Pause seconds' : 'Resume seconds'}
            >
              {isRunningSeconds ? <Pause size={15} /> : <Play size={15} />}
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              title="Toggle studio background lighting"
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/10 text-xs transition-colors"
              aria-label="Toggle presentation theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>

        {/* Time Travel / Demonstration Sliders & Presets */}
        <div className="pt-3">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="flex items-center gap-1.5 text-[#a0a09c] font-medium">
              <Sliders size={13} />
              <span>Time Simulator & Calibration</span>
            </span>
            {!isLive && (
              <button
                onClick={onToggleLive}
                className="flex items-center gap-1 text-[11px] text-[#D4C49B] hover:underline"
              >
                <RotateCcw size={11} />
                <span>Reset to real time</span>
              </button>
            )}
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {/* Hour Slider */}
            <div>
              <div className="flex justify-between text-[11px] text-[#a0a09c] mb-1 font-mono">
                <span>Hour:</span>
                <span className="font-bold text-current">{demoHour}</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={demoHour}
                onChange={(e) =>
                  onChangeDemoTime(parseInt(e.target.value, 10), demoMinute, demoIsPm)
                }
                className="w-full h-1.5 bg-black/20 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4C49B]"
              />
            </div>

            {/* Minute Slider */}
            <div>
              <div className="flex justify-between text-[11px] text-[#a0a09c] mb-1 font-mono">
                <span>Minute:</span>
                <span className="font-bold text-current">
                  {demoMinute < 10 ? `0${demoMinute}` : demoMinute}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="59"
                value={demoMinute}
                onChange={(e) =>
                  onChangeDemoTime(demoHour, parseInt(e.target.value, 10), demoIsPm)
                }
                className="w-full h-1.5 bg-black/20 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4C49B]"
              />
            </div>
          </div>

          {/* Presets and AM/PM Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
            {/* AM / PM Toggle buttons */}
            <div className="flex items-center rounded-lg p-0.5 bg-black/10 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <button
                onClick={() => onChangeDemoTime(demoHour, demoMinute, false)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  !demoIsPm
                    ? 'bg-[#D4C49B] text-[#171613] shadow-sm'
                    : 'text-[#888885] hover:text-current'
                }`}
              >
                AM
              </button>
              <button
                onClick={() => onChangeDemoTime(demoHour, demoMinute, true)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  demoIsPm
                    ? 'bg-[#D4C49B] text-[#171613] shadow-sm'
                    : 'text-[#888885] hover:text-current'
                }`}
              >
                PM
              </button>
            </div>

            {/* Curated Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] text-[#888885] hidden xs:inline">Presets:</span>
              <button
                onClick={() => onChangeDemoTime(10, 11, true)}
                className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 hover:bg-[#D4C49B]/20 border border-black/10 dark:border-white/10 text-[11px] font-mono transition-colors flex items-center gap-1"
                title="Exact time from the reference photograph"
              >
                <CheckCircle size={10} className="text-[#D4C49B]" />
                10:11 (Reference)
              </button>
              <button
                onClick={() => onChangeDemoTime(12, 0, false)}
                className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 hover:bg-[#D4C49B]/20 border border-black/10 dark:border-white/10 text-[11px] font-mono transition-colors"
              >
                12:00 AM
              </button>
              <button
                onClick={() => onChangeDemoTime(12, 0, true)}
                className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 hover:bg-[#D4C49B]/20 border border-black/10 dark:border-white/10 text-[11px] font-mono transition-colors"
              >
                12:00 PM
              </button>
              <button
                onClick={() => onChangeDemoTime(3, 45, true)}
                className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 hover:bg-[#D4C49B]/20 border border-black/10 dark:border-white/10 text-[11px] font-mono transition-colors"
              >
                3:45 PM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

