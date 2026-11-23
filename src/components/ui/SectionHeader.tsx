interface SectionHeaderProps {
  indexCode: string;
  protocol: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({
  indexCode,
  protocol,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="mb-10 md:mb-12">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="border border-[#00F0FF]/40 bg-[#00F0FF]/10 px-2.5 py-0.5 font-mono text-xs font-bold tracking-widest text-[#00F0FF]">
          {indexCode}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#00F0FF]">
          // {protocol}
        </span>
        <div
          className="hidden h-[1px] flex-1 bg-gradient-to-r from-[#00F0FF]/45 via-[#00F0FF]/15 to-transparent sm:block"
          aria-hidden="true"
        />
      </div>
      <h2 className="font-display text-2xl font-bold uppercase tracking-widest text-[#E2F1F8] drop-shadow-neon-cyan sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-[#8BAEC4]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
