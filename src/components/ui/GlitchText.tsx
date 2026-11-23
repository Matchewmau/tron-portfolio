import { useAudioHud } from '../../context/AudioContext';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'span';
  id?: string;
  intensity?: 'hero' | 'header';
  className?: string;
}

export function GlitchText({
  text,
  as: Tag = 'span',
  id,
  intensity = 'header',
  className = '',
}: GlitchTextProps) {
  const { isEnabled } = useAudioHud();

  const glitchModeClass =
    intensity === 'hero'
      ? isEnabled
        ? 'tron-glitch tron-glitch-hero tron-glitch-synced'
        : 'tron-glitch tron-glitch-hero'
      : isEnabled
        ? 'tron-glitch tron-glitch-header tron-glitch-synced'
        : 'tron-glitch tron-glitch-header';

  return (
    <Tag id={id} data-text={text} className={`${glitchModeClass} ${className}`}>
      {text}
    </Tag>
  );
}
