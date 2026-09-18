import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PortfolioIdentity } from '@/types/portfolio';

interface Theme05HeroProps {
  identity: PortfolioIdentity;
}

export const Theme05Hero: React.FC<Theme05HeroProps> = ({ identity }) => {
  const [turbulenceSeed, setTurbulenceSeed] = useState(1);
  const [distortionScale, setDistortionScale] = useState(0);

  const headlineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!headlineRef.current) return;
    const rect = headlineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Reacting strength to cursor proximity inside element
    const distFromCenter = Math.sqrt(Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2));
    const maxDist = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));
    const intensity = Math.max(0, 1 - distFromCenter / maxDist);

    setTurbulenceSeed((prev) => (prev % 100) + 1);
    setDistortionScale(intensity * 40);
  };

  const handleMouseLeave = () => {
    setDistortionScale(0);
  };

  // Magnetic hover state positions for tag words
  const [mousePos1, setMousePos1] = useState({ x: 0, y: 0 });
  const [mousePos2, setMousePos2] = useState({ x: 0, y: 0 });
  const [mousePos3, setMousePos3] = useState({ x: 0, y: 0 });

  const handleTagMouseMove = (e: React.MouseEvent<HTMLDivElement>, setPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section id="hero" className="hero-cream-section min-h-screen relative flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 select-none overflow-hidden">
      {/* SVG Liquid Distortion Filter Definition */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-distortion">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.05"
              numOctaves="2"
              seed={turbulenceSeed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={distortionScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Main Headline Block */}
      <div className="max-w-7xl mx-auto w-full my-auto space-y-4">
        {/* CREATIVE Liquid Headline */}
        <div
          ref={headlineRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="liquid-headline font-display-archivo text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] leading-none tracking-tight text-[#111111] uppercase cursor-pointer"
          style={{
            filter: distortionScale > 0 ? 'url(#liquid-distortion)' : 'none',
          }}
        >
          CREATIVE
        </div>

        {/* DEVELOPER Solid Headline */}
        <div className="font-display-archivo text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight text-[#111111] uppercase opacity-90 pl-1">
          DEVELOPER
        </div>

        {/* Three Magnetic Tag Words */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-8 font-mono-jetbrains text-xs sm:text-sm font-bold tracking-[0.15em] text-[#111111]">
          {/* Tag 1: VISUALS */}
          <div
            onMouseMove={(e) => handleTagMouseMove(e, setMousePos1)}
            className="magnetic-tag px-6 py-3 border border-[#111111]/20 rounded-full cursor-pointer"
          >
            <div
              className="magnetic-tag-bg"
              style={{ left: `${mousePos1.x}px`, top: `${mousePos1.y}px` }}
            />
            <span>VISUALS</span>
          </div>

          <span className="text-[#C9A876] font-extrabold text-lg">•</span>

          {/* Tag 2: CODE */}
          <div
            onMouseMove={(e) => handleTagMouseMove(e, setMousePos2)}
            className="magnetic-tag px-6 py-3 border border-[#111111]/20 rounded-full cursor-pointer"
          >
            <div
              className="magnetic-tag-bg"
              style={{ left: `${mousePos2.x}px`, top: `${mousePos2.y}px` }}
            />
            <span>CODE</span>
          </div>

          <span className="text-[#C9A876] font-extrabold text-lg">•</span>

          {/* Tag 3: EXPERIENCE */}
          <div
            onMouseMove={(e) => handleTagMouseMove(e, setMousePos3)}
            className="magnetic-tag px-6 py-3 border border-[#111111]/20 rounded-full cursor-pointer"
          >
            <div
              className="magnetic-tag-bg"
              style={{ left: `${mousePos3.x}px`, top: `${mousePos3.y}px` }}
            />
            <span>EXPERIENCE</span>
          </div>
        </div>
      </div>

      {/* Hero Bottom Footer Bar */}
      <div className="max-w-7xl mx-auto w-full pt-8 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 border-t border-[#111111]/10 font-mono-jetbrains text-xs text-[#111111]">
        {/* Bottom Left Corner */}
        <div className="space-y-1">
          <span className="font-script-caveat text-xl sm:text-2xl text-[#111111] block">
            © 2026 {identity.name || 'Prajwal DL'}
          </span>
          <div className="flex items-center gap-2 font-mono-jetbrains text-[10px] text-[#555555]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
            <span>AVAILABLE FOR CREATIVE CONTRACTS & FULL-TIME ROLES</span>
          </div>
        </div>

        {/* Center Scroll Indicator */}
        <a
          href="#about"
          className="hidden md:flex flex-col items-center gap-2 hover:text-[#C9A876] transition-colors group"
        >
          <span className="text-[10px] tracking-[0.25em] font-bold uppercase">SCROLL TO EXPLORE</span>
          <div className="w-8 h-8 rounded-full border border-[#111111]/20 flex items-center justify-center group-hover:border-[#C9A876]">
            <ArrowDown className="w-4 h-4 animate-bounce text-[#111111] group-hover:text-[#C9A876]" />
          </div>
        </a>

        {/* Bottom Right Corner Rotating Circular Badge (~90px) */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-[#666666] block">LOCATION</span>
            <strong className="text-xs font-bold block">{identity.location || 'MANGALORE, INDIA'}</strong>
          </div>

          <a
            href="#contact"
            className="relative w-24 h-24 rounded-full bg-[#111111] text-[#F0EBE1] hover:bg-[#C9A876] hover:text-[#111111] transition-colors flex items-center justify-center shadow-xl group min-h-[44px] min-w-[44px]"
          >
            {/* Curved Rotating SVG Text */}
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-badge absolute inset-0">
              <path
                id="textPathHeroBadge"
                d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text fill="currentColor" fontSize="9.5" fontWeight="bold" letterSpacing="1.5">
                <textPath href="#textPathHeroBadge" startOffset="0%">
                  LET'S WORK TOGETHER • LET'S WORK TOGETHER •
                </textPath>
              </text>
            </svg>

            {/* Fixed Center Arrow */}
            <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
