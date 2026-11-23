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
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2.5px] bg-[#0D1928]/70"
    >
      <motion.div
        style={{ scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress }}
        className="h-full w-full origin-left bg-gradient-to-r from-[#38D9F5]/55 via-[#38D9F5] to-[#BDF3FD] shadow-[0_0_12px_rgba(56,217,245,0.65)]"
      />
    </div>
  );
}
