import React, { useState, useRef, useEffect } from 'react';
import { PortfolioIdentity } from '@/types/portfolio';

interface Theme05HeroProps {
  identity: PortfolioIdentity;
}

export const Theme05Hero: React.FC<Theme05HeroProps> = ({ identity }) => {
  const [scale, setScale] = useState(0);
  const [baseFreq, setBaseFreq] = useState('0.0000 0.0000');
  const [seed, setSeed] = useState('3.0');

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const freqRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = () => {
      currentRef.current += (targetRef.current - currentRef.current) * 0.08;
      setScale(parseFloat(currentRef.current.toFixed(1)));

      if (currentRef.current > 0.5) {
        freqRef.current += 0.0015;
        const bf = 0.008 + Math.sin(freqRef.current) * 0.004;
        setBaseFreq(`${bf.toFixed(4)} ${(bf * 1.6).toFixed(4)}`);
        setSeed((Math.sin(freqRef.current * 3) * 10 + 10).toFixed(1));
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className="bg-[#f1ebdc] color-[#0c0c0c] min-h-screen relative flex flex-col justify-center items-center pt-[110px] pb-[60px] text-center select-none overflow-hidden"
    >
      {/* SVG liquid filter definition */}
      <svg width="0" height="0" className="absolute">
        <filter id="liquid-filter">
          <feTurbulence
            id="turb"
            type="fractalNoise"
            baseFrequency={baseFreq}
            numOctaves="2"
            seed={seed}
            result="noise"
          />
          <feDisplacementMap
            id="disp"
            in="SourceGraphic"
            in2="noise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Hero Text Wrap */}
      <div
        id="hero-text-wrap"
        className="relative cursor-pointer"
        onMouseEnter={() => {
          targetRef.current = 55;
        }}
        onMouseLeave={() => {
          targetRef.current = 0;
        }}
      >
        <h1
          className="font-display-anton text-[clamp(64px,15vw,190px)] leading-[0.9] text-[#0c0c0c] uppercase select-none"
          style={{ filter: 'url(#liquid-filter)', willChange: 'filter' }}
        >
          CREATIVE
        </h1>
        <h2 className="font-display-anton text-[clamp(28px,7vw,90px)] leading-none text-[#0c0c0c] mt-[0.05em] uppercase">
          DEVELOPER
        </h2>
      </div>

      {/* Hero Tags */}
      <div className="mt-[34px] flex items-center gap-4 text-xs tracking-[0.14em] uppercase font-semibold text-[#0c0c0c]">
        <a href="#work" className="magnetic-tag tag-btn px-3.5 py-2.5 rounded-full relative overflow-hidden transition-colors duration-350">
          <span className="relative z-10">VISUALS</span>
        </a>
        <span className="w-1 h-1 rounded-full bg-[#0c0c0c]" />
        <a href="#expertise" className="magnetic-tag tag-btn px-3.5 py-2.5 rounded-full relative overflow-hidden transition-colors duration-350">
          <span className="relative z-10">CODE</span>
        </a>
        <span className="w-1 h-1 rounded-full bg-[#0c0c0c]" />
        <a href="#about" className="magnetic-tag tag-btn px-3.5 py-2.5 rounded-full relative overflow-hidden transition-colors duration-350">
          <span className="relative z-10">EXPERIENCE</span>
        </a>
      </div>

      {/* Scroll Cue */}
      <div className="mt-[46px] text-[11px] tracking-[0.15em] uppercase flex flex-col items-center gap-2 text-[#333333]">
        <span>Scroll to explore</span>
        <span className="arrow w-[1px] h-[26px] bg-[#333333] relative overflow-hidden">
          <span className="absolute -top-full left-0 w-full h-full bg-[#c9a876] animate-[cueFall_1.6s_ease-in-out_infinite]" />
        </span>
      </div>

      {/* Hero Copy */}
      <div className="absolute left-[6vw] bottom-[34px] text-sm text-[#333333]">
        © 2026 <span className="font-script-caveat text-[18px]">{identity.name || 'Prajwal'}</span>
      </div>

      {/* Orbit Badge */}
      <a href="#contact" className="orbit-badge absolute right-[6vw] bottom-[26px] w-[104px] h-[104px] flex items-center justify-center group min-h-[44px] min-w-[44px]">
        <svg className="ring absolute inset-0 w-full h-full animate-spin-badge" viewBox="0 0 100 100">
          <defs>
            <path id="circlePath1" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
          </defs>
          <text fontSize="8.6" letterSpacing="2" fill="#0c0c0c" fontWeight="600">
            <textPath href="#circlePath1">LET'S WORK TOGETHER • LET'S WORK TOGETHER • </textPath>
          </text>
        </svg>
        <div className="arrow-c w-[30px] h-[30px] rounded-full bg-[#0c0c0c] text-[#f1ebdc] flex items-center justify-center text-[15px] relative z-10 group-hover:scale-110 transition-transform">
          ↗
        </div>
      </a>

      {/* Based Tag */}
      <div className="based-tag absolute right-[6vw] bottom-[-6px] text-[10px] tracking-[0.12em] uppercase text-[#333333] translate-y-[46px]">
        Based in {identity.location ? identity.location.split(',')[0] : 'India'}
      </div>
    </section>
  );
};

