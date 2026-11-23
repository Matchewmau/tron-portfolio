import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, Calendar, ChevronRight, Eye, Images, UserCheck } from 'lucide-react';
import { useAudioHud } from '../../context/AudioContext';
import { portfolioData } from '../../data/portfolioData';
import type { ConstructProject } from '../../types/portfolio';
import { ChamferButton } from '../ui/ChamferButton';
import { ChamferCard } from '../ui/ChamferCard';
import { NeonBadge } from '../ui/NeonBadge';
import { SectionHeader } from '../ui/SectionHeader';
import { NodeInspectModal } from './NodeInspectModal';

export function ConstructNodes() {
  const prefersReducedMotion = useReducedMotion();
  const { playClick, playHover } = useAudioHud();
  const [selectedNode, setSelectedNode] = useState<ConstructProject | null>(null);

  return (
    <section
      id="constructs"
      aria-labelledby="constructs-heading"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div id="constructs-heading">
        <SectionHeader
          indexCode="01"
          protocol="Featured Projects"
          title="Selected Systems & AI Research"
          subtitle="Full-stack web applications and published computer vision research. Select any project to browse interface screenshots and architecture notes."
        />
      </div>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
        {portfolioData.constructs.map((project, index) => {
          const hasPrestige = Boolean(project.prestigeBadge);

          return (
            <motion.article
              key={project.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.4,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="flex h-full"
            >
              <ChamferCard
                accent="cyan"
                interactive
                laserScan
                className="flex h-full w-full"
                innerClassName="flex h-full flex-col justify-between"
              >
                <div>
                  {/* Project Screenshot Cover Preview */}
                  <button
                    type="button"
                    onMouseEnter={playHover}
                    onClick={() => {
                      playClick();
                      setSelectedNode(project);
                    }}
                    aria-label={`Preview ${project.title} screenshots and case study`}
                    className="relative block aspect-[16/10] w-full overflow-hidden border-b border-[#38D9F5]/15 bg-[#060D17] text-left"
                  >
                    <img
                      src={project.coverImage}
                      alt={`${project.title} interface preview`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 ease-snappy group-hover:scale-[1.04]"
                    />
                    {/* Soft Gradient Overlay for Clean Badge Contrast */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1928] via-transparent to-[#07101B]/35"
                    />

                    {/* Top Badges */}
                    <div className="absolute left-3.5 right-3.5 top-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded bg-[#07101B]/85 px-2.5 py-1 font-mono text-xs font-medium text-[#7CE7FA] backdrop-blur-md border border-[#38D9F5]/25">
                        {project.screenshots.length} Screens
                      </span>

                      {hasPrestige && (
                        <NeonBadge accent="orange" className="bg-[#07101B]/90 backdrop-blur-md">
                          <Award className="h-3.5 w-3.5" aria-hidden="true" />
                          {project.prestigeBadge}
                        </NeonBadge>
                      )}
                    </div>

                    {/* Hover Gallery Hint */}
                    <span className="absolute bottom-3 right-3.5 inline-flex items-center gap-1.5 rounded bg-[#07101B]/85 px-2.5 py-1 font-sans text-xs font-medium text-[#E6F4FA] opacity-90 backdrop-blur-md transition-colors group-hover:text-[#38D9F5]">
                      <Images className="h-3.5 w-3.5 text-[#38D9F5]" aria-hidden="true" />
                      View Gallery
                    </span>
                  </button>

                  {/* Card Body */}
                  <div className="p-6 pb-2">
                    <h3 className="font-display text-xl font-semibold tracking-wide text-[#F1F6FA] transition-colors duration-150 group-hover:text-[#7CE7FA]">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm font-medium text-[#7CE7FA]">
                      {project.subtitle}
                    </p>

                    {/* Role & Dates */}
                    <div className="mt-3.5 flex flex-col gap-1.5 border-y border-[#38D9F5]/12 py-3 font-sans text-xs text-[#A3BACB]">
                      <span className="inline-flex items-center gap-2 text-[#E2EEF7]">
                        <UserCheck className="h-3.5 w-3.5 text-[#38D9F5]" aria-hidden="true" />
                        {project.role}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-[#38D9F5]/80" aria-hidden="true" />
                        {project.period}
                      </span>
                    </div>

                    {/* Key Bullet Highlights — Clean, Readable Sans-Serif */}
                    <ul className="mt-4 space-y-2.5">
                      {project.highlights.map((bullet) => {
                        const isEcaiBullet = bullet.includes('ECAI 2026');
                        return (
                          <li
                            key={bullet}
                            className="flex items-start gap-2 font-sans text-sm leading-relaxed text-[#CBDCEB]"
                          >
                            <ChevronRight
                              className={`mt-1 h-4 w-4 shrink-0 ${
                                isEcaiBullet ? 'text-[#FB923C]' : 'text-[#38D9F5]'
                              }`}
                              aria-hidden="true"
                            />
                            <span>
                              {isEcaiBullet ? (
                                <>
                                  Authored peer-reviewed manuscript{' '}
                                  <em className="text-[#F1F6FA]">
                                    &ldquo;HairMixer: A Hairstyle Recommendation and Simulation
                                    System Based on Facial Structure Using CNNs&rdquo;
                                  </em>
                                  , accepted for presentation and publication at{' '}
                                  <strong className="font-semibold text-[#FDBA74]">
                                    ECAI 2026
                                  </strong>
                                  .
                                </>
                              ) : (
                                bullet
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Stack Chips & View Case Study */}
                <div className="px-6 pb-6 pt-4">
                  <div className="mb-4 flex flex-wrap gap-1.5 border-t border-[#38D9F5]/12 pt-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-[#38D9F5]/20 bg-[#07101B]/70 px-2.5 py-1 font-mono text-xs text-[#B8D2E5]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <ChamferButton
                    onClick={() => setSelectedNode(project)}
                    variant="outline"
                    accent="cyan"
                    className="w-full"
                    aria-label={`View case study for ${project.title}`}
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    <span>View Case Study</span>
                  </ChamferButton>
                </div>
              </ChamferCard>
            </motion.article>
          );
        })}
      </div>

      {/* Detailed Case-Study & Screenshot Gallery Modal */}
      <NodeInspectModal project={selectedNode} onClose={() => setSelectedNode(null)} />
    </section>
  );
}
