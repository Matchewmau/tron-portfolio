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
        ? 'bg-[#FB923C] shadow-neon-orange hover:shadow-neon-orange-strong'
        : 'bg-[#38D9F5] shadow-neon-cyan hover:shadow-neon-cyan-strong'
      : variant === 'outline'
        ? isOrange
          ? 'bg-[#FB923C]/40 hover:bg-[#FB923C]/80 hover:shadow-neon-orange'
          : 'bg-[#38D9F5]/30 hover:bg-[#38D9F5]/75 hover:shadow-neon-cyan'
        : 'bg-transparent hover:bg-[#38D9F5]/20';

  const innerSurface =
    variant === 'solid'
      ? isOrange
        ? 'bg-[#FB923C] text-[#07101B] font-semibold hover:bg-[#fda256]'
        : 'bg-[#38D9F5] text-[#07101B] font-semibold hover:bg-[#5ee2f8]'
      : variant === 'outline'
        ? isOrange
          ? 'bg-[#0D1928]/90 text-[#FDBA74] hover:bg-[#FB923C]/12'
          : 'bg-[#0D1928]/90 text-[#E6F4FA] hover:bg-[#38D9F5]/12 hover:text-[#38D9F5]'
        : 'bg-transparent text-[#F1F6FA] hover:text-[#38D9F5]';

  const sharedClasses = `inline-flex min-h-[44px] max-w-full items-center justify-center p-[1px] clip-chamfer-sm transition-all duration-150 ease-snappy select-none cursor-pointer ${outerShell} ${className}`;
  const innerClasses = `inline-flex h-full min-h-[42px] w-full items-center justify-center gap-2 px-4 sm:px-5 py-2.5 clip-chamfer-sm font-sans text-sm font-medium tracking-wide text-center transition-colors duration-150 ease-snappy ${innerSurface}`;

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
