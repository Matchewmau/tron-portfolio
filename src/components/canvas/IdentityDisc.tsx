import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import tronDiscImg from '../../assets/tron-disc-clean.png';
import { useAudioHud } from '../../context/AudioContext';
import { portfolioData } from '../../data/portfolioData';

export function IdentityDisc() {
  const prefersReducedMotion = useReducedMotion();
  const { playHover, playClick } = useAudioHud();
  const [highlightMode, setHighlightMode] = useState(false);

  const handleToggleMode = () => {
    playClick();
    setHighlightMode((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Soft Ambient Backlight Behind the Identity Disc */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute h-72 w-72 rounded-full blur-3xl transition-colors duration-500 sm:h-80 sm:w-80 ${
          highlightMode ? 'bg-[#FB923C]/18' : 'bg-[#38D9F5]/14'
        }`}
      />

      <button
        type="button"
        onClick={handleToggleMode}
        onMouseEnter={playHover}
        aria-label="John Mathew B. Mauricio portrait framed inside interactive Tron Identity Disc"
        className="group relative flex h-80 w-80 items-center justify-center rounded-full focus-visible:outline-[#38D9F5] sm:h-[24rem] sm:w-[24rem]"
      >
        {/* Center Portrait Core — Tucked Seamlessly Behind the Inner Metallic Bezel */}
        <div className="relative z-0 h-[44%] w-[44%] overflow-hidden rounded-full bg-[#07101B]">
          <img
            src={portfolioData.identity.portraitUrl}
            alt="John Mathew B. Mauricio"
            className="h-full w-full scale-[1.08] object-cover object-[50%_38%] transition-transform duration-500 ease-snappy group-hover:scale-[1.14]"
          />
          {/* Subtle Inner Bezel Depth Vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_18px_rgba(4,10,18,0.8)]"
            style={{
              background:
                'radial-gradient(circle at 50% 44%, transparent 58%, rgba(7, 16, 27, 0.55) 100%)',
            }}
          />
        </div>

        {/* Authentic Tron: Legacy Identity Disc — Rotating Gently Around Portrait */}
        <motion.img
          src={tronDiscImg}
          alt=""
          aria-hidden="true"
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  repeat: Infinity,
                  ease: 'linear',
                  duration: highlightMode ? 14 : 42,
                }
          }
          className={`pointer-events-none absolute inset-0 z-10 h-full w-full select-none object-contain transition-all duration-500 ${
            highlightMode
              ? 'drop-shadow-[0_0_22px_rgba(251,146,60,0.35)] hue-rotate-[165deg] saturate-150'
              : 'drop-shadow-[0_0_22px_rgba(56,217,245,0.22)]'
          }`}
        />
      </button>

      {/* Clean Status Caption */}
      <div className="mt-1 flex items-center justify-center gap-2 text-center font-mono text-xs text-[#A3BACB]">
        <span
          className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-300 ${
            highlightMode ? 'bg-[#FB923C]' : 'bg-[#38D9F5]'
          }`}
          aria-hidden="true"
        />
        <span>{portfolioData.identity.statusTelemetry}</span>
      </div>
    </div>
  );
}
