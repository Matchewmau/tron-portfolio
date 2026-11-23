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
        ? 'bg-[#FB923C]/25 hover:bg-[#FB923C]/50 focus-within:bg-[#FB923C]/50 hover:shadow-neon-orange'
        : 'bg-[#FB923C]/22'
      : interactive
        ? 'bg-[#38D9F5]/16 hover:bg-[#38D9F5]/40 focus-within:bg-[#38D9F5]/40 hover:shadow-neon-cyan'
        : 'bg-[#38D9F5]/15';

  const bracketColor = accent === 'orange' ? 'border-[#FB923C]/70' : 'border-[#38D9F5]/60';

  return (
    <div
      className={`group relative p-[1px] ${clipClass} ${borderShellColors} transition-all duration-200 ease-snappy ${className}`}
      {...rest}
    >
      <div
        className={`relative h-full w-full ${clipClass} hud-panel-surface overflow-hidden ${innerClassName}`}
      >
        {laserScan && <div className="laser-scan-line" aria-hidden="true" />}

        {/* Subtle Architectural Corner Accents */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 right-0 h-3 w-3 border-t border-r ${bracketColor} opacity-45 transition-opacity duration-200 group-hover:opacity-90`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l ${bracketColor} opacity-45 transition-opacity duration-200 group-hover:opacity-90`}
        />

        {children}
      </div>
    </div>
  );
}
