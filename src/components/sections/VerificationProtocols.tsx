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
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div id="credentials-heading">
        <SectionHeader
          indexCode="03"
          protocol="Education & Credentials"
          title="Academic Background & Certifications"
          subtitle="Computer Science degree combined with Philippine Civil Service Professional Eligibility and international research publication."
        />
      </div>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
        {/* Left Column: Education & Languages */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col gap-6 lg:col-span-5"
        >
          {/* Academic Degree */}
          <ChamferCard accent="cyan" innerClassName="p-6">
            <div className="mb-4 flex items-center justify-between">
              <NeonBadge accent="cyan">Education</NeonBadge>
              <GraduationCap className="h-5 w-5 text-[#7CE7FA]" aria-hidden="true" />
            </div>

            <h3 className="font-display text-lg font-semibold leading-snug tracking-wide text-[#F1F6FA]">
              {education.degree}
            </h3>
            <p className="mt-2 font-sans text-base font-medium text-[#7CE7FA]">
              {education.institution}
            </p>
            <p className="mt-1 font-sans text-sm text-[#A3BACB]">
              {education.period} · {education.location}
            </p>

            <div className="mt-5 border-t border-[#38D9F5]/15 pt-4">
              <div className="mb-2.5 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#C9DCEB]">
                <BookOpen className="h-3.5 w-3.5 text-[#38D9F5]" aria-hidden="true" />
                <span>Relevant Coursework</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {education.coursework.map((course) => (
                  <span
                    key={course}
                    className="rounded border border-[#38D9F5]/18 bg-[#07101B]/70 px-2.5 py-1 font-sans text-xs text-[#D5E4F0]"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </ChamferCard>

          {/* Languages & Dialects */}
          <ChamferCard accent="cyan" innerClassName="p-6">
            <div className="mb-4 flex items-center justify-between">
              <NeonBadge accent="cyan">Languages</NeonBadge>
              <Globe2 className="h-5 w-5 text-[#7CE7FA]" aria-hidden="true" />
            </div>

            <h3 className="font-display text-base font-semibold tracking-wide text-[#F1F6FA]">
              Spoken Languages & Dialects
            </h3>
            <p className="mt-1 font-sans text-sm text-[#A3BACB]">
              Fluent communication across international and regional teams
            </p>

            <div className="mt-4 grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2">
              {languages.map((lang) => (
                <div
                  key={lang}
                  className="flex items-center gap-2.5 rounded border border-[#38D9F5]/18 bg-[#07101B]/70 px-3 py-2 font-sans text-sm text-[#E6F1F8]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38D9F5]" aria-hidden="true" />
                  <span>{lang}</span>
                </div>
              ))}
            </div>
          </ChamferCard>
        </motion.div>

        {/* Right Column: Certifications & Eligibility */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          {certifications.map((cert, index) => {
            const isOrange = cert.accent === 'orange';

            return (
              <motion.div
                key={cert.id}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.35,
                  delay: prefersReducedMotion ? 0 : index * 0.06,
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
                        className={`font-display text-base font-semibold tracking-wide sm:text-lg ${
                          isOrange ? 'text-[#FED7AA]' : 'text-[#F1F6FA]'
                        }`}
                      >
                        {cert.title}
                      </h3>

                      <p className="mt-1 font-sans text-sm text-[#A3BACB]">
                        Issued by <span className="text-[#D8E7F3]">{cert.issuer}</span>
                      </p>
                    </div>

                    <span
                      className={`self-start rounded border px-3 py-1 font-mono text-xs font-medium sm:self-center ${
                        isOrange
                          ? 'border-[#FB923C]/40 bg-[#FB923C]/12 text-[#FDBA74]'
                          : 'border-[#38D9F5]/28 bg-[#38D9F5]/10 text-[#7CE7FA]'
                      }`}
                    >
                      Verified
                    </span>
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
