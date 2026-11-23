import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, Calendar, ChevronRight, ScanSearch, UserCheck } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import type { ConstructProject } from '../../types/portfolio';
import { ChamferButton } from '../ui/ChamferButton';
import { ChamferCard } from '../ui/ChamferCard';
import { NeonBadge } from '../ui/NeonBadge';
import { SectionHeader } from '../ui/SectionHeader';
import { NodeInspectModal } from './NodeInspectModal';

export function ConstructNodes() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedNode, setSelectedNode] = useState<ConstructProject | null>(null);

  return (
    <section
      id="constructs"
      aria-labelledby="constructs-heading"
      className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div id="constructs-heading">
        <SectionHeader
          indexCode="01"
          protocol="CONSTRUCT_NODES"
          title="Engineered Systems & AI Research"
          subtitle="Production full-stack architectures and peer-reviewed computer vision pipelines. Hover to scan node telemetry or click INSPECT_NODE for system blueprints."
        />
      </div>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
        {portfolioData.constructs.map((project, index) => {
          const hasPrestige = Boolean(project.prestigeBadge);

          return (
            <motion.article
              key={project.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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
                innerClassName="flex h-full flex-col justify-between p-6"
              >
                <div>
                  {/* Card Top Node Metadata & ECAI 2026 Orange Badge */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                      // {project.nodeCode}
                    </span>

                    {hasPrestige && (
                      <NeonBadge accent="orange">
                        <Award className="h-3.5 w-3.5" aria-hidden="true" />
                        {project.prestigeBadge}
                      </NeonBadge>
                    )}
                  </div>

                  {/* Project Title & Subtitle */}
                  <h3 className="font-display text-xl font-bold uppercase tracking-widest text-[#E2F1F8] group-hover:text-[#00F0FF] transition-colors duration-150">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs font-medium text-[#00F0FF]">
                    {project.subtitle}
                  </p>

                  {/* Role & Period */}
                  <div className="mt-3 flex flex-col gap-1 border-y border-[#00F0FF]/15 py-2.5 font-mono text-xs text-[#8BAEC4]">
                    <span className="inline-flex items-center gap-1.5 text-[#E2F1F8]">
                      <UserCheck className="h-3.5 w-3.5 text-[#00F0FF]" aria-hidden="true" />
                      {project.role}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#00F0FF]/80" aria-hidden="true" />
                      {project.period}
                    </span>
                  </div>

                  {/* Quick Quantified Metric Callout */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {project.metrics.slice(0, 2).map((metric) => {
                      const isOrange = metric.accent === 'orange';
                      return (
                        <div
                          key={metric.value}
                          className={`border px-2.5 py-2 ${
                            isOrange
                              ? 'border-[#FF6B00]/50 bg-[#FF6B00]/10 text-[#FF6B00]'
                              : 'border-[#00F0FF]/25 bg-[#02060B]/70 text-[#00F0FF]'
                          }`}
                        >
                          <div className="font-display text-[11px] font-bold uppercase tracking-wider">
                            {metric.value}
                          </div>
                          <div className="mt-0.5 font-mono text-[10px] text-[#8BAEC4]">
                            {metric.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="mt-4 space-y-2.5">
                    {project.highlights.map((bullet) => {
                      const isEcaiBullet = bullet.includes('ECAI 2026');
                      return (
                        <li
                          key={bullet}
                          className="flex items-start gap-2 font-mono text-xs leading-relaxed text-[#E2F1F8]/90"
                        >
                          <ChevronRight
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                              isEcaiBullet ? 'text-[#FF6B00]' : 'text-[#00F0FF]'
                            }`}
                            aria-hidden="true"
                          />
                          <span>
                            {isEcaiBullet ? (
                              <>
                                Authored peer-reviewed manuscript{' '}
                                <em className="text-[#E2F1F8]">
                                  &ldquo;HairMixer: A Hairstyle Recommendation and Simulation System
                                  Based on Facial Structure Using CNNs&rdquo;
                                </em>
                                , accepted for presentation and publication at{' '}
                                <strong className="font-bold text-[#FF6B00]">ECAI 2026</strong>.
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

                {/* Bottom Stack Tags + INSPECT_NODE Trigger */}
                <div className="mt-6 pt-4 border-t border-[#00F0FF]/20">
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-[#00F0FF]/25 bg-[#02060B]/80 px-2 py-0.5 font-mono text-[11px] text-[#8BAEC4]"
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
                    aria-label={`Inspect node ${project.title}`}
                  >
                    <ScanSearch className="h-4 w-4" aria-hidden="true" />
                    <span>INSPECT_NODE</span>
                  </ChamferButton>
                </div>
              </ChamferCard>
            </motion.article>
          );
        })}
      </div>

      {/* Detailed HUD Case-Study Modal */}
      <NodeInspectModal project={selectedNode} onClose={() => setSelectedNode(null)} />
    </section>
  );
}
