import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

export interface TronAudioControls {
  isEnabled: boolean;
  volume: number;
  setVolume: (nextVolume: number) => void;
  trackMode: 'mp3' | 'synth';
  analyserRef: RefObject<AnalyserNode | null>;
  toggleAudio: () => void;
  playHover: () => void;
  playClick: () => void;
  playTransmit: () => void;
}

type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

// Gentle default background volume (~16% gain so music is soft and unobtrusive)
const DEFAULT_VOLUME = 0.16;

const STEP_DURATION_SEC = 60 / 116 / 4;
const midiToFreq = (midi: number): number => 440 * Math.pow(2, (midi - 69) / 12);
const BASS_ROOTS_MIDI = [29, 25, 32, 27];
const BASS_RHYTHM = [1, 0, 2, 1, 0, 2, 1, 0, 1, 0, 2, 0, 1, 2, 0, 2];
const LEAD_MELODY: Array<number | null> = [
  65, null, 68, null, 72, 70, 68, null, 65, null, 68, null, 67, null, 65, null,
  65, null, 68, null, 73, 72, 68, null, 65, null, 68, null, 70, null, 68, null,
  68, null, 72, null, 75, 73, 72, null, 68, null, 72, null, 70, null, 68, null,
  67, null, 70, null, 75, 73, 70, null, 67, null, 70, 68, 67, null, 63, null,
];

function getEndOfLineTrackUrl(): string {
  const baseUrl = import.meta.env?.BASE_URL ?? '/';
  return `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}audio/end-of-line.mp3`;
}

