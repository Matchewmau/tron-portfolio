import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Pause, Play, Volume2, X } from 'lucide-react';
import tronDiscImg from '../../assets/tron-disc-clean.png';
import { useAudioHud } from '../../context/AudioContext';
import { portfolioData } from '../../data/portfolioData';
import { GlitchText } from '../ui/GlitchText';

const NAV_LINKS = [
  { label: 'About', href: '#identity', id: 'identity' },
  { label: 'Projects', href: '#constructs', id: 'constructs' },
  { label: 'Skills', href: '#arsenal', id: 'arsenal' },
  { label: 'Credentials', href: '#credentials', id: 'credentials' },
  { label: 'Contact', href: '#uplink', id: 'uplink' },
] as const;

const MINI_BAR_HEIGHTS = [35, 65, 95, 50, 100, 72, 55, 88, 60, 42];

export function HudNavbar() {
  const { isEnabled, volume, setVolume, toggleAudio, playHover, playClick } = useAudioHud();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('identity');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Track visible section so the glowing cyan highlight automatically follows scroll depth
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const highlightedSection = hoveredSection ?? activeSection;

  const handleNavClick = (sectionId: string) => {
    playClick();
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#38D9F5]/22 bg-[#050C16]/82 backdrop-blur-xl">
      {/* Single Clean Unified Navbar Row — Zero Redundant Inner Boxes */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Identity */}
        <a
          href="#identity"
          onMouseEnter={playHover}
          onClick={() => handleNavClick('identity')}
          className="group flex h-full shrink-0 items-center gap-3"
        >
          <img
            src={tronDiscImg}
            alt=""
            aria-hidden="true"
            className={`h-9 w-9 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 ${
              isEnabled ? 'animate-[spin_22s_linear_infinite]' : 'group-hover:rotate-45'
            }`}
          />
          <div className="flex flex-col">
            <GlitchText
              text="J.M. Mauricio"
              intensity="header"
              className="font-display text-xs font-semibold tracking-wider text-[#F1F6FA] group-hover:text-[#67EEFF] sm:text-sm"
            />
            <span className="font-sans text-[11px] text-[#8DA9BE]">
              Developer & AI Researcher
            </span>
          </div>
        </a>

        {/* Center: Consistent Section Links with Illuminated Cyan Top/Bottom Line Highlight */}
        <nav
          aria-label="Primary navigation"
          onMouseLeave={() => setHoveredSection(null)}
          className="hidden h-full md:flex md:items-center md:gap-1 lg:gap-2"
        >
          {NAV_LINKS.map((item) => {
            const isLit = highlightedSection === item.id;
            const isCurrent = activeSection === item.id;

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isCurrent ? 'location' : undefined}
                onMouseEnter={() => {
                  playHover();
                  setHoveredSection(item.id);
                }}
                onClick={() => handleNavClick(item.id)}
                className={`relative inline-flex h-full items-center justify-center px-3.5 font-sans text-sm font-medium transition-colors duration-150 lg:px-4 ${
                  isLit
                    ? 'text-white drop-shadow-[0_0_10px_rgba(103,238,255,0.75)]'
                    : 'text-[#9CB6CA] hover:text-[#F1F6FA]'
                }`}
              >
                {isLit && (
                  <motion.span
                    layoutId="hud-nav-active-highlight"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                  >
                    {/* Soft Cyan Vertical Light Wash */}
                    <span
                      className="absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(ellipse at center, rgba(82, 236, 255, 0.18) 0%, rgba(56, 217, 245, 0.04) 62%, transparent 82%)',
                      }}
                    />
                    {/* Top Glowing Cyan Bar */}
                    <span className="absolute top-0 left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-[#73F0FF] shadow-[0_0_10px_#38D9F5,0_2px_12px_rgba(82,236,255,0.9)]" />
                    {/* Bottom Glowing Cyan Bar Flush with the Navbar Line */}
                    <span className="absolute bottom-0 left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-[#73F0FF] shadow-[0_0_10px_#38D9F5,0_-2px_12px_rgba(82,236,255,0.9)]" />
                  </motion.span>
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Consistent Inline Music Controls & Mobile Trigger (Same Baseline & Typography as Nav Links) */}
        <div className="flex h-full shrink-0 items-center gap-3">
          <div className="hidden h-5 w-[1px] bg-[#38D9F5]/20 md:block" aria-hidden="true" />

          {/* Unified End of Line Button Matching Nav Item Typography & Glow */}
          <button
            type="button"
            onClick={toggleAudio}
            onMouseEnter={playHover}
            aria-pressed={isEnabled}
            aria-label={
              isEnabled ? 'Pause End of Line soundtrack' : 'Play End of Line soundtrack'
            }
            title={isEnabled ? 'Pause End of Line' : 'Play End of Line'}
            className={`relative inline-flex h-full items-center gap-2 px-2.5 font-sans text-sm font-medium transition-colors duration-150 ${
              isEnabled
                ? 'text-white drop-shadow-[0_0_10px_rgba(103,238,255,0.7)]'
                : 'text-[#9CB6CA] hover:text-[#F1F6FA]'
            }`}
          >
            {isEnabled && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-full -translate-x-1/2 rounded-full bg-[#73F0FF] shadow-[0_0_10px_#38D9F5]"
              />
            )}

            {isEnabled ? (
              <Pause className="h-3.5 w-3.5 fill-current text-[#67EEFF]" aria-hidden="true" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-current text-[#67EEFF]" aria-hidden="true" />
            )}

            <span>End of Line</span>

            {/* Inline Mini Equalizer Bars */}
            <span aria-hidden="true" className="hidden h-4 items-end gap-[2px] sm:flex">
              {MINI_BAR_HEIGHTS.map((pct, idx) => (
                <span
                  key={idx}
                  style={{
                    height: isEnabled ? `${pct}%` : '25%',
                    animationDelay: `${(idx % 4) * 90}ms`,
                  }}
                  className={`w-[2px] rounded-full transition-all duration-300 ${
                    isEnabled
                      ? idx % 3 === 0
                        ? 'eq-bar-1 bg-[#67EEFF]'
                        : idx % 3 === 1
                          ? 'eq-bar-2 bg-[#38D9F5]'
                          : 'eq-bar-3 bg-[#FB923C]'
                      : 'bg-[#38D9F5]/30'
                  }`}
                />
              ))}
            </span>
          </button>

          {/* Clean Inline Volume Control */}
          <div className="hidden items-center gap-1.5 lg:flex">
            <Volume2 className="h-3.5 w-3.5 shrink-0 text-[#7CE7FA]" aria-hidden="true" />
            <input
              type="range"
              min={0.02}
              max={0.5}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Music volume"
              title={`Music Volume: ${Math.round((volume / 0.5) * 100)}%`}
              className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-[#162B40] accent-[#38D9F5]"
            />
          </div>

          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setMobileMenuOpen((prev) => !prev);
            }}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-hud-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded text-[#7CE7FA] transition-colors hover:bg-[#38D9F5]/10 hover:text-white md:hidden"
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
          className="border-t border-[#38D9F5]/18 bg-[#050C16]/95 px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <div className="mb-3 flex items-center justify-between gap-3 border-b border-[#38D9F5]/12 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#38D9F5]" aria-hidden="true" />
              <span className="font-mono text-xs text-[#7CE7FA]">
                {portfolioData.identity.statusTelemetry}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Volume2 className="h-3.5 w-3.5 text-[#7CE7FA]" aria-hidden="true" />
              <input
                type="range"
                min={0.02}
                max={0.5}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Mobile music volume"
                className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-[#162B40] accent-[#38D9F5]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => {
              const isCurrent = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex min-h-[44px] items-center justify-between rounded-md px-3 py-2 font-sans text-sm font-medium transition-colors ${
                    isCurrent
                      ? 'bg-[#38D9F5]/12 text-white'
                      : 'text-[#C5DAE9] hover:bg-[#38D9F5]/10 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isCurrent && (
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-[#67EEFF] shadow-[0_0_8px_#38D9F5]"
                    />
                  )}
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
