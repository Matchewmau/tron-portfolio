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
    ? 'border-[#FF6B00]/65 bg-[#FF6B00]/15 text-[#FF6B00] shadow-[0_0_15px_rgba(255,107,0,0.28)]'
    : 'border-[#00F0FF]/40 bg-[#00F0FF]/10 text-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.2)]';

  const dotColor = isOrange ? 'bg-[#FF6B00]' : 'bg-[#00F0FF]';

  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider clip-chamfer-sm ${styles} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dotColor}`}
          />
          <span className={`relative inline-flex h-2 w-2 rounded-full ${dotColor}`} />
        </span>
      )}
      {children}
    </span>
  );
}
