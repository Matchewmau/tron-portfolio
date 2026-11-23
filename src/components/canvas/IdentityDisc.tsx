import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import tronDiscImg from '../../assets/tron-disc-clean.png';
import { useAudioHud } from '../../context/AudioContext';
import { portfolioData } from '../../data/portfolioData';

export function IdentityDisc() {
  const prefersReducedMotion = useReducedMotion();
  const { isEnabled, analyserRef, playHover, playClick } = useAudioHud();
  const [highlightMode, setHighlightMode] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const discCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleToggleMode = () => {
    playClick();
    setHighlightMode((prev) => !prev);
  };

  // Concentric, Calm Outer-Border Synthwave Ribbon Synced at the Same Smooth Pace as Background Synthwave
  useEffect(() => {
    const container = containerRef.current;
    const canvas = discCanvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId = 0;
    let phase = 0;
    let logicalSize = container.offsetWidth || 380;

    const freqData = new Uint8Array(256);
    const timeData = new Uint8Array(512);
    let smoothedBass = 0;
    let smoothedMid = 0;

    const syncCanvasSize = () => {
      // Use offsetWidth (untransformed CSS layout pixels) so entrance scale animations never shift the center
      const nextSize = container.offsetWidth || 380;
      logicalSize = nextSize;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(nextSize * dpr);
      canvas.height = Math.round(nextSize * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    syncCanvasSize();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => syncCanvasSize())
        : null;
    resizeObserver?.observe(container);
    window.addEventListener('resize', syncCanvasSize, { passive: true });

    const draw = () => {
      const size = logicalSize;
      const cx = size * 0.5;
      const cy = size * 0.5;

      ctx.clearRect(0, 0, size, size);

      const analyser = analyserRef.current;
      let rawBass = 0;
      let rawMid = 0;

      if (isEnabled && analyser) {
        analyser.getByteFrequencyData(freqData);
        analyser.getByteTimeDomainData(timeData);

        let bassSum = 0;
        for (let i = 0; i < 8; i++) bassSum += freqData[i];
        rawBass = bassSum / (8 * 255);

        let midSum = 0;
        for (let i = 8; i < 42; i++) midSum += freqData[i];
        rawMid = midSum / (34 * 255);
      }

      // Smooth envelope so the disc border wave moves calmly and fluidly
      smoothedBass = smoothedBass * 0.84 + rawBass * 0.16;
      smoothedMid = smoothedMid * 0.86 + rawMid * 0.14;

      // Disc image is 74% of container, and outer blade inside tron-disc-clean.png is at 83.9% of image radius:
      // 0.5 * 0.74 * 0.839 = 0.3104 * size
      const discBladeR = size * 0.312;

      // 1. Soft Concentric Ambient Halo Around the Disc
      const haloR = discBladeR * (1.38 + smoothedBass * 0.14);
      const haloGrad = ctx.createRadialGradient(cx, cy, discBladeR * 0.92, cx, cy, haloR);
      if (highlightMode) {
        haloGrad.addColorStop(0, 'rgba(251, 146, 60, 0)');
        haloGrad.addColorStop(
          0.45,
          `rgba(251, 146, 60, ${(0.12 + smoothedBass * 0.18).toFixed(3)})`
        );
        haloGrad.addColorStop(1, 'rgba(7, 16, 27, 0)');
      } else {
        haloGrad.addColorStop(0, 'rgba(56, 217, 245, 0)');
        haloGrad.addColorStop(
          0.45,
          `rgba(56, 217, 245, ${(0.12 + smoothedBass * 0.2).toFixed(3)})`
        );
        haloGrad.addColorStop(
          0.75,
          `rgba(251, 146, 60, ${(0.03 + smoothedMid * 0.08).toFixed(3)})`
        );
        haloGrad.addColorStop(1, 'rgba(7, 16, 27, 0)');
      }
      ctx.fillStyle = haloGrad;
      ctx.fillRect(0, 0, size, size);

      // 2. Smooth Flowing Polar Synthwave Ribbons Outside the Disc Border (Same Calm Feel as Background Wave)
      const drawSmoothPolarWave = (
        baseRadius: number,
        waveAmp: number,
        audioScale: number,
        strokeColor: string,
        lineWidth: number,
        speedMult: number,
        lobes: number
      ) => {
        const segments = 160;
        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;

        for (let s = 0; s <= segments; s++) {
          const t = s / segments;
          const theta = t * Math.PI * 2 - Math.PI / 2;
          // Symmetric wrap [0 -> 1 -> 0] so the closed wave loop is completely seamless
          const symT = t <= 0.5 ? t * 2 : (1 - t) * 2;

          let audioOffset = 0;
          if (isEnabled && analyser && audioScale > 0) {
            // Smooth 5-sample neighborhood average from timeData so the ribbon is silky, never jagged
            const centerIdx = Math.floor(symT * (timeData.length - 1));
            let sum = 0;
            let count = 0;
            for (let k = -2; k <= 2; k++) {
              const idx = Math.max(0, Math.min(timeData.length - 1, centerIdx + k));
              sum += (timeData[idx] - 128) / 128;
              count++;
            }
            audioOffset = (sum / count) * 14 * audioScale;
          }

          const gentleWave =
            Math.sin(theta * lobes + phase * speedMult) * waveAmp +
            Math.cos(theta * (lobes + 2) - phase * speedMult * 0.7) * (waveAmp * 0.45);

          const r = baseRadius + (gentleWave + audioOffset) * (size / 390);
          const x = cx + Math.cos(theta) * r;
          const y = cy + Math.sin(theta) * r;

          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.stroke();
      };

      // Primary Cyan Synthwave Ribbon Hugging Outside the Disc Border
      drawSmoothPolarWave(
        discBladeR * 1.07,
        isEnabled ? 4.5 + smoothedBass * 11 : 3.2,
        1.0,
        highlightMode
          ? 'rgba(251, 146, 60, 0.68)'
          : isEnabled
            ? 'rgba(82, 236, 255, 0.72)'
            : 'rgba(56, 217, 245, 0.36)',
        isEnabled ? 1.9 : 1.35,
        1.0,
        4
      );

      // Secondary Counter-Flowing Cyan Harmonic Ribbon
      drawSmoothPolarWave(
        discBladeR * 1.14,
        isEnabled ? 3.5 + smoothedMid * 9 : 2.4,
        0.65,
        isEnabled ? 'rgba(124, 238, 255, 0.38)' : 'rgba(56, 217, 245, 0.18)',
        1.25,
        -0.8,
        6
      );

      // Subtle Outer Warm Amber Synthwave Accent Ribbon
      drawSmoothPolarWave(
        discBladeR * 1.21,
        isEnabled ? 3.0 + smoothedBass * 8 : 2.0,
        0.45,
        isEnabled ? 'rgba(251, 146, 60, 0.34)' : 'rgba(251, 146, 60, 0.14)',
        1.05,
        0.6,
        5
      );

      if (!prefersReducedMotion) {
        // Calm, liquid phase progression matching the background synthwave speed
        phase += isEnabled ? 0.022 + smoothedBass * 0.025 : 0.009;
        frameId = window.requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', syncCanvasSize);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [analyserRef, highlightMode, isEnabled, prefersReducedMotion]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Single Unified Square Coordinate Container: Canvas, Portrait & Disc Share Exact (50%, 50%) Center */}
      <div
        ref={containerRef}
        className="relative flex h-[20.5rem] w-[20.5rem] items-center justify-center sm:h-[23.5rem] sm:w-[23.5rem]"
      >
        {/* Concentric Outer-Border Synthwave Canvas (Exact 100% x 100% of Container) */}
        <canvas
          ref={discCanvasRef}
          aria-hidden="true"
          data-testid="disc-synthwave-canvas"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        />

        <button
          type="button"
          onClick={handleToggleMode}
          onMouseEnter={playHover}
          aria-label="John Mathew B. Mauricio portrait framed inside interactive Tron Identity Disc"
          className="group relative z-10 flex h-full w-full items-center justify-center rounded-full focus-visible:outline-[#38D9F5]"
        >
          {/* Larger Center Portrait Core (44% of container = ~166px, tucked seamlessly behind the sleeker 74% disc bezel) */}
          <div className="relative z-0 h-[44%] w-[44%] overflow-hidden rounded-full bg-[#07101B]">
            <img
              src={portfolioData.identity.portraitUrl}
              alt="John Mathew B. Mauricio"
              className="h-full w-full scale-[1.06] object-cover object-[50%_38%] transition-transform duration-500 ease-snappy group-hover:scale-[1.11]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_14px_rgba(4,10,18,0.75)]"
              style={{
                background:
                  'radial-gradient(circle at 50% 44%, transparent 64%, rgba(7, 16, 27, 0.45) 100%)',
              }}
            />
          </div>

          {/* Scaled-Down Sleek Authentic Tron Identity Disc (74% of container, dead-center) */}
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
                    duration: highlightMode ? 22 : 52,
                  }
            }
            className={`pointer-events-none absolute inset-[13%] z-10 h-[74%] w-[74%] select-none object-contain transition-all duration-500 ${
              highlightMode
                ? 'drop-shadow-[0_0_18px_rgba(251,146,60,0.35)] hue-rotate-[165deg] saturate-150'
                : 'drop-shadow-[0_0_18px_rgba(56,217,245,0.25)]'
            }`}
          />
        </button>
      </div>

      {/* Status Caption */}
      <div className="mt-1 flex items-center justify-center gap-2 text-center font-mono text-xs text-[#C5DAE9]">
        <span
          className={`h-2 w-2 shrink-0 rounded-full shadow-[0_0_8px_currentColor] transition-colors duration-300 ${
            highlightMode ? 'bg-[#FB923C] text-[#FB923C]' : 'bg-[#38D9F5] text-[#38D9F5]'
          }`}
          aria-hidden="true"
        />
        <span>{portfolioData.identity.statusTelemetry}</span>
      </div>
    </div>
  );
}