export function useTronAudio(): TronAudioControls {
  const [isEnabled, setIsEnabled] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [trackMode, setTrackMode] = useState<'mp3' | 'synth'>('mp3');

  const volumeRef = useRef<number>(DEFAULT_VOLUME);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const outputGainRef = useRef<GainNode | null>(null);

  const mp3AudioRef = useRef<HTMLAudioElement | null>(null);
  const mp3SourceConnectedRef = useRef(false);

  const schedulerTimerRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const currentStepRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const lastHoverTimeRef = useRef<number>(0);

  // Audio Graph: Source -> AnalyserNode (full signal for crisp visuals) -> outputGain (low speaker volume) -> destination
  const ensureAudioGraph = useCallback((): {
    ctx: AudioContext;
    analyser: AnalyserNode;
    outputGain: GainNode;
  } | null => {
    if (typeof window === 'undefined') return null;

    const AudioCtx =
      window.AudioContext || (window as WindowWithWebkitAudio).webkitAudioContext;
    if (!AudioCtx) return null;

    if (!audioCtxRef.current) {
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;

      const outputGain = ctx.createGain();
      outputGain.gain.setValueAtTime(0.0001, ctx.currentTime);

      analyser.connect(outputGain);
      outputGain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      outputGainRef.current = outputGain;
    }

    if (audioCtxRef.current.state === 'suspended') {
      void audioCtxRef.current.resume().catch(() => {});
    }

    if (!analyserRef.current || !outputGainRef.current) return null;

    return {
      ctx: audioCtxRef.current,
      analyser: analyserRef.current,
      outputGain: outputGainRef.current,
    };
  }, []);

  const setVolume = useCallback((nextVol: number) => {
    const clamped = Math.max(0.01, Math.min(0.6, nextVol));
    volumeRef.current = clamped;
    setVolumeState(clamped);

    const ctx = audioCtxRef.current;
    const outputGain = outputGainRef.current;
    if (ctx && outputGain && isPlayingRef.current) {
      outputGain.gain.cancelScheduledValues(ctx.currentTime);
      outputGain.gain.setValueAtTime(outputGain.gain.value, ctx.currentTime);
      outputGain.gain.linearRampToValueAtTime(clamped, ctx.currentTime + 0.08);
    }
  }, []);

  const scheduleSynthStep = useCallback(
    (ctx: AudioContext, dest: AudioNode, stepIndex: number, time: number) => {
      const stepInBar = stepIndex % 16;
      const barIndex = Math.floor(stepIndex / 16) % 4;

      if (stepInBar % 4 === 0) {
        const kickOsc = ctx.createOscillator();
        const kickGain = ctx.createGain();
        kickOsc.type = 'sine';
        kickOsc.frequency.setValueAtTime(135, time);
        kickOsc.frequency.exponentialRampToValueAtTime(42, time + 0.11);
        kickGain.gain.setValueAtTime(0.5, time);
        kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
        kickOsc.connect(kickGain);
        kickGain.connect(dest);
        kickOsc.start(time);
        kickOsc.stop(time + 0.19);
      }

      const bassHit = BASS_RHYTHM[stepInBar];
      if (bassHit > 0) {
        const rootMidi = BASS_ROOTS_MIDI[barIndex];
        const freq = midiToFreq(bassHit === 2 ? rootMidi + 12 : rootMidi);
        const bassOsc = ctx.createOscillator();
        const bassFilter = ctx.createBiquadFilter();
        const bassGain = ctx.createGain();

        bassOsc.type = 'sawtooth';
        bassOsc.frequency.setValueAtTime(freq, time);
        bassFilter.type = 'lowpass';
        bassFilter.Q.setValueAtTime(4.0, time);
        bassFilter.frequency.setValueAtTime(860, time);
        bassFilter.frequency.exponentialRampToValueAtTime(160, time + STEP_DURATION_SEC * 0.9);

        bassGain.gain.setValueAtTime(0.001, time);
        bassGain.gain.linearRampToValueAtTime(0.32, time + 0.01);
        bassGain.gain.exponentialRampToValueAtTime(0.001, time + STEP_DURATION_SEC * 0.95);

        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(dest);
        bassOsc.start(time);
        bassOsc.stop(time + STEP_DURATION_SEC);
      }

      const leadMidi = LEAD_MELODY[stepIndex % LEAD_MELODY.length];
      if (leadMidi !== null) {
        const leadFreq = midiToFreq(leadMidi);
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const leadGain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(leadFreq, time);
        filter.type = 'lowpass';
        filter.Q.setValueAtTime(2.2, time);
        filter.frequency.setValueAtTime(2400, time);
        filter.frequency.exponentialRampToValueAtTime(680, time + STEP_DURATION_SEC * 1.5);

        leadGain.gain.setValueAtTime(0.001, time);
        leadGain.gain.linearRampToValueAtTime(0.16, time + 0.012);
        leadGain.gain.exponentialRampToValueAtTime(0.001, time + STEP_DURATION_SEC * 1.65);

        osc.connect(filter);
        filter.connect(leadGain);
        leadGain.connect(dest);
        osc.start(time);
        osc.stop(time + STEP_DURATION_SEC * 1.7);
      }
    },
    []
  );

  const stopSynthScheduler = useCallback(() => {
    if (schedulerTimerRef.current !== null) {
      window.clearInterval(schedulerTimerRef.current);
      schedulerTimerRef.current = null;
    }
  }, []);

  const startSynthScheduler = useCallback(
    (ctx: AudioContext, analyser: AnalyserNode) => {
      stopSynthScheduler();
      nextNoteTimeRef.current = ctx.currentTime + 0.05;

      schedulerTimerRef.current = window.setInterval(() => {
        if (!isPlayingRef.current) return;
        while (nextNoteTimeRef.current < ctx.currentTime + 0.18) {
          scheduleSynthStep(ctx, analyser, currentStepRef.current, nextNoteTimeRef.current);
          nextNoteTimeRef.current += STEP_DURATION_SEC;
          currentStepRef.current = (currentStepRef.current + 1) % 64;
        }
      }, 40);
    },
    [scheduleSynthStep, stopSynthScheduler]
  );

  const startSoundtrack = useCallback(() => {
    const graph = ensureAudioGraph();
    if (!graph) return;
    const { ctx, analyser, outputGain } = graph;

    isPlayingRef.current = true;
    stopSynthScheduler();

    outputGain.gain.cancelScheduledValues(ctx.currentTime);
    outputGain.gain.setValueAtTime(Math.max(outputGain.gain.value, 0.0005), ctx.currentTime);
    outputGain.gain.linearRampToValueAtTime(volumeRef.current, ctx.currentTime + 0.45);

    if (typeof Audio !== 'undefined' && typeof ctx.createMediaElementSource === 'function') {
      try {
        if (!mp3AudioRef.current) {
          const audioEl = new Audio(getEndOfLineTrackUrl());
          audioEl.loop = true;
          audioEl.preload = 'auto';
          mp3AudioRef.current = audioEl;
        }

        if (!mp3SourceConnectedRef.current && mp3AudioRef.current) {
          const mediaSource = ctx.createMediaElementSource(mp3AudioRef.current);
          mediaSource.connect(analyser);
          mp3SourceConnectedRef.current = true;
        }

        const playPromise = mp3AudioRef.current.play();
        setTrackMode('mp3');

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            if (isPlayingRef.current) {
              setTrackMode('synth');
              startSynthScheduler(ctx, analyser);
            }
          });
        }
        return;
      } catch {
        // Fallback to procedural Web Audio synth if MediaElementSource is unavailable
      }
    }

    setTrackMode('synth');
    startSynthScheduler(ctx, analyser);
  }, [ensureAudioGraph, startSynthScheduler, stopSynthScheduler]);

  const stopSoundtrack = useCallback(() => {
    isPlayingRef.current = false;
    stopSynthScheduler();

    if (mp3AudioRef.current) {
      mp3AudioRef.current.pause();
    }

    const ctx = audioCtxRef.current;
    const outputGain = outputGainRef.current;
    if (ctx && outputGain) {
      outputGain.gain.cancelScheduledValues(ctx.currentTime);
      outputGain.gain.setValueAtTime(Math.max(outputGain.gain.value, 0.0005), ctx.currentTime);
      outputGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
    }
  }, [stopSynthScheduler]);

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      stopSynthScheduler();
      if (mp3AudioRef.current) {
        mp3AudioRef.current.pause();
      }
    };
  }, [stopSynthScheduler]);

  const triggerSfxTone = useCallback(
    (
      startFreq: number,
      endFreq: number,
      durationSec: number,
      peakGain: number,
      type: OscillatorType = 'sine',
      delaySec = 0
    ) => {
      const graph = ensureAudioGraph();
      if (!graph) return;
      const { ctx } = graph;

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
    [ensureAudioGraph]
  );

  const toggleAudio = useCallback(() => {
    if (isPlayingRef.current) {
      stopSoundtrack();
      setIsEnabled(false);
    } else {
      startSoundtrack();
      setIsEnabled(true);
    }
  }, [startSoundtrack, stopSoundtrack]);

  const playHover = useCallback(() => {
    if (!isEnabled) return;
    const nowMs = performance.now();
    if (nowMs - lastHoverTimeRef.current < 65) return;
    lastHoverTimeRef.current = nowMs;
    triggerSfxTone(1180, 1520, 0.03, 0.008, 'sine');
  }, [isEnabled, triggerSfxTone]);

  const playClick = useCallback(() => {
    if (!isEnabled) return;
    triggerSfxTone(900, 460, 0.05, 0.016, 'triangle');
  }, [isEnabled, triggerSfxTone]);

  const playTransmit = useCallback(() => {
    if (!isEnabled) return;
    triggerSfxTone(520, 780, 0.065, 0.02, 'triangle', 0);
    triggerSfxTone(780, 1170, 0.075, 0.02, 'triangle', 0.06);
    triggerSfxTone(1170, 1560, 0.11, 0.024, 'sine', 0.12);
  }, [isEnabled, triggerSfxTone]);

  return {
    isEnabled,
    volume,
    setVolume,
    trackMode,
    analyserRef,
    toggleAudio,
    playHover,
    playClick,
    playTransmit,
  };
}
