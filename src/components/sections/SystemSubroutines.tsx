import { motion, useReducedMotion } from 'framer-motion';
import { BrainCircuit, Code2, Layers, Wrench } from 'lucide-react';
import { useAudioHud } from '../../context/AudioContext';
import { portfolioData } from '../../data/portfolioData';
import { ChamferCard } from '../ui/ChamferCard';
import { SectionHeader } from '../ui/SectionHeader';

const QUADRANT_ICONS: Record<string, typeof Code2> = {
  languages: Code2,
  frameworks: Layers,
  'ai-ml': BrainCircuit,
  tools: Wrench,
};

export function SystemSubroutines() {
  const prefersReducedMotion = useReducedMotion();
  const { playHover } = useAudioHud();

  return (
    <section
      id="arsenal"
      aria-labelledby="arsenal-heading"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div id="arsenal-heading">
        <SectionHeader
          indexCode="02"
          protocol="Technical Skills"
          title="Languages, Frameworks & AI Stack"
          subtitle="Core technologies used across full-stack web engineering, relational database design, and deep learning computer vision."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {portfolioData.arsenal.map((quadrant, index) => {
          const IconComponent = QUADRANT_ICONS[quadrant.id] ?? Code2;

          return (
            <motion.div
              key={quadrant.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.36,
                delay: prefersReducedMotion ? 0 : index * 0.06,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <ChamferCard
                accent="cyan"
                interactive
                className="h-full"
                innerClassName="p-6 flex h-full flex-col justify-between"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between border-b border-[#38D9F5]/14 pb-3.5">
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-wide text-[#F1F6FA]">
                        {quadrant.title}
                      </h3>
                      <p className="mt-0.5 font-sans text-xs text-[#A3BACB]">{quadrant.subtitle}</p>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#38D9F5]/25 bg-[#38D9F5]/10 text-[#7CE7FA] clip-chamfer-sm">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {quadrant.skills.map((skill) => (
                      <span
                        key={skill}
                        onMouseEnter={playHover}
                        className="rounded border border-[#38D9F5]/20 bg-[#07101B]/75 px-3 py-1.5 font-sans text-sm font-medium text-[#E4EFF7] transition-all duration-150 hover:border-[#38D9F5]/60 hover:bg-[#38D9F5]/12 hover:text-[#7CE7FA]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ChamferCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
