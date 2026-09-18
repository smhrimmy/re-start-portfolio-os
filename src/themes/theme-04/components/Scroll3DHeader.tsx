import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Send } from 'lucide-react';
import { soundSynth } from '../soundSynth';

interface Scroll3DHeaderProps {
  scrollProgress: number;
}

export const Scroll3DHeader: React.FC<Scroll3DHeaderProps> = ({ scrollProgress }) => {
  const [isMuted, setIsMuted] = useState(soundSynth.getMuted());
  const scrollPercent = Math.round(scrollProgress * 100);

  const handleToggleSound = () => {
    const muted = soundSynth.toggleMute();
    setIsMuted(muted);
  };

  const handleScrollTo = (id: string) => {
    soundSynth.playClick(720);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#07080b]/85 backdrop-blur-md border-b border-[#f59e0b]/20 py-3 px-4 sm:px-8 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-mono-jetbrains text-xs">
        {/* Left Monogram SVG Logo */}
        <button
          onClick={() => handleScrollTo('hero')}
          onMouseEnter={() => soundSynth.playHover()}
          className="flex items-center gap-3 text-[#f3f4f6] hover:text-[#f59e0b] transition-colors text-left group"
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg viewBox="0 0 56 61" className="w-8 h-8 text-[#f59e0b] transition-transform group-hover:scale-110">
              <path
                fill="currentColor"
                d="M3 14 24 2C28 0 28 0 32 2L53 14C56 16 56 17 56 19L56 43C56 46 55 47 51 49L32 59C28 61 28 61 24 59L5 49C1 47 0 46 0 43L0 19C0 17 0 16 3 14M28 4 5 17 28 28 51 17 28 4M53 20 30 31 30 56 53 44 53 20M40 42 33 35C33 35 32 34 33 33 34 32 35 33 36 34L36 34 43 41C44 42 44 42 43 43L35 51C35 51 34 52 33 51 32 50 33 49 33 49L40 42M16 42 23 35C23 35 24 34 23 33 22 32 21 33 20 34L13 41C12 42 12 42 13 43L21 51C21 51 22 52 23 51 24 50 23 49 23 49L16 42"
              />
            </svg>
          </div>
          <div>
            <span className="font-bold tracking-widest text-sm block leading-none text-white group-hover:text-[#f59e0b] transition-colors">
              PRAJWAL DL
            </span>
            <span className="text-[10px] text-[#9ca3af] block mt-0.5 font-mono-jetbrains">
              3D SCROLL EXPERIENCE
            </span>
          </div>
        </button>

        {/* Center Live Telemetry (Desktop) */}
        <div className="hidden md:flex items-center gap-6 px-4 py-1.5 bg-[#111319] border border-[#f59e0b]/20 rounded-full text-[11px] text-[#9ca3af]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
            <span>
              SCROLL: <strong className="text-[#f59e0b]">{String(scrollPercent).padStart(3, '0')}%</strong>
            </span>
          </div>
          <span className="text-neutral-700">|</span>
          <div className="flex items-center gap-1.5 text-[#00f0ff]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WEBGL CAMERA DOLLY</span>
          </div>
        </div>

        {/* Right Nav Actions + Sound Synth Switch */}
        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="hidden sm:flex items-center gap-4 text-neutral-400">
            <button
              onClick={() => handleScrollTo('hero')}
              onMouseEnter={() => soundSynth.playHover()}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleScrollTo('about')}
              onMouseEnter={() => soundSynth.playHover()}
              className="hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleScrollTo('projects')}
              onMouseEnter={() => soundSynth.playHover()}
              className="hover:text-white transition-colors"
            >
              Work
            </button>
          </nav>

          {/* Sound Synthesizer Audio Button */}
          <button
            type="button"
            onClick={handleToggleSound}
            title={isMuted ? 'Unmute Audio Feedback' : 'Mute Audio Feedback'}
            className="p-2 bg-[#111319] hover:bg-[#1a1d26] border border-[#f59e0b]/30 text-[#f59e0b] rounded-full transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-[#f59e0b] animate-pulse" />}
          </button>

          <button
            onClick={() => handleScrollTo('contact')}
            onMouseEnter={() => soundSynth.playHover()}
            className="amber-glow-pill px-4 py-2 rounded-full font-sans font-semibold text-xs inline-flex items-center gap-2 min-h-[44px]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </div>
      </div>
    </header>
  );
};
