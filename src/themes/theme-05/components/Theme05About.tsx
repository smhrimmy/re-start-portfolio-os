import React, { useState } from 'react';
import { Code2, Wrench, Layout, Sparkles } from 'lucide-react';
import { PortfolioIdentity } from '@/types/portfolio';

interface Theme05AboutProps {
  identity: PortfolioIdentity;
}

export const Theme05About: React.FC<Theme05AboutProps> = ({ identity }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const stats = [
    { label: 'BASED', value: identity.location || 'Mangalore, KA, India' },
    { label: 'FOCUS', value: 'Full Stack & DNS Infrastructure' },
    { label: 'BUILDING WEBSITES', value: '2+ Years Experience' },
    { label: 'MINDSET', value: 'Relentless Quality & Zero Slop' },
    { label: 'PROJECTS DONE', value: '36+ Shipped Systems' },
    { label: 'EDUCATION', value: 'Diploma Full Stack (KPT)' },
  ];

  return (
    <section id="about" className="bg-[#0B0B0C] text-white py-24 px-6 sm:px-12 relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header with Horizontal Wipe Gold Rule */}
        <div className="space-y-3">
          <span className="font-mono-jetbrains text-xs text-[#C9A876] uppercase tracking-[0.25em] block">
            — WHO AM I?
          </span>
          <h2 className="font-display-archivo text-4xl sm:text-6xl text-white uppercase tracking-tight">
            ABOUT ME
          </h2>
          {/* Gold Underline Rule */}
          <div className="h-1 bg-[#C9A876] w-32 horizontal-wipe" />
        </div>

        {/* Main 2-Column About Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bordered Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-[#121214] border-2 border-[#C9A876]/40 rounded-2xl overflow-hidden p-3 shadow-2xl group">
              {/* Pinned Top-Left Name Badge */}
              <div className="absolute top-6 left-6 z-20 px-3.5 py-1.5 bg-[#0B0B0C]/80 backdrop-blur-md border border-[#C9A876]/60 rounded-full font-mono-jetbrains text-xs text-[#C9A876] font-bold tracking-wider">
                {identity.name || 'PRAJWAL DL'}
              </div>

              {/* Image Container */}
              <div className="relative h-96 w-full rounded-xl overflow-hidden">
                <img
                  src={identity.avatarUrl || "https://avatars.githubusercontent.com/u/244284914?v=4"}
                  alt={identity.name}
                  className="w-full h-full object-cover filter brightness-105 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />

                {/* Bottom-Right Hover Reveal Icon Buttons */}
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    onMouseEnter={() => setActiveTooltip('Full Stack Engineering')}
                    onMouseLeave={() => setActiveTooltip(null)}
                    className="w-10 h-10 rounded-full bg-[#0B0B0C]/90 text-[#C9A876] hover:bg-[#C9A876] hover:text-[#0B0B0C] border border-[#C9A876]/50 flex items-center justify-center transition-all shadow-md min-h-[44px] min-w-[44px]"
                  >
                    <Code2 className="w-4 h-4" />
                  </button>

                  <button
                    onMouseEnter={() => setActiveTooltip('DNS & Server Infrastructure')}
                    onMouseLeave={() => setActiveTooltip(null)}
                    className="w-10 h-10 rounded-full bg-[#0B0B0C]/90 text-[#C9A876] hover:bg-[#C9A876] hover:text-[#0B0B0C] border border-[#C9A876]/50 flex items-center justify-center transition-all shadow-md min-h-[44px] min-w-[44px]"
                  >
                    <Wrench className="w-4 h-4" />
                  </button>

                  <button
                    onMouseEnter={() => setActiveTooltip('UI/UX Ergonomics')}
                    onMouseLeave={() => setActiveTooltip(null)}
                    className="w-10 h-10 rounded-full bg-[#0B0B0C]/90 text-[#C9A876] hover:bg-[#C9A876] hover:text-[#0B0B0C] border border-[#C9A876]/50 flex items-center justify-center transition-all shadow-md min-h-[44px] min-w-[44px]"
                  >
                    <Layout className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tooltip Float */}
              {activeTooltip && (
                <div className="mt-2 text-center font-mono-jetbrains text-[11px] text-[#C9A876] animate-in fade-in duration-200">
                  {activeTooltip}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Statement Heading & Bio */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-display-archivo text-3xl sm:text-4xl lg:text-5xl leading-tight text-white uppercase">
              I BUILD <span className="text-[#C9A876]">DIGITAL WORLDS</span> WHERE <span className="text-[#C9A876]">DESIGN</span> MEETS <span className="text-[#C9A876]">CODE</span>.
            </h3>

            {/* Two-Column Muted Gray Bio Paragraphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-sm text-[#999999] leading-relaxed">
              <p>
                Dedicated and adaptable full-stack developer based in Mangalore, India. Specializing in high-performance web applications, modern React/TypeScript user interfaces, and custom backend systems built with precision.
              </p>
              <p>
                As a Web Advisor, I also engineer zero-downtime website migrations, SSL security protocols, email handshakes, and enterprise DNS configurations for production cloud environments.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Row x 3-Column Stats Grid */}
        <div className="pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#121214] border border-[#C9A876]/20 rounded-xl space-y-2 hover:border-[#C9A876]/60 transition-colors"
              >
                <span className="font-mono-jetbrains text-[10px] text-[#C9A876] tracking-[0.2em] font-bold block uppercase">
                  {item.label}
                </span>
                <span className="font-sans text-sm font-semibold text-white block">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Indicator Label Bottom-Left */}
        <div className="pt-4 flex items-center justify-between font-mono-jetbrains text-xs text-[#999999]">
          <span className="text-[#C9A876] font-bold">03 — EXPERTISE</span>
          <div className="flex items-center gap-1.5 text-neutral-500">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A876]" />
            <span>CONTINUOUS EVOLUTION</span>
          </div>
        </div>
      </div>
    </section>
  );
};
