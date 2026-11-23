import { Github, Mail } from 'lucide-react';
import tronDiscImg from '../../assets/tron-disc-clean.png';
import { portfolioData } from '../../data/portfolioData';

export function HudFooter() {
  const { identity } = portfolioData;

  return (
    <footer className="relative z-10 border-t border-[#38D9F5]/15 bg-[#07101B]/90 py-8 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <img
            src={tronDiscImg}
            alt=""
            aria-hidden="true"
            className="h-5 w-5 shrink-0 object-contain"
          />
          <p className="font-sans text-sm text-[#A3BACB]">
            &copy; {new Date().getFullYear()}{' '}
            <span className="font-medium text-[#F1F6FA]">{identity.fullName}</span> · Zamboanga
            City, Philippines
          </p>
        </div>

        <div className="flex items-center gap-5 font-sans text-sm font-medium text-[#A3BACB]">
          <a
            href={`mailto:${identity.email}`}
            className="inline-flex min-h-[44px] items-center gap-2 transition-colors hover:text-[#38D9F5]"
          >
            <Mail className="h-4 w-4 text-[#38D9F5]" aria-hidden="true" />
            <span>Email</span>
          </a>
          <a
            href={identity.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 transition-colors hover:text-[#38D9F5]"
          >
            <Github className="h-4 w-4 text-[#38D9F5]" aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
