import React, { useState } from 'react';
import { ArrowUpRight, Code2, Cpu, Globe, Flame, Layers, Sparkles } from 'lucide-react';

export const Theme05Expertise: React.FC = () => {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const techBadges = [
    { name: 'REACT.JS', icon: Code2, color: '#61DAFB' },
    { name: 'TYPESCRIPT', icon: Cpu, color: '#3178C6' },
    { name: 'JAVASCRIPT', icon: Flame, color: '#F7DF1E' },
    { name: 'GSAP MOTION', icon: Sparkles, color: '#88CE02' },
    { name: 'DNS & CLOUD', icon: Globe, color: '#C9A876' },
    { name: 'WORDPRESS', icon: Layers, color: '#21759B' },
  ];

  const accordionItems = [
    {
      num: '01',
      category: 'ENGINEERING',
      title: 'Creative Development',
      desc: 'High-performance web applications built with React, TypeScript, and scalable REST APIs with zero slop.',
      tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
      previewColor: 'from-blue-600/20 to-cyan-500/20',
    },
    {
      num: '02',
      category: 'ANIMATION',
      title: 'Motion & Interaction',
      desc: 'Fluid GSAP scroll-driven storytelling, SVG liquid filters, and interactive micro-animations that engage users.',
      tags: ['GSAP', 'ScrollTrigger', 'SVG Filters', 'Framer Motion'],
      previewColor: 'from-[#C9A876]/20 to-amber-500/20',
    },
    {
      num: '03',
      category: 'INTERFACE',
      title: 'UI/UX Design Systems',
      desc: 'Clean, accessible, WCAG 2.2 AA compliant layout ergonomics with disciplined typography and 8pt grids.',
      tags: ['Figma', 'Design Systems', 'WCAG AA', 'Ergonomics'],
      previewColor: 'from-purple-600/20 to-pink-500/20',
    },
    {
      num: '04',
      category: 'SYSTEMS',
      title: 'Modern Web Apps & Cloud',
      desc: 'Full-stack application architecture, production DNS cutovers, SSL certificate validation, and WordPress support.',
      tags: ['Node.js', 'DNS Management', 'WordPress', 'Cloud Hosting'],
      previewColor: 'from-emerald-600/20 to-teal-500/20',
    },
  ];

  const marqueeText = 'MOTION DESIGN + UI/UX + INTERACTIVE WEB + CREATIVE DEV + DNS & HOSTING + REACT & TYPESCRIPT + ';

  return (
    <section id="expertise" className="bg-[#0B0B0C] text-white py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
        {/* Main 2-Column Layout with Sticky Left Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Sticky Stacked Heading & Tech Badges */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <div className="space-y-1">
              <span className="font-display-archivo text-5xl sm:text-7xl text-[#999999] block leading-none">
                MY
              </span>
              <span className="font-display-archivo text-5xl sm:text-7xl text-white block leading-none">
                EXPERTISE
              </span>
            </div>

            <p className="font-sans text-sm text-[#999999] leading-relaxed max-w-sm">
              Engineering seamless web experiences across <strong className="text-white">design, code and motion</strong>. Focused on clarity, speed, and technical precision.
            </p>

            {/* Row of Tech Icon Badges with Parallax & Hover Chip */}
            <div className="space-y-3">
              <span className="font-mono-jetbrains text-[10px] text-[#C9A876] tracking-[0.2em] font-bold block uppercase">
                STACK BADGES
              </span>

              <div className="flex flex-wrap items-center gap-3 relative">
                {techBadges.map((badge, bIdx) => {
                  const IconComp = badge.icon;
                  return (
                    <div
                      key={bIdx}
                      onMouseEnter={() => setHoveredBadge(badge.name)}
                      onMouseLeave={() => setHoveredBadge(null)}
                      className="p-3 bg-[#121214] border border-[#C9A876]/30 rounded-xl hover:border-[#C9A876] hover:bg-[#C9A876]/10 transition-all cursor-pointer shadow-md group relative min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <IconComp className="w-5 h-5 text-[#C9A876] group-hover:scale-110 transition-transform" />
                    </div>
                  );
                })}
              </div>

              {/* Tag Chip Pop Overlay */}
              {hoveredBadge && (
                <div className="inline-block px-3 py-1 bg-[#C9A876] text-[#0B0B0C] font-mono-jetbrains text-xs font-bold rounded-md animate-in fade-in duration-200">
                  {hoveredBadge}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Numbered Accordion List (01-04) */}
          <div className="lg:col-span-7 space-y-4">
            {accordionItems.map((item, idx) => (
              <div
                key={item.num}
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
                className="group relative p-6 sm:p-8 bg-[#121214] border-t border-[#C9A876]/20 hover:border-[#C9A876] transition-all rounded-xl cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    {/* Index & Category */}
                    <div className="flex items-center gap-3 font-mono-jetbrains text-xs">
                      <span className="text-[#C9A876] font-bold">{item.num}</span>
                      <span className="text-neutral-500">/</span>
                      <span className="text-[#999999] tracking-wider">{item.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display-archivo text-2xl sm:text-3xl text-white group-hover:text-[#C9A876] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-sm text-[#999999] leading-relaxed max-w-xl">
                      {item.desc}
                    </p>

                    {/* Tech Used Tag Labels */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tags.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 bg-[#0B0B0C] border border-white/10 text-neutral-300 rounded font-mono-jetbrains text-[11px]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* External Link Arrow Icon */}
                  <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-[#C9A876] group-hover:text-[#0B0B0C] flex items-center justify-center transition-all shrink-0">
                    <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Floating Preview Card Gradient Panel on Hover */}
                {hoveredRow === idx && (
                  <div className={`mt-4 p-4 rounded-lg bg-gradient-to-r ${item.previewColor} border border-[#C9A876]/40 font-mono-jetbrains text-xs text-[#C9A876] flex items-center justify-between animate-in fade-in duration-300`}>
                    <span className="font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> LIVE SYSTEM ARCHITECTURE CAPABILITY
                    </span>
                    <span className="text-white text-[11px]">INSPECT DETAILS →</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Infinite Horizontal Marquee Strip */}
      <div className="mt-20 py-4 bg-[#121214] border-y border-[#C9A876]/30 overflow-hidden select-none">
        <div className="marquee-track font-display-archivo text-xl sm:text-2xl text-[#C9A876] tracking-wider whitespace-nowrap">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>
    </section>
  );
};
