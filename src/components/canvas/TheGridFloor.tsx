import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { SynthWaveVisualizer } from './SynthWaveVisualizer';

export function TheGridFloor() {
  const prefersReducedMotion = useReducedMotion();
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerTargetRef.current = {
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId = 0;
    let scrollOffset = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const drawGrid = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      pointerCurrentRef.current.x +=
        (pointerTargetRef.current.x - pointerCurrentRef.current.x) * 0.06;
      pointerCurrentRef.current.y +=
        (pointerTargetRef.current.y - pointerCurrentRef.current.y) * 0.06;

      const horizonY = h * 0.56 + pointerCurrentRef.current.y * -8;
      const vanishX = w * 0.52 + pointerCurrentRef.current.x * -32;
      const floorHeight = h - horizonY;

      ctx.clearRect(0, 0, w, h);

      // 1. Deep Obsidian-Midnight Sky & Horizon Atmosphere (Unobstructed Open View)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#040911');
      bgGrad.addColorStop(0.48, '#06111E');
      bgGrad.addColorStop(0.56, '#091C2E');
      bgGrad.addColorStop(0.72, '#050D17');
      bgGrad.addColorStop(1, '#03070D');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Horizon Cyan Atmospheric Mist
      const mistGrad = ctx.createLinearGradient(0, horizonY - 46, 0, horizonY + 58);
      mistGrad.addColorStop(0, 'rgba(56, 217, 245, 0)');
      mistGrad.addColorStop(0.45, 'rgba(56, 217, 245, 0.14)');
      mistGrad.addColorStop(0.5, 'rgba(92, 238, 255, 0.34)');
      mistGrad.addColorStop(0.58, 'rgba(56, 217, 245, 0.12)');
      mistGrad.addColorStop(1, 'rgba(7, 16, 27, 0)');
      ctx.fillStyle = mistGrad;
      ctx.fillRect(0, horizonY - 46, w, 104);

      // 3. 1-Point Perspective Converging Longitudinal Rays (Dual Cyan + Rinzler Amber Lanes)
      const numRays = 28;
      const bottomSpread = w * 2.5;

      for (let i = -numRays / 2; i <= numRays / 2; i++) {
        const norm = i / (numRays / 2);
        const bottomX = vanishX + norm * (bottomSpread * 0.5);
        const isAmberLane = i === -3 || i === -2 || i === -6 || i === 6 || i === 9;

        const lineGrad = ctx.createLinearGradient(vanishX, horizonY, bottomX, h);
        if (isAmberLane) {
          lineGrad.addColorStop(0, 'rgba(251, 146, 60, 0.12)');
          lineGrad.addColorStop(0.35, 'rgba(251, 146, 60, 0.42)');
          lineGrad.addColorStop(0.85, 'rgba(251, 146, 60, 0.52)');
          lineGrad.addColorStop(1, 'rgba(251, 146, 60, 0.22)');
        } else {
          const distFade = Math.max(0.18, 1 - Math.abs(norm) * 0.55);
          lineGrad.addColorStop(0, `rgba(56, 217, 245, ${(0.14 * distFade).toFixed(3)})`);
          lineGrad.addColorStop(0.4, `rgba(56, 217, 245, ${(0.38 * distFade).toFixed(3)})`);
          lineGrad.addColorStop(0.85, `rgba(56, 217, 245, ${(0.46 * distFade).toFixed(3)})`);
          lineGrad.addColorStop(1, `rgba(56, 217, 245, ${(0.18 * distFade).toFixed(3)})`);
        }

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = isAmberLane ? 1.35 : 1.05;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(bottomX, h);
        ctx.stroke();
      }

      // 4. Foreshortened Horizontal Perspective Depth Cross-Lines
      const horizontalRows = 16;
      for (let r = 0; r < horizontalRows; r++) {
        const rawT = ((r + scrollOffset) % horizontalRows) / horizontalRows;
        const perspT = Math.pow(rawT, 2.15);
        const y = horizonY + perspT * floorHeight;

        const rowAlpha = Math.min(0.44, rawT * 0.52) * (1 - perspT * 0.2);
        const isWarmCross = r % 5 === 2;

        ctx.strokeStyle = isWarmCross
          ? `rgba(251, 146, 60, ${(rowAlpha * 0.55).toFixed(3)})`
          : `rgba(56, 217, 245, ${rowAlpha.toFixed(3)})`;
        ctx.lineWidth = perspT > 0.65 ? 1.25 : 0.95;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 5. Razor-Sharp Glowing Cyan Horizon Laser Seam
      const seamGrad = ctx.createLinearGradient(0, horizonY, w, horizonY);
      seamGrad.addColorStop(0, 'rgba(56, 217, 245, 0.18)');
      seamGrad.addColorStop(0.2, 'rgba(82, 236, 255, 0.78)');
      seamGrad.addColorStop(0.5, 'rgba(186, 250, 255, 0.95)');
      seamGrad.addColorStop(0.8, 'rgba(82, 236, 255, 0.78)');
      seamGrad.addColorStop(1, 'rgba(56, 217, 245, 0.18)');

      ctx.strokeStyle = seamGrad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(w, horizonY);
      ctx.stroke();

      if (!prefersReducedMotion) {
        scrollOffset = (scrollOffset + 0.0045) % 1;
        frameId = window.requestAnimationFrame(drawGrid);
      }
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', resize);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#040911]"
    >
      {/* 1-Point Perspective Cyan & Amber Horizon Grid Canvas */}
      <canvas ref={gridCanvasRef} className="absolute inset-0 h-full w-full" />

      {/* Open-to-View Background Synthwave Rising Directly Above the Horizon Seam */}
      <SynthWaveVisualizer />
    </div>
  );
}
