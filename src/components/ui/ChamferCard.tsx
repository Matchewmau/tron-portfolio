import type { HTMLAttributes, ReactNode } from 'react';
import type { AccentVariant } from '../../types/portfolio';

interface ChamferCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  accent?: AccentVariant;
  interactive?: boolean;
  laserScan?: boolean;
  size?: 'sm' | 'md' | 'lg';
  innerClassName?: string;
}

export function ChamferCard({
  children,
  accent = 'cyan',
  interactive = false,
  laserScan = false,
  size = 'md',
  className = '',
  innerClassName = '',
  ...rest
}: ChamferCardProps) {
  const clipClass =
    size === 'sm' ? 'clip-chamfer-sm' : size === 'lg' ? 'clip-chamfer-lg' : 'clip-chamfer';

  const borderShellColors =
    accent === 'orange'
      ? interactive
        ? 'bg-[#FF6B00]/35 hover:bg-[#FF6B00]/75 focus-within:bg-[#FF6B00]/75 hover:shadow-neon-orange'
        : 'bg-[#FF6B00]/35'
      : interactive
        ? 'bg-[#00F0FF]/25 hover:bg-[#00F0FF]/70 focus-within:bg-[#00F0FF]/70 hover:shadow-neon-cyan'
        : 'bg-[#00F0FF]/25';

  const bracketColor = accent === 'orange' ? 'border-[#FF6B00]' : 'border-[#00F0FF]';
  const bracketGlow =
    accent === 'orange'
      ? 'shadow-[0_0_10px_rgba(255,107,0,0.6)]'
      : 'shadow-[0_0_10px_rgba(0,240,255,0.55)]';

  return (
    <div
      className={`group relative p-[1px] ${clipClass} ${borderShellColors} transition-all duration-150 ease-snappy ${className}`}
      {...rest}
    >
      <div
        className={`relative h-full w-full ${clipClass} hud-panel-surface overflow-hidden ${innerClassName}`}
      >
        {laserScan && <div className="laser-scan-line" aria-hidden="true" />}

        {/* Top-Right & Bottom-Left HUD Corner Bracket Accents */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 right-0 h-3.5 w-3.5 border-t-2 border-r-2 ${bracketColor} ${bracketGlow} opacity-75 transition-opacity duration-150 group-hover:opacity-100`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-0 left-0 h-3.5 w-3.5 border-b-2 border-l-2 ${bracketColor} ${bracketGlow} opacity-75 transition-opacity duration-150 group-hover:opacity-100`}
        />

        {children}
      </div>
    </div>
  );
}
