import { useState } from 'react';
import { Disc, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { useAudioHud } from '../../context/AudioContext';
import { portfolioData } from '../../data/portfolioData';

const NAV_LINKS = [
  { label: 'About', href: '#identity' },
  { label: 'Projects', href: '#constructs' },
  { label: 'Skills', href: '#arsenal' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#uplink' },
] as const;

export function HudNavbar() {
  const { isEnabled, toggleAudio, playHover, playClick } = useAudioHud();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#38D9F5]/15 bg-[#0A1523]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Identity */}
        <a
          href="#identity"
          onMouseEnter={playHover}
          onClick={handleNavClick}
          className="group flex min-h-[44px] items-center gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center border border-[#38D9F5]/30 bg-[#38D9F5]/10 text-[#38D9F5] transition-transform duration-150 group-hover:scale-105 clip-chamfer-sm">
            <Disc className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <span className="font-display text-xs font-semibold tracking-wider text-[#F1F6FA] group-hover:text-[#38D9F5] sm:text-sm">
              J.M. Mauricio
            </span>
            <span className="font-sans text-[11px] text-[#A3BACB]">
              Developer & AI Researcher
            </span>
          </div>
        </a>

        {/* Clean Desktop Navigation */}
        <nav aria-label="Primary navigation" className="hidden md:flex md:items-center md:gap-1">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={playHover}
              onClick={playClick}
              className="inline-flex min-h-[44px] items-center rounded-md px-3.5 py-2 font-sans text-sm font-medium text-[#A3BACB] transition-colors duration-150 hover:bg-[#38D9F5]/10 hover:text-[#F1F6FA]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Status, Audio Synth Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-2.5">
          <div
            className="hidden items-center gap-2 border border-[#38D9F5]/20 bg-[#07101B]/70 px-3 py-1.5 lg:flex clip-chamfer-sm"
            aria-label={`Availability status: ${portfolioData.identity.statusTelemetry}`}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38D9F5] opacity-65" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38D9F5]" />
            </span>
            <span className="font-mono text-xs text-[#D5E6F2]">
              {portfolioData.identity.statusTelemetry}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleAudio}
            onMouseEnter={playHover}
            aria-pressed={isEnabled}
            aria-label={isEnabled ? 'Mute UI sound effects' : 'Enable UI sound effects'}
            title={isEnabled ? 'UI Sound: On' : 'UI Sound: Off'}
            className={`inline-flex min-h-[44px] items-center gap-2 border px-3 py-2 font-sans text-xs font-medium transition-all duration-150 clip-chamfer-sm ${
              isEnabled
                ? 'border-[#38D9F5]/60 bg-[#38D9F5]/15 text-[#7CE7FA] shadow-neon-cyan'
                : 'border-[#38D9F5]/20 bg-[#07101B]/70 text-[#A3BACB] hover:border-[#38D9F5]/45 hover:text-[#F1F6FA]'
            }`}
          >
            {isEnabled ? (
              <Volume2 className="h-4 w-4 text-[#38D9F5]" aria-hidden="true" />
            ) : (
              <VolumeX className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{isEnabled ? 'Sound On' : 'Sound Off'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              setMobileMenuOpen((prev) => !prev);
            }}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-hud-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-[#38D9F5]/25 bg-[#07101B]/80 text-[#7CE7FA] md:hidden clip-chamfer-sm"
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
          aria-label="Mobile navigation"
          className="border-t border-[#38D9F5]/15 bg-[#0A1523]/95 px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <div className="mb-3 flex items-center gap-2 border-b border-[#38D9F5]/12 pb-3">
            <span className="h-2 w-2 rounded-full bg-[#38D9F5]" aria-hidden="true" />
            <span className="font-mono text-xs text-[#7CE7FA]">
              {portfolioData.identity.statusTelemetry}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="flex min-h-[44px] items-center rounded-md px-3 py-2 font-sans text-sm font-medium text-[#F1F6FA] transition-colors hover:bg-[#38D9F5]/10 hover:text-[#7CE7FA]"
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
