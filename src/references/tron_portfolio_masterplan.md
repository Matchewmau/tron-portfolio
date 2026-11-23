# MASTERPLAN: "INTO THE GRID" — TRON: LEGACY DEVELOPER PORTFOLIO
**Owner:** John Mathew B. Mauricio  
**Designation:** Web Developer | Programmer | AI Researcher  
**Location:** Zamboanga City, Philippines  
**Target Stack:** React 18+, TypeScript, Vite, Tailwind CSS, Framer Motion, Web Audio API  

---

## 1. Vision & Creative Direction
This portfolio translates **John Mathew B. Mauricio’s** software engineering and AI research profile into an interactive **Tron: Legacy ("Into the Grid")** Heads-Up Display (HUD). Rather than relying on generic neon cyberpunk tropes, the design adheres strictly to the film's visual discipline: deep obsidian voids, razor-sharp 45-degree chamfered geometry, perspective horizon grids, and intentional color-coding that separates **User Identity (Electric Cyan)** from **High-Prestige Milestones (Rinzler Amber-Orange)**.

### Core Aesthetic Pillars
1. **The Void & Glassmorphic HUDs:** Deep obsidian canvas (`#02060B`) layered with translucent dark-slate panels (`rgba(7, 19, 29, 0.75)`), subtle grid-line borders, and hardware-accelerated `backdrop-blur`.
2. **Purposeful Color Hierarchy:**
   - **Primary User Accent (`#00F0FF` Electric Cyan):** Interactive nodes, active states, Identity Disc rings, and primary telemetry.
   - **Prestige / Program Accent (`#FF6B00` Rinzler Orange):** Reserved strictly for top-tier credentials (**ECAI 2026 International Publication** and **Civil Service Professional Eligibility**) to draw immediate recruiter attention.
3. **Tactile Telemetry & Sound Design:** Optional zero-dependency Web Audio API synth sound effects (subtle low-pass UI clicks and hover hums, muted by default) paired with laser-scan hover sweeps.

---

## 2. Project Architecture & Directory Structure

```text
tron-portfolio/
├── public/
│   └── favicon.svg                  # Minimalist cyan Identity Disc SVG icon
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   └── TheGridFloor.tsx     # CSS 3D perspective receding horizon grid + mouse tilt
│   │   ├── layout/
│   │   │   ├── BootSequence.tsx     # Skippable 2s terminal boot screen (sessionStorage cached)
│   │   │   ├── HudNavbar.tsx        # Sticky telemetry bar, section links, audio synth toggle
│   │   │   └── LightCycleRail.tsx   # Top-viewport glowing cyan scroll-progress beam
│   │   ├── sections/
│   │   │   ├── HeroIdentity.tsx     # Identity Disc SVG, designation, online status, CTAs
│   │   │   ├── ConstructNodes.tsx   # Interactive project cards + detailed HUD modal
│   │   │   ├── SystemMatrix.tsx     # 4-quadrant technical arsenal matrix
│   │   │   ├── CredentialsHub.tsx   # Education, CSC Eligibility, ECAI 2026, Dialects
│   │   │   └── CommsUplink.tsx      # Terminal contact form & one-click copy links
│   │   └── ui/
│   │       ├── ChamferCard.tsx      # Reusable 45-degree angled-corner HUD container
│   │       ├── NeonBadge.tsx        # Cyan & Rinzler Orange status/credential chips
│   │       └── SectionHeader.tsx    # Standardized `// 01_SECTION_NAME` HUD header
│   ├── data/
│   │   └── portfolioData.ts         # Strongly-typed resume data, metrics & links
│   ├── hooks/
│   │   └── useTronAudio.ts          # Web Audio API procedural UI click/hover synthesizer
│   ├── styles/
│   │   └── grid-effects.css         # Custom clip-paths, scanline animations, neon glows
│   ├── App.tsx                      # Main layout orchestrator & modal state
│   └── main.tsx                     # Entry point
├── index.html                       # Google Fonts (Orbitron & JetBrains Mono) + SEO metadata
├── tailwind.config.ts               # Custom colors, font families, box-shadow glows
└── package.json
```

---

## 3. Design System & Tokens

### Typography
- **Display & Headings:** `Orbitron` (Weights: `500`, `700`, `900`) — Uppercase, wide letter-spacing (`0.12em`), geometric precision.
- **Body, Metrics & Terminal Logs:** `JetBrains Mono` (Weights: `400`, `500`, `700`) — Monospaced legibility for technical stacks, performance metrics, and system status readouts.

### Color Tokens (`tailwind.config.ts`)
| Token Name | Hex / RGBA | Usage |
| :--- | :--- | :--- |
| `grid-void` | `#02060B` | Main page background |
| `grid-panel` | `rgba(7, 19, 29, 0.75)` | HUD card surface |
| `grid-cyan` | `#00F0FF` | Primary borders, active links, user highlights |
| `grid-cyan-dim` | `rgba(0, 240, 255, 0.2)` | Subtle structural grid lines & inactive borders |
| `grid-orange` | `#FF6B00` | High-prestige badges (ECAI 2026, CSC Professional) |
| `grid-text` | `#E2F1F8` | Primary readable copy |
| `grid-muted` | `#7A9BB0` | Secondary metadata, dates, and subtitles |

