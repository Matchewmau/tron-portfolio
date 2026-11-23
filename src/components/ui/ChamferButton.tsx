import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { useAudioHud } from '../../context/AudioContext';
import type { AccentVariant } from '../../types/portfolio';

type BaseProps = {
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  accent?: AccentVariant;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ChamferButtonProps = ButtonAsButton | ButtonAsAnchor;

export function ChamferButton(props: ChamferButtonProps) {
  const { playHover, playClick } = useAudioHud();
  const {
    children,
    variant = 'outline',
    accent = 'cyan',
    className = '',
    ...rest
  } = props;

  const isOrange = accent === 'orange';

  const outerShell =
    variant === 'solid'
      ? isOrange
        ? 'bg-[#FF6B00] shadow-neon-orange hover:shadow-neon-orange-strong'
        : 'bg-[#00F0FF] shadow-neon-cyan hover:shadow-neon-cyan-strong'
      : variant === 'outline'
        ? isOrange
          ? 'bg-[#FF6B00]/55 hover:bg-[#FF6B00] hover:shadow-neon-orange'
          : 'bg-[#00F0FF]/45 hover:bg-[#00F0FF] hover:shadow-neon-cyan'
        : 'bg-transparent hover:bg-[#00F0FF]/30';

  const innerSurface =
    variant === 'solid'
      ? isOrange
        ? 'bg-[#FF6B00] text-[#02060B] font-bold hover:bg-[#ff7f24]'
        : 'bg-[#00F0FF] text-[#02060B] font-bold hover:bg-[#3df4ff]'
      : variant === 'outline'
        ? isOrange
          ? 'bg-[#07131D]/90 text-[#FF6B00] hover:bg-[#FF6B00]/15'
          : 'bg-[#07131D]/90 text-[#00F0FF] hover:bg-[#00F0FF]/15'
        : 'bg-transparent text-[#E2F1F8] hover:text-[#00F0FF]';

  const sharedClasses = `inline-flex min-h-[44px] max-w-full items-center justify-center p-[1px] clip-chamfer-sm transition-all duration-150 ease-snappy select-none cursor-pointer ${outerShell} ${className}`;
  const innerClasses = `inline-flex h-full min-h-[42px] w-full items-center justify-center gap-2 px-4 sm:px-5 py-2.5 clip-chamfer-sm font-display text-xs uppercase tracking-wider sm:tracking-widest text-center transition-colors duration-150 ease-snappy ${innerSurface}`;

  if ('href' in props && props.href !== undefined) {
    const { onMouseEnter, onClick, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...anchorRest}
        href={props.href}
        onMouseEnter={(e) => {
          playHover();
          onMouseEnter?.(e);
        }}
        onClick={(e) => {
          playClick();
          onClick?.(e);
        }}
        className={sharedClasses}
      >
        <span className={innerClasses}>{children}</span>
      </a>
    );
  }

  const { onMouseEnter, onClick, type = 'button', ...buttonRest } =
    rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      {...buttonRest}
      type={type}
      onMouseEnter={(e) => {
        playHover();
        onMouseEnter?.(e);
      }}
      onClick={(e) => {
        playClick();
        onClick?.(e);
      }}
      className={sharedClasses}
    >
      <span className={innerClasses}>{children}</span>
    </button>
  );
}
