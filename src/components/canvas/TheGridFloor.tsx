import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export function TheGridFloor() {
  const prefersReducedMotion = useReducedMotion();

  const rawRotateY = useMotionValue(0);
  const rawTranslateX = useMotionValue(0);
  const rawTranslateY = useMotionValue(0);

  const rotateY = useSpring(rawRotateY, { stiffness: 45, damping: 26 });
  const translateX = useSpring(rawTranslateX, { stiffness: 45, damping: 28 });
  const translateY = useSpring(rawTranslateY, { stiffness: 45, damping: 28 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      const normX = event.clientX / window.innerWidth - 0.5;
      const normY = event.clientY / window.innerHeight - 0.5;

      rawRotateY.set(normX * 2.8);
      rawTranslateX.set(normX * -16);
      rawTranslateY.set(normY * -8);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [prefersReducedMotion, rawRotateY, rawTranslateX, rawTranslateY]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#07101B]"
    >
      {/* Soft Atmospheric Ambient Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 24%, rgba(56, 217, 245, 0.08) 0%, rgba(13, 25, 40, 0.45) 44%, rgba(7, 16, 27, 0.98) 80%)',
        }}
      />

      {/* Subtle Horizon Line */}
      <div className="absolute inset-x-0 top-[58%] h-[1px] bg-gradient-to-r from-transparent via-[#38D9F5]/20 to-transparent" />

      {/* Calm 3D Perspective Receding Floor Grid */}
      <div
        className="absolute inset-x-[-25%] bottom-[-24%] top-[58%]"
        style={{ perspective: '680px' }}
      >
        <motion.div
          style={
            prefersReducedMotion
              ? { rotateX: 70 }
              : {
                  rotateX: 70,
                  rotateY,
                  x: translateX,
                  y: translateY,
                }
          }
          className="tron-perspective-plane h-[190%] w-full origin-top"
        />
        {/* Soft Vignette Mask so foreground text always reads effortlessly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #07101B 0%, transparent 28%, transparent 72%, #07101B 100%), linear-gradient(to right, #07101B 0%, transparent 20%, transparent 80%, #07101B 100%)',
          }}
        />
      </div>
    </div>
  );
}