### Signature CSS Geometry & Motion
- **Chamfered Corners (`clip-path`):**
  ```css
  .clip-chamfer {
    clip-path: polygon(
      14px 0, 100% 0, 
      100% calc(100% - 14px), calc(100% - 14px) 100%, 
      0 100%, 0 14px
    );
  }
  ```
- **Laser-Scan Hover:** A `2px` horizontal cyan gradient bar (`linear-gradient(90deg, transparent, #00F0FF, transparent)`) that sweeps vertically across project cards on hover.
- **Identity Disc SVG:** Dual concentric SVG rings with dashed circuit segments rotating in opposite directions (`animate-spin-slow` and `animate-reverse-spin`).

---

## 4. Resume Content Mapping

### Section 01: `// IDENTITY` (Hero)
- **Header:** `JOHN MATHEW B. MAURICIO`
- **Role:** `WEB DEVELOPER // PROGRAMMER // AI RESEARCHER`
- **Status Telemetry:** `STATUS: ONLINE // OPEN TO REMOTE & ON-SITE (ZAMBOANGA CITY, PH)`
- **Executive Summary:** Computer Science graduate (Western Mindanao State University) and Career Service Professional Eligible software developer experienced in full-stack web architecture, database optimization, and computer vision deep learning solutions presented internationally at **ECAI 2026**.
- **Primary Actions:** `[ INSPECT_CONSTRUCTS ]`, `[ INITIATE_UPLINK ]`, and direct GitHub link (`github.com/matchewmau`).

### Section 02: `// CONSTRUCT_NODES` (Projects & Research)
1. **NODE_01: HairMixer — AI-Powered Hairstyle Recommendation & Simulation System**
   - **Timeline & Role:** May 2026 | Lead Developer & Lead Researcher
   - **Stack:** `Python` `ResNet50` `OpenCV` `React.js` `FastAPI`
   - **Key Telemetry:**
     - **40% Latency Reduction:** Engineered full-stack simulation pipeline minimizing client-side inference and rendering overhead.
     - **ECAI 2026 Publication (Orange Highlight):** Authored peer-reviewed manuscript *"HairMixer: A Hairstyle Recommendation and Simulation System Based on Facial Structure Using CNNs"*, accepted for international presentation and publication.
     - **CV Pipeline:** Multi-class facial structure classification and landmark mapping using ResNet50 and OpenCV.
2. **NODE_02: PConnect — B2B Distribution & E-Commerce Platform**
   - **Timeline & Role:** Mar. 2025 – Sept. 2026 | Project Manager & Lead Developer
   - **Stack:** `Laravel` `PHP` `MySQL` `JavaScript` `Tailwind CSS`
   - **Key Telemetry:**
     - **35% Overhead Reduction:** Automated multi-tier transaction commissions, RBAC, and real-time inventory sync for regional suppliers and bulk retailers.
     - **Sub-200ms API Response:** Optimized Eloquent ORM queries, database indexing, and REST endpoints under heavy transactional reads.
3. **NODE_03: TJ Fitness — Full-Stack Gym Management System**
   - **Timeline & Role:** Aug. 2024 – Nov. 2024 | Full-Stack Developer
   - **Stack:** `PHP` `MySQL` `JavaScript` `Tailwind CSS` `Git`
   - **Key Telemetry:**
     - **Automated Operations:** Centralized member onboarding, subscription renewals, daily attendance, and financial tracking with automated expiry alerts.
     - **Modular MVC:** Standardized Git branch workflows and clean MVC architecture.

