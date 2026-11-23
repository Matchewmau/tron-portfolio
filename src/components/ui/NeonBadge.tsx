import type { ReactNode } from 'react';
import type { AccentVariant } from '../../types/portfolio';

interface NeonBadgeProps {
  children: ReactNode;
  accent?: AccentVariant;
  pulse?: boolean;
  className?: string;
}

export function NeonBadge({
  children,
  accent = 'cyan',
  pulse = false,
  className = '',
}: NeonBadgeProps) {
  const isOrange = accent === 'orange';

  const styles = isOrange
    ? 'border-[#FB923C]/40 bg-[#FB923C]/12 text-[#FDBA74]'
    : 'border-[#38D9F5]/28 bg-[#38D9F5]/10 text-[#7CE7FA]';

  const dotColor = isOrange ? 'bg-[#FB923C]' : 'bg-[#38D9F5]';

  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1 font-mono text-xs font-medium tracking-wide clip-chamfer-sm ${styles} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-65 ${dotColor}`}
          />
          <span className={`relative inline-flex h-2 w-2 rounded-full ${dotColor}`} />
        </span>
      )}
      {children}
    </span>
  );
}
