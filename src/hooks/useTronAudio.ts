import { useCallback, useRef, useState } from 'react';

export interface TronAudioControls {
  isEnabled: boolean;
  toggleAudio: () => void;
  playHover: () => void;
  playClick: () => void;
  playTransmit: () => void;
}

type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

export function useTronAudio(): TronAudioControls {
  const [isEnabled, setIsEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastHoverTimeRef = useRef<number>(0);

  const ensureContext = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;

    const AudioCtx =
      window.AudioContext || (window as WindowWithWebkitAudio).webkitAudioContext;
    if (!AudioCtx) return null;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }

    if (audioCtxRef.current.state === 'suspended') {
      void audioCtxRef.current.resume().catch(() => {
        // Ignore autoplay restrictions until direct user gesture
      });
    }

    return audioCtxRef.current;
  }, []);

  const triggerTone = useCallback(
    (
      ctx: AudioContext,
      startFreq: number,
      endFreq: number,
      durationSec: number,
      peakGain: number,
      type: OscillatorType = 'sine',
      delaySec = 0
    ) => {
      const now = ctx.currentTime + delaySec;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 40), now + durationSec);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + durationSec + 0.01);
    },
    []
  );

  const toggleAudio = useCallback(() => {
    setIsEnabled((prev) => {
      const next = !prev;
      if (next) {
        const ctx = ensureContext();
        if (ctx) {
          triggerTone(ctx, 660, 1320, 0.08, 0.045, 'triangle', 0);
          triggerTone(ctx, 1320, 1760, 0.09, 0.035, 'sine', 0.055);
        }
      }
      return next;
    });
  }, [ensureContext, triggerTone]);

  const playHover = useCallback(() => {
    if (!isEnabled) return;
    const nowMs = performance.now();
    if (nowMs - lastHoverTimeRef.current < 55) return;
    lastHoverTimeRef.current = nowMs;

    const ctx = ensureContext();
    if (!ctx) return;
    triggerTone(ctx, 1180, 1560, 0.035, 0.02, 'sine');
  }, [ensureContext, isEnabled, triggerTone]);

  const playClick = useCallback(() => {
    if (!isEnabled) return;
    const ctx = ensureContext();
    if (!ctx) return;
    triggerTone(ctx, 920, 460, 0.065, 0.045, 'triangle');
  }, [ensureContext, isEnabled, triggerTone]);

  const playTransmit = useCallback(() => {
    if (!isEnabled) return;
    const ctx = ensureContext();
    if (!ctx) return;
    triggerTone(ctx, 520, 780, 0.07, 0.045, 'triangle', 0);
    triggerTone(ctx, 780, 1170, 0.08, 0.045, 'triangle', 0.065);
    triggerTone(ctx, 1170, 1560, 0.12, 0.05, 'sine', 0.13);
  }, [ensureContext, isEnabled, triggerTone]);

  return {
    isEnabled,
    toggleAudio,
    playHover,
    playClick,
    playTransmit,
  };
}
