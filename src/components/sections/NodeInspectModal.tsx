import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Award, CheckCircle2, Cpu, ExternalLink, Github, Layers, X } from 'lucide-react';
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
  const { playClick } = useAudioHud();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        playClick();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, playClick, project]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-node-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              playClick();
              onClose();
            }}
            className="fixed inset-0 bg-[#02060B]/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* HUD Modal Container */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 max-h-[90dvh] w-full max-w-4xl p-[1px] clip-chamfer-lg bg-[#00F0FF]/60 shadow-neon-cyan-strong"
          >
            <div className="flex max-h-[calc(90dvh-2px)] flex-col overflow-y-auto clip-chamfer-lg bg-[#07131D]/95 p-5 sm:p-8">
              {/* Modal Top Bar */}
              <div className="flex items-start justify-between gap-4 border-b border-[#00F0FF]/25 pb-5">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <NeonBadge accent="cyan">
                      {project.nodeCode} // ARCHITECTURE_INSPECTOR
                    </NeonBadge>
                    {project.prestigeBadge && (
                      <NeonBadge accent="orange">
                        <Award className="h-3.5 w-3.5" aria-hidden="true" />
                        {project.prestigeBadge}
                      </NeonBadge>
                    )}
                  </div>
                  <h3
                    id="modal-node-title"
                    className="font-display text-xl font-bold uppercase tracking-widest text-[#E2F1F8] sm:text-2xl"
                  >
                    {project.fullTitle}
                  </h3>
                  <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-[#00F0FF]">
                    {project.role} <span className="text-[#8BAEC4]">| {project.period}</span>
                  </p>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => {
                    playClick();
                    onClose();
                  }}
                  aria-label="Close project inspection modal"
                  className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center border border-[#00F0FF]/45 bg-[#02060B]/80 text-[#00F0FF] transition-colors duration-150 hover:bg-[#00F0FF] hover:text-[#02060B] clip-chamfer-sm"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Key Performance Telemetry Strip */}
              <div className="mt-6">
                <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#8BAEC4]">
                  // PERFORMANCE_TELEMETRY
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.metrics.map((metric) => {
                    const isOrange = metric.accent === 'orange';
                    return (
                      <div
                        key={metric.value}
                        className={`border p-3.5 clip-chamfer-sm ${
                          isOrange
                            ? 'border-[#FF6B00]/55 bg-[#FF6B00]/10 shadow-[0_0_15px_rgba(255,107,0,0.2)]'
                            : 'border-[#00F0FF]/35 bg-[#02060B]/75'
                        }`}
                      >
                        <div
                          className={`font-display text-sm font-bold uppercase tracking-wider sm:text-base ${
                            isOrange ? 'text-[#FF6B00]' : 'text-[#00F0FF]'
                          }`}
                        >
                          {metric.value}
                        </div>
                        <div className="mt-1 font-mono text-xs text-[#8BAEC4]">{metric.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Architecture Blueprint */}
              <div className="mt-6 border border-[#00F0FF]/25 bg-[#02060B]/65 p-4 sm:p-5 clip-chamfer-sm">
                <div className="mb-2 flex items-center gap-2 text-[#00F0FF]">
                  <Layers className="h-4 w-4" aria-hidden="true" />
                  <h4 className="font-display text-xs font-bold uppercase tracking-widest">
                    SYSTEM_ARCHITECTURE_NOTES
                  </h4>
                </div>
                <p className="font-mono text-xs leading-relaxed text-[#E2F1F8]/90 sm:text-sm">
                  {project.architectureSummary}
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                  {project.architectureLayers.map((layerItem) => (
                    <div
                      key={layerItem.layer}
                      className="border border-[#00F0FF]/20 bg-[#07131D]/80 p-3"
                    >
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#00F0FF]">
                        [{layerItem.layer}]
                      </span>
                      <p className="mt-1 font-mono text-xs font-bold text-[#E2F1F8]">
                        {layerItem.component}
                      </p>
                      <p className="mt-1 font-mono text-[11px] leading-relaxed text-[#8BAEC4]">
                        {layerItem.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering & Research Highlights */}
              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2 text-[#00F0FF]">
                  <Cpu className="h-4 w-4" aria-hidden="true" />
                  <h4 className="font-display text-xs font-bold uppercase tracking-widest">
                    EXECUTION_HIGHLIGHTS
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {project.highlights.map((item) => {
                    const mentionsEcai = item.includes('ECAI 2026');
                    return (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 font-mono text-xs leading-relaxed text-[#E2F1F8]/95 sm:text-sm"
                      >
                        <CheckCircle2
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            mentionsEcai ? 'text-[#FF6B00]' : 'text-[#00F0FF]'
                          }`}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Footer: Stack & Direct GitHub Launch */}
              <div className="mt-7 flex flex-col justify-between gap-4 border-t border-[#00F0FF]/25 pt-5 sm:flex-row sm:items-center">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-[#00F0FF]/30 bg-[#00F0FF]/10 px-2.5 py-1 font-mono text-xs text-[#00F0FF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
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
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
