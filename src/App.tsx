import { useState, useEffect, useRef, useCallback } from 'react';
import { WatchCase } from './components/WatchCase';
import { WatchControls } from './components/WatchControls';
import { MathExplainerModal } from './components/MathExplainerModal';
import { getSolutionForTime } from './engine/equationEngine';
import { Sparkles, Info } from 'lucide-react';

export function App() {
  // Theme state: dark (obsidian studio) or light (warm ivory gallery)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Mode: true = live clock, false = demonstration / time travel mode
  const [isLive, setIsLive] = useState<boolean>(true);

  // Seconds animation active
  const [isRunningSeconds, setIsRunningSeconds] = useState<boolean>(true);

  // Demo mode time state
  const [demoHour, setDemoHour] = useState<number>(10);
  const [demoMinute, setDemoMinute] = useState<number>(11);
  const [demoIsPm, setDemoIsPm] = useState<boolean>(true);

  // Live time state
  const [currentHours, setCurrentHours] = useState<number>(10);
  const [currentMinutes, setCurrentMinutes] = useState<number>(11);
  const [isPm, setIsPm] = useState<boolean>(true);
  const [secondsAngle, setSecondsAngle] = useState<number>(0);

  // Math Explainer Modal state
  const [isMathModalOpen, setIsMathModalOpen] = useState<boolean>(false);

  // Animation frame reference
  const animFrameRef = useRef<number | null>(null);
  const lastSecondRef = useRef<number>(-1);

  // Sync clock time
  const syncWithSystemTime = useCallback(() => {
    const now = new Date();
    const h24 = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();
    const millis = now.getMilliseconds();

    const pm = h24 >= 12;
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;

    setCurrentHours(h12);
    setCurrentMinutes(mins);
    setIsPm(pm);

    // Continuous 60fps sweeping seconds angle (6 degrees per second)
    const angle = (secs + millis / 1000) * 6;
    setSecondsAngle(angle);

    lastSecondRef.current = secs;
  }, []);

  // Set initial state on mount
  useEffect(() => {
    syncWithSystemTime();
  }, [syncWithSystemTime]);

  // RequestAnimationFrame loop for silky smooth seconds hand & minute tracking
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      if (isLive) {
        const now = new Date();
        const secs = now.getSeconds();
        const millis = now.getMilliseconds();

        // Check if minute transitioned
        if (secs !== lastSecondRef.current) {
          lastSecondRef.current = secs;
          const mins = now.getMinutes();
          const h24 = now.getHours();
          const pm = h24 >= 12;
          let h12 = h24 % 12;
          if (h12 === 0) h12 = 12;

          setCurrentHours(h12);
          setCurrentMinutes(mins);
          setIsPm(pm);
        }

        if (isRunningSeconds) {
          const angle = (secs + millis / 1000) * 6;
          setSecondsAngle(angle);
        }
      } else {
        // In demo mode, if seconds running, advance continuously
        if (isRunningSeconds) {
          setSecondsAngle((prev) => (prev + 0.36) % 360);
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isLive, isRunningSeconds]);

  // Tab visibility change resync
  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden && isLive) {
        syncWithSystemTime();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isLive, syncWithSystemTime]);

  // Handle demo time change
  const handleDemoTimeChange = (hour: number, minute: number, pm: boolean) => {
    setIsLive(false);
    setDemoHour(hour);
    setDemoMinute(minute);
    setDemoIsPm(pm);
  };

  // Determine active display values
  const activeHour = isLive ? currentHours : demoHour;
  const activeMinute = isLive ? currentMinutes : demoMinute;
  const activeIsPm = isLive ? isPm : demoIsPm;

  // Retrieve optimal mathematical solution
  const solution = getSolutionForTime(activeHour, activeMinute);

  return (
    <div
      className={`min-h-screen transition-colors duration-700 flex flex-col justify-between selection:bg-[#D4C49B] selection:text-[#171613] ${
        theme === 'dark'
          ? 'bg-[#0c0c0e] text-[#ECECE8]'
          : 'bg-[#F2ECE1] text-[#171613]'
      }`}
    >
      {/* Background Ambience / Subtle Lighting Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {theme === 'dark' ? (
          <>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#D4C49B]/[0.035] blur-[140px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.015] blur-[100px]" />
          </>
        ) : (
          <>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#D4C49B]/15 blur-[120px]" />
          </>
        )}
      </div>

      {/* Top Luxury Horology Brand Header */}
      <header className="relative z-20 pt-8 pb-4 text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] tracking-[0.25em] uppercase font-mono font-medium mb-2 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md">
          <Sparkles size={11} className="text-[#D4C49B]" />
          <span>Haute Horlogerie Mathématique</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.18em] uppercase text-current">
          Equation Watch
        </h1>
        <p className="mt-1 text-xs sm:text-sm tracking-[0.15em] font-sans text-[#a0a09c] uppercase">
          Time, expressed differently.
        </p>
      </header>

      {/* Main Stage: The Watch Hero */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center my-auto">
        <div className="w-full flex justify-center">
          <WatchCase
            solution={solution}
            isPm={activeIsPm}
            secondsAngle={secondsAngle}
          />
        </div>

        {/* Live Calculation Pill directly underneath */}
        <div className="mt-2 flex items-center justify-center gap-2 text-xs font-mono">
          <button
            onClick={() => setIsMathModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:border-[#D4C49B]/50 transition-all text-[#a0a09c] hover:text-current group"
          >
            <span>Result:</span>
            <strong className="text-current font-bold">{solution.target}</strong>
            <span className="opacity-50">→</span>
            <span className="text-[#D4C49B] font-semibold">
              {activeHour}:{activeMinute < 10 ? `0${activeMinute}` : activeMinute} {activeIsPm ? 'PM' : 'AM'}
            </span>
            <Info size={13} className="opacity-60 group-hover:opacity-100 text-[#D4C49B]" />
          </button>
        </div>

        {/* Minimal Interactive Control Center */}
        <WatchControls
          isLive={isLive}
          onToggleLive={() => {
            if (!isLive) {
              syncWithSystemTime();
              setIsLive(true);
            } else {
              setDemoHour(currentHours);
              setDemoMinute(currentMinutes);
              setDemoIsPm(isPm);
              setIsLive(false);
            }
          }}
          isRunningSeconds={isRunningSeconds}
          onToggleSeconds={() => setIsRunningSeconds((prev) => !prev)}
          demoHour={demoHour}
          demoMinute={demoMinute}
          demoIsPm={demoIsPm}
          onChangeDemoTime={handleDemoTimeChange}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          onOpenMathModal={() => setIsMathModalOpen(true)}
        />
      </main>

      {/* Minimal Luxury Footer */}
      <footer className="relative z-20 py-6 text-center text-[11px] tracking-widest uppercase font-mono text-[#787875]">
        <span>Single-Digit Mathematical Complication</span>
        <span className="mx-2">•</span>
        <span>(a × b × c + d) × e + f</span>
      </footer>

      {/* Math Explainer Modal */}
      <MathExplainerModal
        isOpen={isMathModalOpen}
        onClose={() => setIsMathModalOpen(false)}
        solution={solution}
        isPm={activeIsPm}
      />
    </div>
  );
}
export default App;

