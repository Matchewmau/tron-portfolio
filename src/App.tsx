import { TheGridFloor } from './components/canvas/TheGridFloor';
import { BootSequence } from './components/layout/BootSequence';
import { HudFooter } from './components/layout/HudFooter';
import { HudNavbar } from './components/layout/HudNavbar';
import { LightCycleRail } from './components/layout/LightCycleRail';
import { CommsUplink } from './components/sections/CommsUplink';
import { ConstructNodes } from './components/sections/ConstructNodes';
import { HeroIdentity } from './components/sections/HeroIdentity';
import { SystemSubroutines } from './components/sections/SystemSubroutines';
import { VerificationProtocols } from './components/sections/VerificationProtocols';
import { TronAudioProvider } from './context/AudioContext';

export function App() {
  return (
    <TronAudioProvider>
      <div className="relative min-h-screen bg-[#02060B] text-[#E2F1F8]">
        {/* Skip to Content Link for Keyboard Accessibility */}
        <a
          href="#identity"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:border focus:border-[#00F0FF] focus:bg-[#02060B] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-[#00F0FF]"
        >
          SKIP_TO_MAIN_HUD
        </a>

        {/* Fast 2s Terminal Boot Sequence (sessionStorage persisted) */}
        <BootSequence />

        {/* Fixed Top Light-Cycle Scroll Progress Beam */}
        <LightCycleRail />

        {/* 3D Perspective Receding Neon Floor Grid */}
        <TheGridFloor />

        {/* Sticky Glassmorphic HUD Navbar */}
        <HudNavbar />

        {/* Primary HUD Sections */}
        <main className="relative z-10">
          <HeroIdentity />
          <ConstructNodes />
          <SystemSubroutines />
          <VerificationProtocols />
          <CommsUplink />
        </main>

        {/* System Footer */}
        <HudFooter />
      </div>
    </TronAudioProvider>
  );
}

export default App;
