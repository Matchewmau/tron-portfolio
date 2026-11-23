import { createContext, createRef, useContext, type ReactNode } from 'react';
import { useTronAudio, type TronAudioControls } from '../hooks/useTronAudio';

const noop = () => {};
const defaultAnalyserRef = createRef<AnalyserNode | null>();

const TronAudioContext = createContext<TronAudioControls>({
  isEnabled: false,
  volume: 0.16,
  setVolume: noop,
  trackMode: 'mp3',
  analyserRef: defaultAnalyserRef,
  toggleAudio: noop,
  playHover: noop,
  playClick: noop,
  playTransmit: noop,
});

export function TronAudioProvider({ children }: { children: ReactNode }) {
  const audio = useTronAudio();
  return <TronAudioContext.Provider value={audio}>{children}</TronAudioContext.Provider>;
}

export function useAudioHud(): TronAudioControls {
  return useContext(TronAudioContext);
}
