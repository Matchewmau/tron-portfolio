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
      <div className="relative min-h-screen bg-[#07101B] font-sans text-[#F1F6FA]">
        {/* Skip to Content Link for Keyboard Accessibility */}
        <a
          href="#identity"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded focus:border focus:border-[#38D9F5] focus:bg-[#07101B] focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-[#7CE7FA]"
        >
          Skip to main content
        </a>

        {/* Brief Skippable Welcome Loader (sessionStorage persisted) */}
        <BootSequence />

        {/* Fixed Top Light-Cycle Scroll Progress Beam */}
        <LightCycleRail />

        {/* Calm 3D Perspective Floor Grid */}
        <TheGridFloor />

        {/* Sticky Frosted Navigation Bar */}
        <HudNavbar />

        {/* Primary Portfolio Sections */}
        <main className="relative z-10">
          <HeroIdentity />
          <ConstructNodes />
          <SystemSubroutines />
          <VerificationProtocols />
          <CommsUplink />
        </main>

        {/* Footer */}
        <HudFooter />
      </div>
    </TronAudioProvider>
  );
}

export default App;
