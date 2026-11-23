# INTO THE GRID — John Mathew B. Mauricio Portfolio

Production developer portfolio inspired by the **Tron: Legacy ("Into the Grid")** HUD aesthetic, engineered with **React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React, and the Web Audio API**.

## Key Features
- **3D Perspective Horizon Grid:** Mouse-reactive receding neon-cyan floor grid powered by Framer Motion springs (`prefers-reduced-motion` aware).
- **Chamfered HUD Architecture:** Crisp 45-degree angled borders (`clip-path`), glassmorphic slate surfaces, laser-scan hover sweeps, and purposeful color hierarchy (`#00F0FF` User Cyan vs `#FF6B00` Rinzler Prestige Amber-Orange).
- **Zero-Dependency Web Audio Synth:** Optional procedural UI click/hover/transmission synthesizer (`useTronAudio`), muted by default.
- **Interactive Case-Study Inspector:** Detailed HUD modal (`INSPECT_NODE`) showcasing system architecture layers and quantified performance metrics (**HairMixer ECAI 2026**, **PConnect**, **TJ Fitness**).
- **Skippable Terminal Boot & Uplink:** 2-second `sessionStorage`-cached boot loader and validated `> ENTER_TRANSMISSION` contact terminal with one-click clipboard copy.

## Commands

```bash
npm install      # Install dependencies
npm run dev      # Start local Vite dev server
npm run test     # Run Vitest suite
npm run build    # Type-check & build production bundle
npm run preview  # Preview production build locally
```
