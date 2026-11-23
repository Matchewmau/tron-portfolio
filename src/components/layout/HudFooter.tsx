import { Disc, Github, Mail } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export function HudFooter() {
  const { identity } = portfolioData;

  return (
    <footer className="relative z-10 border-t border-[#00F0FF]/20 bg-[#02060B]/90 py-8 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <Disc className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-wider text-[#8BAEC4]">
            &copy; {new Date().getFullYear()}{' '}
            <span className="font-bold text-[#E2F1F8]">{identity.fullName}</span> // END_OF_LINE
          </p>
        </div>

        <div className="flex items-center gap-5 font-mono text-xs uppercase tracking-wider text-[#8BAEC4]">
          <a
            href={`mailto:${identity.email}`}
            className="inline-flex min-h-[44px] items-center gap-1.5 transition-colors hover:text-[#00F0FF]"
          >
            <Mail className="h-3.5 w-3.5 text-[#00F0FF]" aria-hidden="true" />
            <span>EMAIL</span>
          </a>
          <a
            href={identity.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 transition-colors hover:text-[#00F0FF]"
          >
            <Github className="h-3.5 w-3.5 text-[#00F0FF]" aria-hidden="true" />
            <span>GITHUB</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
