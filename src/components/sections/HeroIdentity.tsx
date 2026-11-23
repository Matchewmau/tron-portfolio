import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, Award, Github, MapPin, Send } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { IdentityDisc } from '../canvas/IdentityDisc';
import { ChamferButton } from '../ui/ChamferButton';
import { ChamferCard } from '../ui/ChamferCard';
import { NeonBadge } from '../ui/NeonBadge';

export function HeroIdentity() {
  const prefersReducedMotion = useReducedMotion();
  const { identity } = portfolioData;

  return (
    <section
      id="identity"
      aria-labelledby="hero-heading"
      className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 md:pb-28 md:pt-20 lg:px-8"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Primary Identity Readout */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="lg:col-span-7"
        >
          {/* Top Status & Prestige Badges */}
          <div className="mb-6 flex flex-wrap items-center gap-2.5">
            <NeonBadge accent="cyan" pulse>
              // IDENTITY_VERIFIED
            </NeonBadge>
            <NeonBadge accent="orange">
              <Award className="h-3.5 w-3.5" aria-hidden="true" />
              ECAI 2026 PUBLISHED RESEARCHER
            </NeonBadge>
            <NeonBadge accent="orange">CSC PROFESSIONAL ELIGIBLE</NeonBadge>
          </div>

          {/* Primary User Name */}
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-[#00F0FF]">
            USER_DESIGNATION // INTO_THE_GRID
          </p>
          <h1
            id="hero-heading"
            className="font-display text-3xl font-black uppercase leading-tight tracking-widest text-[#E2F1F8] drop-shadow-neon-cyan sm:text-4xl md:text-5xl xl:text-[3.35rem]"
          >
            {identity.fullName}
          </h1>

          {/* Role / Designation */}
          <p className="mt-4 font-display text-sm font-bold uppercase tracking-widest text-[#00F0FF] sm:text-base md:text-lg">
            {identity.designation}
          </p>

          {/* Location & Availability */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-[#8BAEC4] sm:text-sm">
            <span className="inline-flex items-center gap-1.5 text-[#E2F1F8]">
              <MapPin className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
              {identity.location}
            </span>
            <span className="hidden text-[#00F0FF]/50 sm:inline">|</span>
            <span className="text-[#00F0FF]">{identity.availability}</span>
          </div>

          {/* Executive Summary */}
          <ChamferCard className="mt-6" innerClassName="p-5 sm:p-6">
            <p className="font-mono text-sm leading-relaxed text-[#E2F1F8]/95 sm:text-[15px]">
              {identity.summary}
            </p>
          </ChamferCard>

          {/* Primary Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <ChamferButton href="#constructs" variant="solid" accent="cyan">
              <span>INSPECT_CONSTRUCTS</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </ChamferButton>

            <ChamferButton href="#uplink" variant="outline" accent="cyan">
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>INITIATE_UPLINK</span>
            </ChamferButton>

            <ChamferButton
              href={identity.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              accent="cyan"
              aria-label="Open John Mathew B. Mauricio GitHub profile"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              <span>GITHUB // MATCHEWMAU</span>
            </ChamferButton>
          </div>
        </motion.div>

        {/* Right Column: Animated Dual-Ring Identity Disc */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="flex justify-center lg:col-span-5"
        >
          <IdentityDisc />
        </motion.div>
      </div>

      {/* Bottom Hero Key Telemetry Strip */}
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {identity.heroMetrics.map((metric) => {
          const isOrange = metric.accent === 'orange';
          return (
            <ChamferCard
              key={metric.value}
              accent={isOrange ? 'orange' : 'cyan'}
              size="sm"
              innerClassName="p-4 flex flex-col justify-between"
            >
              <span
                className={`font-display text-lg font-bold uppercase tracking-widest sm:text-xl ${
                  isOrange
                    ? 'text-[#FF6B00] drop-shadow-neon-orange'
                    : 'text-[#00F0FF] drop-shadow-neon-cyan'
                }`}
              >
                {metric.value}
              </span>
              <span className="mt-1 font-mono text-xs uppercase tracking-wider text-[#8BAEC4]">
                {metric.label}
              </span>
            </ChamferCard>
          );
        })}
      </div>
    </section>
  );
}
