import React from 'react';
import { PortfolioIdentity } from '@/types/portfolio';

interface Theme05AboutProps {
  identity: PortfolioIdentity;
}

export const Theme05About: React.FC<Theme05AboutProps> = ({ identity }) => {
  const name = identity.name || 'Prajwal DL';
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <section id="about" className="bg-[#0c0c0c] text-white pt-[170px] pb-[110px] relative">
      <div className="max-w-[1240px] mx-auto px-[6vw]">
        {/* About Header */}
        <div className="text-center mb-[70px] reveal in">
          <div className="eyebrow flex items-center justify-center gap-[10px] text-[11px] tracking-[0.18em] uppercase text-[#8c8c8c] mb-[14px]">
            Who am I?
          </div>
          <h2 className="underline-title relative inline-block font-sans font-bold text-[clamp(30px,5vw,46px)]">
            About Me
          </h2>
        </div>

        {/* About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-[64px] items-start reveal in">
          {/* Photo Card */}
          <div className="about-photo relative aspect-[3/4] rounded-[6px] overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(201,168,118,0.35),transparent_55%),linear-gradient(160deg,#3a3a3a,#111_70%)] border border-white/10 flex items-end justify-start group">
            <div className="initials font-display-anton text-[120px] text-white/10 absolute inset-0 flex items-center justify-center select-none">
              {initials || 'PD'}
            </div>
            <div className="photo-name absolute top-[18px] left-[18px] text-[13px] tracking-[0.1em] uppercase font-semibold text-white">
              {name}
            </div>
            <div className="photo-icons absolute bottom-[16px] right-[16px] flex gap-[8px]">
              <span className="w-[32px] h-[32px] rounded-full bg-white/[0.08] backdrop-blur-[6px] flex items-center justify-center text-[13px] border border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-[6px] group-hover:translate-y-0 transition-all duration-300 hover:bg-[#c9a876] hover:text-[#0c0c0c]">
                &lt;/&gt;
              </span>
              <span className="w-[32px] h-[32px] rounded-full bg-white/[0.08] backdrop-blur-[6px] flex items-center justify-center text-[13px] border border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-[6px] group-hover:translate-y-0 transition-all duration-300 hover:bg-[#c9a876] hover:text-[#0c0c0c]">
                ✎
              </span>
              <span className="w-[32px] h-[32px] rounded-full bg-white/[0.08] backdrop-blur-[6px] flex items-center justify-center text-[13px] border border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-[6px] group-hover:translate-y-0 transition-all duration-300 hover:bg-[#c9a876] hover:text-[#0c0c0c]">
                ▦
              </span>
            </div>
          </div>

          {/* Right Text Block */}
          <div>
            <div className="about-statement font-display-anton uppercase font-normal text-[clamp(24px,3.4vw,40px)] leading-[1.25] mb-[26px]">
              I build <span className="text-[#c9a876]">digital worlds</span> where <span className="text-[#c9a876]">design</span> meets <span className="text-[#c9a876]">code</span>.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] mb-[44px]">
              <p className="text-[14.5px] leading-[1.7] text-[#8c8c8c]">
                I'm {identity.name ? identity.name.split(' ')[0] : 'Prajwal'} — a creative frontend developer who enjoys turning ideas, interfaces and motion into experiences people remember.
              </p>
              <p className="text-[14.5px] leading-[1.7] text-[#8c8c8c]">
                I care about the details most people don't notice: the rhythm of typography, the timing of an interaction, and the tiny moments that make a digital product feel alive.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 border-t border-white/10">
              <div className="p-[20px_22px_20px_0] border-r border-b border-white/10">
                <div className="text-[10.5px] tracking-[0.12em] uppercase text-[#c9a876] mb-[8px]">Based</div>
                <div className="text-[16px] font-semibold">{identity.location || 'Mangalore, India'}</div>
              </div>
              <div className="p-[20px_22px_20px_0] border-r border-b border-white/10">
                <div className="text-[10.5px] tracking-[0.12em] uppercase text-[#c9a876] mb-[8px]">Focus</div>
                <div className="text-[16px] font-semibold">Web / Support</div>
              </div>
              <div className="p-[20px_22px_20px_0] border-b border-white/10 border-r sm:border-r-0">
                <div className="text-[10.5px] tracking-[0.12em] uppercase text-[#c9a876] mb-[8px]">Building Websites</div>
                <div className="text-[16px] font-semibold">2+ Years</div>
              </div>
              <div className="p-[20px_22px_20px_0] border-r border-b border-white/10">
                <div className="text-[10.5px] tracking-[0.12em] uppercase text-[#c9a876] mb-[8px]">Mindset</div>
                <div className="text-[16px] font-semibold">Always Learning</div>
              </div>
              <div className="p-[20px_22px_20px_0] border-r border-b border-white/10">
                <div className="text-[10.5px] tracking-[0.12em] uppercase text-[#c9a876] mb-[8px]">Projects Done</div>
                <div className="text-[16px] font-semibold">10+</div>
              </div>
              <div className="p-[20px_22px_20px_0] border-b border-white/10">
                <div className="text-[10.5px] tracking-[0.12em] uppercase text-[#c9a876] mb-[8px]">Education</div>
                <div className="text-[16px] font-semibold">Diploma, Full Stack Dev</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[6vw] bottom-[26px] text-[11px] tracking-[0.12em] uppercase text-[#8c8c8c] flex gap-2">
        03 — Expertise
      </div>
    </section>
  );
};

