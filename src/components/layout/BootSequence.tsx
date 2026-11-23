import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export const BOOT_STORAGE_KEY = 'tron_portfolio_booted_v1';

const BOOT_LINES = [
  '> INITIALIZING GRID...',
  '> AUTHENTICATING USER: J.M. MAURICIO...',
  '> ACCESS GRANTED',
] as const;

interface BootSequenceProps {
  onComplete?: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const prefersReducedMotion = useReducedMotion();

  const [isVisible, setIsVisible] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(BOOT_STORAGE_KEY) !== 'true';
    } catch {
      return false;
    }
  });

  const [visibleLineCount, setVisibleLineCount] = useState<number>(1);

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem(BOOT_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors in restricted environments
    }
    setIsVisible(false);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        finishBoot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const t1 = window.setTimeout(() => setVisibleLineCount(2), 550);
    const t2 = window.setTimeout(() => setVisibleLineCount(3), 1150);
    const t3 = window.setTimeout(() => finishBoot(), 1950);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [finishBoot, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="System boot sequence"
          initial={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02060B] px-4"
        >
          {/* Background Subtle Grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0,240,255,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.16) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative w-full max-w-xl p-[1px] clip-chamfer bg-[#00F0FF]/45 shadow-neon-cyan">
            <div className="clip-chamfer hud-panel-surface bg-[#07131D]/95 p-4 sm:p-8">
              {/* Top Bar */}
              <div className="mb-6 flex items-center justify-between gap-2 border-b border-[#00F0FF]/25 pb-3">
                <div className="flex items-center gap-2 text-[#00F0FF]">
                  <Terminal className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="font-display text-[11px] font-bold uppercase tracking-wider sm:text-xs sm:tracking-widest">
                    GRID_BOOT_LOADER // v2.6
                  </span>
                </div>
                <button
                  type="button"
                  onClick={finishBoot}
                  className="min-h-[44px] min-w-[72px] shrink-0 border border-[#00F0FF]/50 bg-[#00F0FF]/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF] transition-colors duration-150 hover:bg-[#00F0FF] hover:text-[#02060B]"
                >
                  [SKIP]
                </button>
              </div>

              {/* Terminal Telemetry Output */}
              <div className="space-y-3 font-mono text-sm sm:text-base" aria-live="polite">
                {BOOT_LINES.slice(0, visibleLineCount).map((line, index) => {
                  const isGranted = index === 2;
                  return (
                    <motion.p
                      key={line}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18 }}
                      className={
                        isGranted
                          ? 'font-bold tracking-wider text-[#00F0FF] drop-shadow-neon-cyan'
                          : 'text-[#E2F1F8]'
                      }
                    >
                      {line}
                    </motion.p>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="h-1.5 w-full overflow-hidden bg-[#02060B] border border-[#00F0FF]/25">
                  <motion.div
                    initial={{ width: '12%' }}
                    animate={{ width: `${(visibleLineCount / BOOT_LINES.length) * 100}%` }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="h-full bg-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.85)]"
                  />
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-[#8BAEC4] sm:text-[11px]">
                  <span>NODE: ZAMBOANGA_PH</span>
                  <span>PRESS [ESC] OR CLICK [SKIP]</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
