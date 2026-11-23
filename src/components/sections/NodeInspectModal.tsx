import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
  Github,
  Images,
  Layers,
  X,
} from 'lucide-react';
import { useAudioHud } from '../../context/AudioContext';
import type { ConstructProject } from '../../types/portfolio';
import { ChamferButton } from '../ui/ChamferButton';
import { NeonBadge } from '../ui/NeonBadge';

interface NodeInspectModalProps {
  project: ConstructProject | null;
  onClose: () => void;
}

export function NodeInspectModal({ project, onClose }: NodeInspectModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const { playClick, playHover } = useAudioHud();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const totalSlides = project.screenshots.length;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        playClick();
        onClose();
      } else if (event.key === 'ArrowRight' && totalSlides > 1) {
        setActiveSlide((prev) => (prev + 1) % totalSlides);
      } else if (event.key === 'ArrowLeft' && totalSlides > 1) {
        setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, playClick, project]);

  const screenshots = project?.screenshots ?? [];
  const currentScreenshot = screenshots[activeSlide] ?? screenshots[0];

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-node-title"
        >
          {/* Soft Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              playClick();
              onClose();
            }}
            className="fixed inset-0 bg-[#040A12]/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 max-h-[90dvh] w-full max-w-4xl p-[1px] clip-chamfer-lg bg-[#38D9F5]/35 shadow-neon-cyan-strong"
          >
            <div className="flex max-h-[calc(90dvh-2px)] flex-col overflow-y-auto clip-chamfer-lg bg-[#0B1726]/95 p-5 sm:p-8">
              {/* Top Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[#38D9F5]/18 pb-5">
                <div>
                  <div className="mb-2.5 flex flex-wrap items-center gap-2">
                    <NeonBadge accent="cyan">Case Study · {project.nodeCode}</NeonBadge>
                    {project.prestigeBadge && (
                      <NeonBadge accent="orange">
                        <Award className="h-3.5 w-3.5" aria-hidden="true" />
                        {project.prestigeBadge}
                      </NeonBadge>
                    )}
                  </div>
                  <h3
                    id="modal-node-title"
                    className="font-display text-xl font-semibold tracking-wide text-[#F1F6FA] sm:text-2xl"
                  >
                    {project.fullTitle}
                  </h3>
                  <p className="mt-1.5 font-sans text-sm text-[#7CE7FA]">
                    {project.role} <span className="text-[#A3BACB]">· {project.period}</span>
                  </p>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => {
                    playClick();
                    onClose();
                  }}
                  aria-label="Close project case study modal"
                  className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center border border-[#38D9F5]/30 bg-[#07101B]/80 text-[#A3BACB] transition-colors duration-150 hover:border-[#38D9F5] hover:bg-[#38D9F5]/15 hover:text-[#F1F6FA] clip-chamfer-sm"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Interactive Project Screenshot Gallery */}
              {currentScreenshot && (
                <div className="mt-6">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-[#7CE7FA]">
                      <Images className="h-4 w-4" aria-hidden="true" />
                      <h4 className="font-sans text-sm font-semibold text-[#F1F6FA]">
                        Interface Gallery
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-[#A3BACB]">
                      Screen {activeSlide + 1} of {screenshots.length}
                    </span>
                  </div>

                  <div className="relative overflow-hidden border border-[#38D9F5]/20 bg-[#060D17] clip-chamfer-sm">
                    <div className="relative flex aspect-[16/10] w-full items-center justify-center bg-[#050B14] p-2 sm:p-3">
                      <img
                        src={currentScreenshot.src}
                        alt={currentScreenshot.alt}
                        className="max-h-full max-w-full rounded object-contain"
                      />

                      {screenshots.length > 1 && (
                        <>
                          <button
                            type="button"
                            onMouseEnter={playHover}
                            onClick={() => {
                              playClick();
                              setActiveSlide(
                                (prev) => (prev - 1 + screenshots.length) % screenshots.length
                              );
                            }}
                            aria-label="Previous screenshot"
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#38D9F5]/35 bg-[#07101B]/85 text-[#F1F6FA] backdrop-blur-md transition-colors hover:border-[#38D9F5] hover:bg-[#38D9F5] hover:text-[#07101B]"
                          >
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                          </button>

                          <button
                            type="button"
                            onMouseEnter={playHover}
                            onClick={() => {
                              playClick();
                              setActiveSlide((prev) => (prev + 1) % screenshots.length);
                            }}
                            aria-label="Next screenshot"
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#38D9F5]/35 bg-[#07101B]/85 text-[#F1F6FA] backdrop-blur-md transition-colors hover:border-[#38D9F5] hover:bg-[#38D9F5] hover:text-[#07101B]"
                          >
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </>
                      )}
                    </div>

                    <div className="border-t border-[#38D9F5]/15 bg-[#091320] px-4 py-2.5 text-center font-sans text-xs text-[#C9DCEB] sm:text-sm">
                      {currentScreenshot.caption}
                    </div>
                  </div>

                  {/* Thumbnail Selector Strip */}
                  {screenshots.length > 1 && (
                    <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
                      {screenshots.map((shot, idx) => {
                        const isSelected = idx === activeSlide;
                        return (
                          <button
                            key={shot.caption}
                            type="button"
                            onClick={() => {
                              playClick();
                              setActiveSlide(idx);
                            }}
                            aria-label={`View screenshot ${idx + 1}: ${shot.caption}`}
                            aria-current={isSelected ? 'true' : undefined}
                            className={`relative h-14 w-24 shrink-0 overflow-hidden rounded border transition-all duration-150 sm:h-16 sm:w-28 ${
                              isSelected
                                ? 'border-[#38D9F5] ring-1 ring-[#38D9F5]/60 opacity-100'
                                : 'border-[#38D9F5]/20 opacity-55 hover:opacity-90'
                            }`}
                          >
                            <img
                              src={shot.src}
                              alt=""
                              className="h-full w-full object-cover object-top"
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Key Performance Metrics */}
              <div className="mt-7">
                <h4 className="mb-3 font-sans text-sm font-semibold text-[#F1F6FA]">
                  Key Outcomes & Metrics
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.metrics.map((metric) => {
                    const isOrange = metric.accent === 'orange';
                    return (
                      <div
                        key={metric.value}
                        className={`border p-4 clip-chamfer-sm ${
                          isOrange
                            ? 'border-[#FB923C]/40 bg-[#FB923C]/10'
                            : 'border-[#38D9F5]/22 bg-[#07101B]/75'
                        }`}
                      >
                        <div
                          className={`font-display text-sm font-semibold tracking-wide sm:text-base ${
                            isOrange ? 'text-[#FDBA74]' : 'text-[#7CE7FA]'
                          }`}
                        >
                          {metric.value}
                        </div>
                        <div className="mt-1 font-sans text-xs text-[#A3BACB]">{metric.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Architecture Notes */}
              <div className="mt-7 border border-[#38D9F5]/18 bg-[#07101B]/65 p-4 sm:p-5 clip-chamfer-sm">
                <div className="mb-2 flex items-center gap-2 text-[#7CE7FA]">
                  <Layers className="h-4 w-4" aria-hidden="true" />
                  <h4 className="font-sans text-sm font-semibold text-[#F1F6FA]">
                    System Architecture Overview
                  </h4>
                </div>
                <p className="font-sans text-sm leading-relaxed text-[#C9DCEB]">
                  {project.architectureSummary}
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                  {project.architectureLayers.map((layerItem) => (
                    <div
                      key={layerItem.layer}
                      className="rounded border border-[#38D9F5]/15 bg-[#0D1928]/80 p-3.5"
                    >
                      <span className="font-mono text-[11px] font-medium text-[#7CE7FA]">
                        {layerItem.layer}
                      </span>
                      <p className="mt-1 font-sans text-sm font-semibold text-[#F1F6FA]">
                        {layerItem.component}
                      </p>
                      <p className="mt-1 font-sans text-xs leading-relaxed text-[#A3BACB]">
                        {layerItem.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Highlights */}
              <div className="mt-7">
                <div className="mb-3 flex items-center gap-2 text-[#7CE7FA]">
                  <Cpu className="h-4 w-4" aria-hidden="true" />
                  <h4 className="font-sans text-sm font-semibold text-[#F1F6FA]">
                    Engineering & Research Highlights
                  </h4>
                </div>
                <ul className="space-y-3">
                  {project.highlights.map((item) => {
                    const mentionsEcai = item.includes('ECAI 2026');
                    return (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-[#D5E4F0]"
                      >
                        <CheckCircle2
                          className={`mt-1 h-4 w-4 shrink-0 ${
                            mentionsEcai ? 'text-[#FB923C]' : 'text-[#38D9F5]'
                          }`}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Modal Footer: Tech Stack & GitHub Link */}
              <div className="mt-7 flex flex-col justify-between gap-4 border-t border-[#38D9F5]/18 pt-5 sm:flex-row sm:items-center">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-[#38D9F5]/25 bg-[#38D9F5]/10 px-2.5 py-1 font-mono text-xs text-[#BAEBF7]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <ChamferButton
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="solid"
                  accent="cyan"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>github.com/matchewmau</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </ChamferButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
