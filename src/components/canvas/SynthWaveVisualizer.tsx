import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useAudioHud } from '../../context/AudioContext';

export function SynthWaveVisualizer() {
  const prefersReducedMotion = useReducedMotion();
  const { isEnabled, analyserRef } = useAudioHud();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let phase = 0;

    const freqData = new Uint8Array(256);
    const timeData = new Uint8Array(512);
    const smoothedBars = new Float32Array(72);

    const canvasHeight = 380;
    // Place baseline at 66% of the 380px canvas so bars have ~250px of open upward room above the horizon
    const baselineRatio = 0.66;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(canvasHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const renderFrame = () => {
      const width = window.innerWidth;
      const horizonY = canvasHeight * baselineRatio;

      ctx.clearRect(0, 0, width, canvasHeight);

      const analyser = analyserRef.current;
      let bassEnergy = 0;
      let midEnergy = 0;

      if (isEnabled && analyser) {
        analyser.getByteFrequencyData(freqData);
        analyser.getByteTimeDomainData(timeData);

        let bassSum = 0;
        for (let i = 0; i < 8; i++) bassSum += freqData[i];
        bassEnergy = bassSum / (8 * 255);

        let midSum = 0;
        for (let i = 8; i < 44; i++) midSum += freqData[i];
        midEnergy = midSum / (36 * 255);
      }

      // 1. Open-to-View Mirrored Horizon Synthwave Bars (Active upward motion both ambiently and with music!)
      const barCount = Math.min(58, Math.max(24, Math.floor(width / 15)));
      const halfWidth = width * 0.49;
      const stepX = halfWidth / barCount;

      for (let i = 0; i < barCount; i++) {
        const normIndex = i / Math.max(1, barCount - 1);

        let targetVal: number;
        if (isEnabled && analyser) {
          const binIndex = Math.min(
            freqData.length - 1,
            Math.floor(Math.pow(normIndex, 1.55) * 108)
          );
          // Boost curve so mid & bass hits push the bars noticeably higher upward
          const rawNorm = freqData[binIndex] / 255;
          targetVal = Math.min(1, Math.pow(rawNorm, 0.78) * 1.18);
        } else {
          // Always open to view as part of the background: active rolling dual-sine synthwave motion
          const waveA = Math.sin(normIndex * 7.5 - phase * 1.6) * 0.5 + 0.5;
          const waveB = Math.cos(normIndex * 13.0 + phase * 1.15) * 0.5 + 0.5;
          targetVal = 0.14 + (waveA * 0.6 + waveB * 0.4) * 0.38;
        }

        smoothedBars[i] =
          targetVal > smoothedBars[i]
            ? smoothedBars[i] * 0.3 + targetVal * 0.7
            : smoothedBars[i] * 0.84 + targetVal * 0.16;

        const value = smoothedBars[i];
        const fadeOutward = 1 - normIndex * 0.52;
        const maxUpwardPx = isEnabled ? 178 : 88;
        const upHeight = Math.max(3, value * maxUpwardPx * fadeOutward);
        const downReflection = upHeight * 0.22;

        const alpha = (isEnabled ? 0.2 + value * 0.58 : 0.15 + value * 0.38) * fadeOutward;
        const isWarmPeak = value > 0.68 || (i % 9 === 0 && value > 0.42);

        const barGrad = ctx.createLinearGradient(0, horizonY - upHeight, 0, horizonY + downReflection);
        if (isWarmPeak) {
          barGrad.addColorStop(0, `rgba(251, 146, 60, ${(alpha * 0.95).toFixed(3)})`);
          barGrad.addColorStop(0.75, `rgba(82, 236, 255, ${(alpha * 0.8).toFixed(3)})`);
          barGrad.addColorStop(1, 'rgba(56, 217, 245, 0.04)');
        } else {
          barGrad.addColorStop(0, `rgba(140, 244, 255, ${(alpha * 0.95).toFixed(3)})`);
          barGrad.addColorStop(0.7, `rgba(56, 217, 245, ${(alpha * 0.75).toFixed(3)})`);
          barGrad.addColorStop(1, 'rgba(56, 217, 245, 0.04)');
        }

        ctx.fillStyle = barGrad;

        const offset = i * stepX;
        const barWidth = Math.max(2.2, stepX * 0.46);

        ctx.fillRect(width * 0.5 + offset, horizonY - upHeight, barWidth, upHeight + downReflection);
        if (i > 0) {
          ctx.fillRect(
            width * 0.5 - offset,
            horizonY - upHeight,
            barWidth,
            upHeight + downReflection
          );
        }
      }

      // 2. Open-to-View Flowing Synthwave Ribbons Rising Above the Horizon
      const waveConfigs = [
        {
          color: isEnabled ? 'rgba(103, 240, 255, 0.68)' : 'rgba(82, 236, 255, 0.36)',
          lineWidth: isEnabled ? 2.1 : 1.5,
          freq: 0.0058,
          speed: 1.0,
          ampBase: isEnabled ? 18 + bassEnergy * 52 : 16,
          yShift: -12,
        },
        {
          color: isEnabled ? 'rgba(56, 217, 245, 0.38)' : 'rgba(56, 217, 245, 0.20)',
          lineWidth: 1.3,
          freq: 0.0092,
          speed: -1.25,
          ampBase: isEnabled ? 14 + midEnergy * 42 : 11,
          yShift: -6,
        },
        {
          color: isEnabled ? 'rgba(251, 146, 60, 0.36)' : 'rgba(251, 146, 60, 0.16)',
          lineWidth: 1.15,
          freq: 0.0044,
          speed: 0.7,
          ampBase: isEnabled ? 11 + bassEnergy * 34 : 8,
          yShift: -3,
        },
      ];

      const sampleStep = 6;
      waveConfigs.forEach((wave, waveIdx) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.lineWidth;

        for (let x = 0; x <= width; x += sampleStep) {
          const normX = x / width;
          const edgeEnvelope = Math.sin(normX * Math.PI);

          let timeDomainOffset = 0;
          if (isEnabled && analyser && waveIdx === 0) {
            const sampleIdx = Math.min(
              timeData.length - 1,
              Math.floor(normX * (timeData.length - 1))
            );
            timeDomainOffset = ((timeData[sampleIdx] - 128) / 128) * 38;
          }

          const harmonicY =
            Math.sin(x * wave.freq + phase * wave.speed) * wave.ampBase +
            Math.cos(x * wave.freq * 1.8 - phase * 0.7) * (wave.ampBase * 0.4);

          const y = horizonY + wave.yShift + (harmonicY + timeDomainOffset) * edgeEnvelope;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      if (!prefersReducedMotion) {
        phase += isEnabled ? 0.032 + bassEnergy * 0.045 : 0.018;
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [analyserRef, isEnabled, prefersReducedMotion]);

  // Baseline sits at 66% of 380px (= 250.8px); offsetting top-[56%] by -251px locks the wave baseline directly onto the 56% grid horizon!
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="synth-wave-canvas"
      className="pointer-events-none absolute inset-x-0 top-[56%] h-[380px] w-full -translate-y-[251px]"
    />
  );
}
