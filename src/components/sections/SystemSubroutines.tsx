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
      className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div id="arsenal-heading">
        <SectionHeader
          indexCode="02"
          protocol="SYSTEM_SUBROUTINES"
          title="Technical Arsenal Matrix"
          subtitle="Four-quadrant architecture stack spanning core programming languages, modern web runtimes, deep learning computer vision, and deployment infrastructure."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {portfolioData.arsenal.map((quadrant, index) => {
          const IconComponent = QUADRANT_ICONS[quadrant.id] ?? Code2;

          return (
            <motion.div
              key={quadrant.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.38,
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
                  <div className="mb-4 flex items-center justify-between border-b border-[#00F0FF]/20 pb-3">
                    <div>
                      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#00F0FF]">
                        // {quadrant.quadrantCode}
                      </span>
                      <h3 className="mt-0.5 font-display text-lg font-bold uppercase tracking-widest text-[#E2F1F8]">
                        {quadrant.title}
                      </h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center border border-[#00F0FF]/35 bg-[#00F0FF]/10 text-[#00F0FF] clip-chamfer-sm">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>

                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8BAEC4]">
                    {quadrant.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {quadrant.skills.map((skill) => (
                      <span
                        key={skill}
                        onMouseEnter={playHover}
                        className="border border-[#00F0FF]/30 bg-[#02060B]/80 px-3 py-1.5 font-mono text-xs font-medium text-[#E2F1F8] transition-all duration-150 hover:border-[#00F0FF] hover:bg-[#00F0FF]/15 hover:text-[#00F0FF] hover:shadow-neon-cyan clip-chamfer-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#00F0FF]/15 pt-3 font-mono text-[10px] uppercase tracking-widest text-[#8BAEC4]">
                  <span>MODULES_LOADED: 0{quadrant.skills.length}</span>
                  <span className="text-[#00F0FF]">STATUS: READY</span>
                </div>
              </ChamferCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