### Section 03: `// SYSTEM_ARSENAL` (Technical Skills Matrix)
- **Quadrant 01 — Core Languages:** Python, JavaScript (ES6+), TypeScript, PHP, C++, SQL (MySQL, PostgreSQL), HTML5, CSS3
- **Quadrant 02 — Frameworks & Runtime:** React.js, Next.js, Node.js, Express.js, Laravel, Django, FastAPI, Tailwind CSS
- **Quadrant 03 — AI & Computer Vision:** Convolutional Neural Networks (CNNs), ResNet50, OpenCV, Deep Learning, Generative AI & LLM APIs
- **Quadrant 04 — Infrastructure & Ops:** Git, GitHub, Docker, Postman, Linux/Bash CLI, Vercel, Figma (UI/UX Prototyping), RESTful APIs

### Section 04: `// VERIFICATION_PROTOCOLS` (Education & Credentials)
- **Academic Node:** Bachelor of Science in Computer Science — *Western Mindanao State University* (2022–2026 | Zamboanga City, PH)
  - *Relevant Coursework:* Data Structures & Algorithms, Software Engineering, Database Systems, Web Designing, Web Programming, Artificial Intelligence.
- **Verified Credentials:**
  - `[ORANGE]` **Civil Service Eligibility — Professional Level** (CSC PH)
  - `[ORANGE]` **Published Presenter: ECAI 2026 International Conference**
  - `[CYAN]` **Google Platform for AI: Gemini & Vercel** (Google Groups)
  - `[CYAN]` **Dual-Platform App Development** (DICT Region IX)
- **Communication Protocols (Languages & Dialects):** English, Filipino (Tagalog), Bisaya, Chavacano

### Section 05: `// COMMS_UPLINK` (Contact)
- **Direct Channels:**
  - Email: `johnmathewmau@gmail.com` (with one-click copy toast)
  - Phone: `+63 956 628 4039` (with one-click copy toast)
  - GitHub: `https://github.com/matchewmau`
- **Terminal Transmission Form:** Interactive form (`SENDER_ID`, `RETURN_ADDRESS`, `PAYLOAD_MESSAGE`) with simulated packet-transmission confirmation state.

---

## 5. Phased Execution Roadmap

### Phase 1: Environment & Design Foundation
- Initialize Vite + React + TypeScript project (`npm create vite@latest`).
- Install dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `framer-motion`, `lucide-react`.
- Configure `index.html` with `Orbitron` and `JetBrains Mono` fonts and dark `#02060B` background to prevent white flash on load.
- Implement `grid-effects.css` with chamfered `clip-path` classes, custom scrollbar styling, and scanline keyframes.

### Phase 2: The Grid Canvas & Layout Chrome
- Build `TheGridFloor.tsx` using a CSS 3D transformed receding grid (`perspective: 600px; rotateX(65deg)`) with subtle parallax movement on pointer move.
- Build `BootSequence.tsx` (2-second terminal initialization with `[SKIP_INTRO]` button and `sessionStorage` check).
- Build `HudNavbar.tsx` and `LightCycleRail.tsx` (scroll-linked cyan progress beam using Framer Motion's `useScroll` and `useSpring`).
- Implement `useTronAudio.ts` using native Web Audio API oscillators (sine/triangle blips) with a navbar mute/unmute toggle.

### Phase 3: Data Layer & Interactive Sections
- Create `src/data/portfolioData.ts` containing all structured resume data.
- Build `HeroIdentity.tsx` featuring the counter-rotating SVG Identity Disc and availability telemetry.
- Build `ConstructNodes.tsx` with laser-scan hover effects and an interactive `NodeInspectModal` displaying architectural highlights and metrics.
- Build `SystemMatrix.tsx`, `CredentialsHub.tsx`, and `CommsUplink.tsx`.

### Phase 4: QA, Performance & Deployment
- Add `@media (prefers-reduced-motion: reduce)` fallbacks to pause background grid motion and disc rotations for accessibility.
- Verify mobile viewport responsiveness (`375px` up to `1440px+`) ensuring chamfered cards never clip text.
- Run production build (`npm run build`), verify Lighthouse performance/accessibility scores (95+), and deploy to **Vercel**.