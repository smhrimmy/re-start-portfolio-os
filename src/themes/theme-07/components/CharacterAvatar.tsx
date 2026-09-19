import React, { useState, useEffect } from 'react';

interface CharacterAvatarProps {
  mode: 'focused' | 'builder';
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ mode, className = '' }) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`relative group transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateY(${mouseOffset.x * 0.5}deg) rotateX(${-mouseOffset.y * 0.5}deg)`,
      }}
    >
      {/* Outer Holographic Glow Frame */}
      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#249BFF]/30 via-[#69D9FF]/20 to-[#D8955D]/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main Glass Card Wrapper */}
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#0D1724]/80 backdrop-blur-md p-2 shadow-2xl">
        {/* Character Image Container with Crop per Mode */}
        <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden rounded-xl bg-[#07090D]">
          <img
            src="/assets/character-reference.png"
            alt="Prajwal DL — The Digital Architect"
            className={`w-full h-full object-cover transition-all duration-700 ${
              mode === 'focused'
                ? 'object-left scale-105 filter brightness-105 contrast-105'
                : 'object-right scale-105 filter brightness-105 contrast-105'
            }`}
          />

          {/* Ambient Lighting Overlay Shaders */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#249BFF]/20 via-transparent to-[#D8955D]/20 mix-blend-overlay" />

          {/* Mode Badge Indicator */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full animate-ping ${mode === 'focused' ? 'bg-[#249BFF]' : 'bg-[#D8955D]'}`} />
            <span className="text-[11px] font-mono tracking-wider text-white uppercase">
              {mode === 'focused' ? 'Focused Mode' : 'Builder Mode'}
            </span>
          </div>

          {/* Rotating Circular Brand Ring */}
          <div className="absolute bottom-4 right-4 w-16 h-16 pointer-events-none opacity-80 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#69D9FF]">
              <path
                id="textPath"
                d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text fontSize="10" fontWeight="bold" fill="currentColor" letterSpacing="2">
                <textPath href="#textPath">
                  THE DIGITAL ARCHITECT •
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        {/* Bottom Technical Status Bar */}
        <div className="mt-2 px-3 py-2 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[#91A0AD]">STATUS</span>
          </div>
          <span className="text-[#F2F5F7] font-semibold">AVAILABLE FOR PROJECTS</span>
        </div>
      </div>
    </div>
  );
};
