import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import tronDiscImg from '../../assets/tron-disc-clean.png';

export const BOOT_STORAGE_KEY = 'tron_portfolio_booted_v1';

const BOOT_LINES = [
  '> Initializing Grid Interface...',
  '> Authenticating: John Mathew B. Mauricio',
  '> System Ready',
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

    const t1 = window.setTimeout(() => setVisibleLineCount(2), 450);
    const t2 = window.setTimeout(() => setVisibleLineCount(3), 950);
    const t3 = window.setTimeout(() => finishBoot(), 1550);

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
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07101B]/95 px-4 backdrop-blur-md"
        >
          <div className="relative w-full max-w-lg p-[1px] clip-chamfer bg-[#38D9F5]/30 shadow-neon-cyan">
            <div className="clip-chamfer hud-panel-surface bg-[#0D1928]/95 p-5 sm:p-7">
              <div className="mb-5 flex items-center justify-between gap-2 border-b border-[#38D9F5]/18 pb-3.5">
                <div className="flex items-center gap-2.5 text-[#7CE7FA]">
                  <img
                    src={tronDiscImg}
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 object-contain"
                  />
                  <span className="font-display text-xs font-semibold tracking-wider">
                    J.M. Mauricio · Portfolio
                  </span>
                </div>
                <button
                  type="button"
                  onClick={finishBoot}
                  className="min-h-[40px] shrink-0 border border-[#38D9F5]/35 bg-[#38D9F5]/10 px-3.5 py-1.5 font-sans text-xs font-medium text-[#E6F4FA] transition-colors duration-150 hover:bg-[#38D9F5] hover:text-[#07101B] clip-chamfer-sm"
                >
                  Skip
                </button>
              </div>

              <div className="space-y-2.5 font-mono text-sm" aria-live="polite">
                {BOOT_LINES.slice(0, visibleLineCount).map((line, index) => {
                  const isReady = index === 2;
                  return (
                    <motion.p
                      key={line}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.16 }}
                      className={isReady ? 'font-medium text-[#38D9F5]' : 'text-[#E2EDF5]'}
                    >
                      {line}
                    </motion.p>
                  );
                })}
              </div>

              <div className="mt-5">
                <div className="h-1 w-full overflow-hidden rounded-full bg-[#07101B]">
                  <motion.div
                    initial={{ width: '15%' }}
                    animate={{ width: `${(visibleLineCount / BOOT_LINES.length) * 100}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="h-full bg-[#38D9F5]"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
