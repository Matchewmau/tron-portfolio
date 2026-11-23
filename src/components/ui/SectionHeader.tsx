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
        <span className="border border-[#38D9F5]/30 bg-[#38D9F5]/10 px-2.5 py-0.5 font-mono text-xs font-medium text-[#7CE7FA] clip-chamfer-sm">
          {indexCode}
        </span>
        <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#7CE7FA]">
          {protocol}
        </span>
        <div
          className="hidden h-[1px] flex-1 bg-gradient-to-r from-[#38D9F5]/25 via-[#38D9F5]/8 to-transparent sm:block"
          aria-hidden="true"
        />
      </div>
      <h2 className="font-display text-2xl font-semibold tracking-wide text-[#F1F6FA] sm:text-3xl md:text-[2.15rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-[#A3BACB]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
