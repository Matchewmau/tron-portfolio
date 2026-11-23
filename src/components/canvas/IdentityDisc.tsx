import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
      {/* Soft Ambient Halo */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute h-72 w-72 rounded-full blur-3xl transition-colors duration-500 sm:h-80 sm:w-80 ${
          highlightMode ? 'bg-[#FB923C]/15' : 'bg-[#38D9F5]/12'
        }`}
      />

      <div className="relative flex h-72 w-72 items-center justify-center sm:h-[21rem] sm:w-[21rem]">
        {/* Dual Counter-Rotating Tron Identity Disc SVG Frame */}
        <svg
          viewBox="0 0 340 340"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {/* Static Soft Outer Track */}
          <circle
            cx="170"
            cy="170"
            r="158"
            fill="none"
            stroke="#38D9F5"
            strokeOpacity="0.16"
            strokeWidth="1.25"
          />

          {/* Primary Outer Ring — Gentle Clockwise Rotation */}
          <motion.g
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    repeat: Infinity,
                    ease: 'linear',
                    duration: highlightMode ? 16 : 34,
                  }
            }
            style={{ originX: '170px', originY: '170px', transformBox: 'view-box' }}
          >
            <circle
              cx="170"
              cy="170"
              r="150"
              fill="none"
              stroke="#38D9F5"
              strokeOpacity="0.65"
              strokeWidth="2.5"
              strokeDasharray="115 22 56 22 115 22"
              strokeLinecap="round"
            />
            <circle cx="170" cy="20" r="3" fill="#38D9F5" fillOpacity="0.85" />
            <circle cx="320" cy="170" r="3" fill="#38D9F5" fillOpacity="0.85" />
            <circle cx="170" cy="320" r="3" fill="#38D9F5" fillOpacity="0.85" />
            <circle cx="20" cy="170" r="3" fill="#38D9F5" fillOpacity="0.85" />
          </motion.g>

          {/* Secondary Inner Ring — Gentle Counter-Clockwise Rotation */}
          <motion.g
            animate={prefersReducedMotion ? undefined : { rotate: -360 }}
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    repeat: Infinity,
                    ease: 'linear',
                    duration: highlightMode ? 12 : 26,
                  }
            }
            style={{ originX: '170px', originY: '170px', transformBox: 'view-box' }}
          >
            <circle
              cx="170"
              cy="170"
              r="136"
              fill="none"
              stroke={highlightMode ? '#FB923C' : '#38D9F5'}
              strokeOpacity="0.45"
              strokeWidth="1.75"
              strokeDasharray="72 24 28 24"
              strokeLinecap="round"
            />
          </motion.g>
        </svg>

        {/* Portrait Medallion inside the Identity Disc */}
        <button
          type="button"
          onClick={handleToggleMode}
          onMouseEnter={playHover}
          aria-label="John Mathew B. Mauricio portrait inside interactive Identity Disc ring"
          className={`group relative h-52 w-52 overflow-hidden rounded-full border-2 bg-[#0D1928] transition-all duration-300 sm:h-60 sm:w-60 ${
            highlightMode
              ? 'border-[#FB923C]/65 shadow-neon-orange'
              : 'border-[#38D9F5]/45 shadow-neon-cyan hover:border-[#38D9F5]/75'
          }`}
        >
          <img
            src={portfolioData.identity.portraitUrl}
            alt="John Mathew B. Mauricio"
            className="h-full w-full scale-[1.06] object-cover object-[50%_38%] transition-transform duration-500 ease-snappy group-hover:scale-[1.1]"
          />
          {/* Soft Edge Vignette for Seamless Studio Blend */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 50% 44%, transparent 56%, rgba(7, 16, 27, 0.42) 84%, rgba(7, 16, 27, 0.85) 100%)',
            }}
          />
        </button>
      </div>

      {/* Clean, Subtle Caption */}
      <div className="mt-2 flex items-center justify-center gap-2 text-center font-mono text-xs text-[#A3BACB]">
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${
            highlightMode ? 'bg-[#FB923C]' : 'bg-[#38D9F5]'
          }`}
          aria-hidden="true"
        />
        <span>{portfolioData.identity.statusTelemetry}</span>
      </div>
    </div>
  );
}
