import React from 'react';
import { Box, Sparkles, Terminal, Send } from 'lucide-react';

interface Scroll3DHeaderProps {
  scrollProgress: number;
}

export const Scroll3DHeader: React.FC<Scroll3DHeaderProps> = ({ scrollProgress }) => {
  const scrollPercent = Math.round(scrollProgress * 100);

  const handleScrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#07080b]/80 backdrop-blur-md border-b border-[#f59e0b]/20 py-3.5 px-4 sm:px-8 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-mono-jetbrains text-xs">
        {/* Left Monogram */}
        <button
          onClick={() => handleScrollTo('hero')}
          className="flex items-center gap-2.5 text-[#f3f4f6] hover:text-[#f59e0b] transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b]">
            <Box className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="font-bold tracking-wider text-sm block leading-none">PRAJWAL DL</span>
            <span className="text-[10px] text-[#9ca3af] block mt-0.5">3D SCROLL EXPERIENCE</span>
          </div>
        </button>

        {/* Center Live Telemetry (Desktop) */}
        <div className="hidden md:flex items-center gap-6 px-4 py-1.5 bg-[#111319] border border-[#f59e0b]/20 rounded-full text-[11px] text-[#9ca3af]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
            <span>SCROLL: <strong className="text-[#f59e0b]">{String(scrollPercent).padStart(3, '0')}%</strong></span>
          </div>
          <span className="text-neutral-700">|</span>
          <div className="flex items-center gap-1.5 text-[#00f0ff]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WEBGL CAMERA DOLLY</span>
          </div>
        </div>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="hidden sm:flex items-center gap-5 text-neutral-400">
            <button onClick={() => handleScrollTo('projects')} className="hover:text-white transition-colors">
              Projects
            </button>
            <button onClick={() => handleScrollTo('skills')} className="hover:text-white transition-colors">
              Capabilities
            </button>
            <button onClick={() => handleScrollTo('experience')} className="hover:text-white transition-colors">
              Timeline
            </button>
          </nav>

          <button
            onClick={() => handleScrollTo('contact')}
            className="amber-glow-pill px-4 py-2 rounded-full font-sans font-semibold text-xs inline-flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </div>
      </div>
    </header>
  );
};
