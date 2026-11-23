import { createContext, useContext, type ReactNode } from 'react';
import { useTronAudio, type TronAudioControls } from '../hooks/useTronAudio';

const noop = () => {};

const TronAudioContext = createContext<TronAudioControls>({
  isEnabled: false,
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
