import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useAudioHud } from '../../context/AudioContext';

export function IdentityDisc() {
  const prefersReducedMotion = useReducedMotion();
  const { playHover, playClick } = useAudioHud();
  const [overclocked, setOverclocked] = useState(false);

  const handleToggleOverclock = () => {
    playClick();
    setOverclocked((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Ambient Neon Halo */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute h-64 w-64 rounded-full blur-3xl transition-all duration-500 sm:h-80 sm:w-80 ${
          overclocked ? 'bg-[#FF6B00]/20' : 'bg-[#00F0FF]/15'
        }`}
      />

      <button
        type="button"
        onClick={handleToggleOverclock}
        onMouseEnter={playHover}
        aria-label={
          overclocked
            ? 'Identity Disc in Prestige Rinzler telemetry mode. Click to switch to User Cyan mode.'
            : 'Interactive Tron Identity Disc. Click to toggle Prestige telemetry pulse.'
        }
        className="group relative flex h-64 w-64 items-center justify-center rounded-full focus-visible:outline-[#00F0FF] sm:h-80 sm:w-80"
      >
        <svg
          viewBox="0 0 320 320"
          className="h-full w-full overflow-visible drop-shadow-[0_0_18px_rgba(0,240,255,0.4)]"
          role="img"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="discCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#07131D" stopOpacity="0.9" />
              <stop offset="72%" stopColor="#02060B" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.22" />
            </radialGradient>
          </defs>

          {/* Static Outer Chassis Ring */}
          <circle
            cx="160"
            cy="160"
            r="148"
            fill="url(#discCoreGlow)"
            stroke="#00F0FF"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />

          {/* Primary Outer Ring — Clockwise Rotation */}
          <motion.g
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    repeat: Infinity,
                    ease: 'linear',
                    duration: overclocked ? 9 : 22,
                  }
            }
            style={{ originX: '160px', originY: '160px', transformBox: 'view-box' }}
          >
            <circle
              cx="160"
              cy="160"
              r="138"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="4"
              strokeDasharray="110 18 54 18 110 18"
              strokeLinecap="round"
            />
            <circle
              cx="160"
              cy="160"
              r="128"
              fill="none"
              stroke="#00F0FF"
              strokeOpacity="0.55"
              strokeWidth="1.25"
              strokeDasharray="6 10"
            />
            {/* Cardinal Emitter Nodes */}
            <circle cx="160" cy="22" r="4" fill="#00F0FF" />
            <circle cx="298" cy="160" r="4" fill="#00F0FF" />
            <circle cx="160" cy="298" r="4" fill="#00F0FF" />
            <circle cx="22" cy="160" r="4" fill="#00F0FF" />
          </motion.g>

          {/* Secondary Inner Ring — Counter-Clockwise Rotation */}
          <motion.g
            animate={prefersReducedMotion ? undefined : { rotate: -360 }}
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    repeat: Infinity,
                    ease: 'linear',
                    duration: overclocked ? 6.5 : 15,
                  }
            }
            style={{ originX: '160px', originY: '160px', transformBox: 'view-box' }}
          >
            <circle
              cx="160"
              cy="160"
              r="106"
              fill="none"
              stroke={overclocked ? '#FF6B00' : '#00F0FF'}
              strokeWidth="3"
              strokeDasharray="68 24 32 24"
            />
            <circle
              cx="160"
              cy="160"
              r="94"
              fill="none"
              stroke="#00F0FF"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeDasharray="20 12 4 12"
            />
          </motion.g>

          {/* Prestige ECAI / CSC Inner Accent Ring */}
          <circle
            cx="160"
            cy="160"
            r="74"
            fill="none"
            stroke="#FF6B00"
            strokeOpacity={overclocked ? '0.95' : '0.65'}
            strokeWidth="2"
            strokeDasharray="36 14"
          />

          {/* Inner Core Reticle */}
          <circle
            cx="160"
            cy="160"
            r="56"
            fill="#02060B"
            stroke="#00F0FF"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
          <line
            x1="160"
            y1="96"
            x2="160"
            y2="112"
            stroke="#00F0FF"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
          <line
            x1="160"
            y1="208"
            x2="160"
            y2="224"
            stroke="#00F0FF"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
          <line
            x1="96"
            y1="160"
            x2="112"
            y2="160"
            stroke="#00F0FF"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
          <line
            x1="208"
            y1="160"
            x2="224"
            y2="160"
            stroke="#00F0FF"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
        </svg>

        {/* Center Identity Readout */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8BAEC4]">
            {overclocked ? 'ECAI_2026' : 'ID_DISC'}
          </span>
          <span
            className={`mt-0.5 font-display text-lg font-black tracking-widest transition-colors duration-200 sm:text-xl ${
              overclocked ? 'text-[#FF6B00]' : 'text-[#00F0FF]'
            }`}
          >
            J.M.M.
          </span>
          <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[#00F0FF]/80">
            {overclocked ? 'SYNC: MAX' : 'USER_01'}
          </span>
        </div>
      </button>

      {/* Subtle Interactive Telemetry Caption */}
      <div className="mt-3 flex items-center justify-center gap-2 text-center font-mono text-[10px] uppercase tracking-wider text-[#8BAEC4] sm:text-[11px] sm:tracking-widest">
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
            overclocked ? 'bg-[#FF6B00]' : 'bg-[#00F0FF]'
          }`}
        />
        <span>
          {overclocked
            ? 'DISC_STATE // PRESTIGE_OVERCLOCK'
            : 'DISC_STATE // DUAL_RING_NOMINAL [CLICK]'}
        </span>
      </div>
    </div>
  );
}
