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
      className="relative mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 md:pb-24 md:pt-16 lg:px-8"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left Column: Clean, High-Legibility Identity Intro */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="order-2 lg:order-1 lg:col-span-7"
        >
          {/* Soft Credential Pills */}
          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            <NeonBadge accent="orange">
              <Award className="h-3.5 w-3.5" aria-hidden="true" />
              ECAI 2026 Published Researcher
            </NeonBadge>
            <NeonBadge accent="orange">CSC Professional Eligible</NeonBadge>
          </div>

          {/* Primary Name */}
          <h1
            id="hero-heading"
            className="font-display text-3xl font-bold leading-tight tracking-wide text-[#F1F6FA] sm:text-4xl md:text-5xl"
          >
            {identity.fullName}
          </h1>

          {/* Role / Designation */}
          <p className="mt-3 font-sans text-lg font-medium text-[#7CE7FA] sm:text-xl">
            {identity.designation}
          </p>

          {/* Location & Availability */}
          <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-sans text-sm text-[#A3BACB]">
            <span className="inline-flex items-center gap-1.5 text-[#D8E7F3]">
              <MapPin className="h-4 w-4 text-[#38D9F5]" aria-hidden="true" />
              {identity.location}
            </span>
            <span className="hidden text-[#38D9F5]/40 sm:inline">•</span>
            <span>{identity.availability}</span>
          </div>

          {/* Easy-to-Read Summary */}
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-[#C9DCEB] sm:text-[17px] sm:leading-[1.75]">
            {identity.summary}
          </p>

          {/* Primary Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <ChamferButton href="#constructs" variant="solid" accent="cyan">
              <span>Explore Projects</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </ChamferButton>

            <ChamferButton href="#uplink" variant="outline" accent="cyan">
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>Get in Touch</span>
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
              <span>GitHub</span>
            </ChamferButton>
          </div>
        </motion.div>

        {/* Right Column: Portrait inside Tron Identity Disc */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="order-1 flex justify-center lg:order-2 lg:col-span-5"
        >
          <IdentityDisc />
        </motion.div>
      </div>

      {/* Key Highlights Strip */}
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {identity.heroMetrics.map((metric) => {
          const isOrange = metric.accent === 'orange';
          return (
            <ChamferCard
              key={metric.value}
              accent={isOrange ? 'orange' : 'cyan'}
              size="sm"
              innerClassName="p-4 sm:p-5 flex flex-col justify-between"
            >
              <span
                className={`font-display text-lg font-semibold tracking-wide ${
                  isOrange ? 'text-[#FDBA74]' : 'text-[#7CE7FA]'
                }`}
              >
                {metric.value}
              </span>
              <span className="mt-1 font-sans text-sm text-[#A3BACB]">{metric.label}</span>
            </ChamferCard>
          );
        })}
      </div>
    </section>
  );
}
