import { motion, useReducedMotion } from 'framer-motion';
import { Award, BookOpen, Globe2, GraduationCap, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { ChamferCard } from '../ui/ChamferCard';
import { NeonBadge } from '../ui/NeonBadge';
import { SectionHeader } from '../ui/SectionHeader';

export function VerificationProtocols() {
  const prefersReducedMotion = useReducedMotion();
  const { education, certifications, languages } = portfolioData;

  return (
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div id="credentials-heading">
        <SectionHeader
          indexCode="03"
          protocol="VERIFICATION_PROTOCOLS"
          title="Education, Eligibility & Credentials"
          subtitle="Academic foundation in Computer Science paired with Philippine Civil Service Professional Eligibility and international AI conference publication."
        />
      </div>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
        {/* Left Column: Academic Node & Spoken Languages */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col gap-6 lg:col-span-5"
        >
          {/* Academic Degree Card */}
          <ChamferCard accent="cyan" innerClassName="p-6">
            <div className="mb-4 flex items-center justify-between">
              <NeonBadge accent="cyan">// ACADEMIC_DEGREE</NeonBadge>
              <GraduationCap className="h-5 w-5 text-[#00F0FF]" aria-hidden="true" />
            </div>

            <h3 className="font-display text-lg font-bold uppercase leading-snug tracking-widest text-[#E2F1F8]">
              {education.degree}
            </h3>
            <p className="mt-2 font-mono text-sm font-bold text-[#00F0FF]">
              {education.institution}
            </p>
            <p className="mt-1 font-mono text-xs text-[#8BAEC4]">
              {education.period} | {education.location}
            </p>

            <div className="mt-5 border-t border-[#00F0FF]/20 pt-4">
              <div className="mb-2.5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#E2F1F8]">
                <BookOpen className="h-3.5 w-3.5 text-[#00F0FF]" aria-hidden="true" />
                <span>Relevant Coursework</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {education.coursework.map((course) => (
                  <span
                    key={course}
                    className="border border-[#00F0FF]/25 bg-[#02060B]/80 px-2.5 py-1 font-mono text-xs text-[#E2F1F8]/90"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </ChamferCard>

          {/* Languages & Dialects Card */}
          <ChamferCard accent="cyan" innerClassName="p-6">
            <div className="mb-4 flex items-center justify-between">
              <NeonBadge accent="cyan">// LINGUISTIC_PROTOCOLS</NeonBadge>
              <Globe2 className="h-5 w-5 text-[#00F0FF]" aria-hidden="true" />
            </div>

            <h3 className="font-display text-base font-bold uppercase tracking-widest text-[#E2F1F8]">
              Languages & Dialects
            </h3>
            <p className="mt-1 font-mono text-xs text-[#8BAEC4]">
              Multilingual communication across international & regional teams
            </p>

            <div className="mt-4 grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2">
              {languages.map((lang) => (
                <div
                  key={lang}
                  className="flex items-center gap-2 border border-[#00F0FF]/25 bg-[#02060B]/75 px-3 py-2 font-mono text-xs text-[#E2F1F8] clip-chamfer-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF]" aria-hidden="true" />
                  <span>{lang}</span>
                </div>
              ))}
            </div>
          </ChamferCard>
        </motion.div>

        {/* Right Column: Verified Certifications & Prestige Highlights */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          {certifications.map((cert, index) => {
            const isOrange = cert.accent === 'orange';

            return (
              <motion.div
                key={cert.id}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.36,
                  delay: prefersReducedMotion ? 0 : index * 0.07,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <ChamferCard
                  accent={isOrange ? 'orange' : 'cyan'}
                  interactive
                  innerClassName="p-5 sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <NeonBadge accent={isOrange ? 'orange' : 'cyan'}>
                          {isOrange ? (
                            <Award className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          {cert.tag}
                        </NeonBadge>
                      </div>

                      <h3
                        className={`font-display text-base font-bold uppercase tracking-wider sm:text-lg ${
                          isOrange ? 'text-[#FF6B00] drop-shadow-neon-orange' : 'text-[#E2F1F8]'
                        }`}
                      >
                        {cert.title}
                      </h3>

                      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[#8BAEC4]">
                        ISSUING_AUTHORITY: <span className="text-[#E2F1F8]">{cert.issuer}</span>
                      </p>
                    </div>

                    <div
                      className={`self-start border px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest sm:self-center clip-chamfer-sm ${
                        isOrange
                          ? 'border-[#FF6B00]/60 bg-[#FF6B00]/15 text-[#FF6B00]'
                          : 'border-[#00F0FF]/35 bg-[#00F0FF]/10 text-[#00F0FF]'
                      }`}
                    >
                      VERIFIED
                    </div>
                  </div>
                </ChamferCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
