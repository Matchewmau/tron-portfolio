import { useState } from 'react';
import { Disc, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { useAudioHud } from '../../context/AudioContext';
import { portfolioData } from '../../data/portfolioData';

const NAV_LINKS = [
  { label: '// IDENTITY', href: '#identity' },
  { label: '// CONSTRUCTS', href: '#constructs' },
  { label: '// ARSENAL', href: '#arsenal' },
  { label: '// CREDENTIALS', href: '#credentials' },
  { label: '// UPLINK', href: '#uplink' },
] as const;

export function HudNavbar() {
  const { isEnabled, toggleAudio, playHover, playClick } = useAudioHud();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#00F0FF]/25 bg-[#07131D]/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand / Identity Callsign */}
        <a
          href="#identity"
          onMouseEnter={playHover}
          onClick={handleNavClick}
          className="group flex min-h-[44px] items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center border border-[#00F0FF]/45 bg-[#00F0FF]/10 text-[#00F0FF] shadow-neon-cyan transition-transform duration-150 group-hover:scale-105 clip-chamfer-sm">
            <Disc className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-[#E2F1F8] group-hover:text-[#00F0FF]">
              J.M. MAURICIO
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#00F0FF]">
              GRID_OS // PORTFOLIO
            </span>
          </div>
        </a>

        {/* Desktop Jump Links */}
        <nav aria-label="Primary HUD navigation" className="hidden lg:flex lg:items-center lg:gap-1">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={playHover}
              onClick={playClick}
              className="min-h-[44px] inline-flex items-center px-3 py-2 font-mono text-xs font-medium uppercase tracking-wider text-[#8BAEC4] transition-colors duration-150 hover:bg-[#00F0FF]/10 hover:text-[#00F0FF]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Telemetry + Web Audio Synth Toggle + Mobile Trigger */}
        <div className="flex items-center gap-2.5">
          {/* Live Status Indicator */}
          <div
            className="hidden items-center gap-2 border border-[#00F0FF]/25 bg-[#02060B]/70 px-3 py-1.5 sm:flex clip-chamfer-sm"
            aria-label={`System status: ${portfolioData.identity.statusTelemetry}`}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00F0FF]" />
            </span>
            <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#E2F1F8]">
              {portfolioData.identity.statusTelemetry}
            </span>
          </div>

          {/* Web Audio API Synthesizer Toggle */}
          <button
            type="button"
            onClick={toggleAudio}
            onMouseEnter={playHover}
            aria-pressed={isEnabled}
            aria-label={isEnabled ? 'Mute UI audio synthesizer' : 'Enable UI audio synthesizer'}
            title={isEnabled ? 'Audio Synth: ONLINE' : 'Audio Synth: MUTED'}
            className={`inline-flex min-h-[44px] items-center gap-2 border px-3 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-150 clip-chamfer-sm ${
              isEnabled
                ? 'border-[#00F0FF] bg-[#00F0FF]/20 text-[#00F0FF] shadow-neon-cyan'
                : 'border-[#00F0FF]/30 bg-[#02060B]/75 text-[#8BAEC4] hover:border-[#00F0FF]/60 hover:text-[#E2F1F8]'
            }`}
          >
            {isEnabled ? (
              <Volume2 className="h-4 w-4 text-[#00F0FF]" aria-hidden="true" />
            ) : (
              <VolumeX className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="hidden xl:inline">{isEnabled ? 'SYNTH: ON' : 'SYNTH: MUTED'}</span>
          </button>

          {/* Mobile Drawer Toggle */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setMobileMenuOpen((prev) => !prev);
            }}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-hud-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-[#00F0FF]/35 bg-[#02060B]/80 text-[#00F0FF] lg:hidden clip-chamfer-sm"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-hud-nav"
          aria-label="Mobile HUD navigation"
          className="border-t border-[#00F0FF]/25 bg-[#07131D]/95 px-4 py-4 backdrop-blur-md lg:hidden"
        >
          <div className="mb-3 flex items-center gap-2 border-b border-[#00F0FF]/15 pb-3 sm:hidden">
            <span className="h-2 w-2 rounded-full bg-[#00F0FF]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#00F0FF]">
              {portfolioData.identity.statusTelemetry}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="flex min-h-[44px] items-center border border-transparent px-3 py-2 font-mono text-xs font-medium uppercase tracking-widest text-[#E2F1F8] transition-colors hover:border-[#00F0FF]/35 hover:bg-[#00F0FF]/10 hover:text-[#00F0FF]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
