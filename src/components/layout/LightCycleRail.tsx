import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export function LightCycleRail() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] bg-[#07131D]/80"
    >
      <motion.div
        style={{ scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress }}
        className="h-full w-full origin-left bg-gradient-to-r from-[#00F0FF]/65 via-[#00F0FF] to-[#E2F1F8] shadow-[0_0_16px_rgba(0,240,255,0.95)]"
      />
    </div>
  );
}
