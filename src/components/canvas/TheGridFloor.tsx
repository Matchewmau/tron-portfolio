import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export function TheGridFloor() {
  const prefersReducedMotion = useReducedMotion();

  const rawRotateY = useMotionValue(0);
  const rawTranslateX = useMotionValue(0);
  const rawTranslateY = useMotionValue(0);

  const rotateY = useSpring(rawRotateY, { stiffness: 60, damping: 22 });
  const translateX = useSpring(rawTranslateX, { stiffness: 55, damping: 24 });
  const translateY = useSpring(rawTranslateY, { stiffness: 55, damping: 24 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      const normX = event.clientX / window.innerWidth - 0.5;
      const normY = event.clientY / window.innerHeight - 0.5;

      rawRotateY.set(normX * 4.5);
      rawTranslateX.set(normX * -24);
      rawTranslateY.set(normY * -12);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [prefersReducedMotion, rawRotateY, rawTranslateX, rawTranslateY]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#02060B]"
    >
      {/* Ambient Atmospheric Horizon Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 38%, rgba(0, 240, 255, 0.11) 0%, rgba(7, 19, 29, 0.45) 38%, rgba(2, 6, 11, 0.98) 76%)',
        }}
      />

      {/* Subtle Upper Ceiling Telemetry Grid */}
      <div
        className="absolute inset-x-0 top-0 h-[36vh] opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 240, 255, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.12) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)',
        }}
      />

      {/* Horizon Laser Seam */}
      <div className="absolute inset-x-0 top-[54%] h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/45 to-transparent shadow-[0_0_20px_rgba(0,240,255,0.55)]" />

      {/* 3D Perspective Receding Floor Grid */}
      <div
        className="absolute inset-x-[-30%] bottom-[-24%] top-[54%]"
        style={{ perspective: '620px' }}
      >
        <motion.div
          style={
            prefersReducedMotion
              ? { rotateX: 68 }
              : {
                  rotateX: 68,
                  rotateY,
                  x: translateX,
                  y: translateY,
                }
          }
          className="tron-perspective-plane h-[190%] w-full origin-top"
        />
        {/* Horizon & Edge Vignette Mask */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #02060B 0%, transparent 24%, transparent 78%, #02060B 100%), linear-gradient(to right, #02060B 0%, transparent 18%, transparent 82%, #02060B 100%)',
          }}
        />
      </div>
    </div>
  );
}
