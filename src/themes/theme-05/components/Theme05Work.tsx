import React from 'react';
import { Project } from '@/types/portfolio';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';

interface Theme05WorkProps {
  projects: Project[];
  onOpenDetail: (project: Project) => void;
}

export const Theme05Work: React.FC<Theme05WorkProps> = ({ projects, onOpenDetail }) => {
  return (
    <section id="work" className="bg-[#0B0B0C] text-white py-24 relative overflow-hidden border-t border-white/10">
      {/* Large Faded Background Headline Text Behind Cards */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none select-none text-center opacity-5 w-full">
        <span className="font-display-archivo text-6xl sm:text-9xl lg:text-[14rem] text-white tracking-tight uppercase block leading-none">
          FEEL ALIVE.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="space-y-2">
          <span className="font-script-dancing text-4xl sm:text-5xl text-[#C9A876] block">
            My Work
          </span>
          <h2 className="font-display-archivo text-4xl sm:text-6xl text-white uppercase tracking-tight">
            SELECTED PROJECTS & PRODUCTION SYSTEMS
          </h2>
        </div>

        {/* Stacked Full-Width Project Cards */}
        <div className="space-y-12">
          {projects.map((proj, idx) => (
            <div
              key={proj.id || idx}
              className="group relative rounded-2xl overflow-hidden bg-[#121214] border border-[#C9A876]/30 hover:border-[#C9A876] transition-all shadow-2xl"
            >
              {/* Darkened Screenshot Background Image */}
              <div className="relative h-80 sm:h-[450px] w-full overflow-hidden">
                <img
                  src={proj.coverImage}
                  alt={proj.title}
                  className="w-full h-full object-cover filter brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-transparent" />

                {/* Eyebrow Label & Index Badge Top-Left */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                  <span className="px-3.5 py-1.5 bg-[#0B0B0C]/80 backdrop-blur-md border border-[#C9A876]/60 text-[#C9A876] font-mono-jetbrains text-xs font-bold rounded-full uppercase">
                    [{proj.role || 'FULL STACK'}] · 0{idx + 1}
                  </span>
                </div>

                {/* Bottom-Right Rotating Circular Badge ("VIEW LIVE DEMO •") */}
                <div className="absolute bottom-6 right-6 z-20">
                  <a
                    href={proj.liveUrl || proj.githubUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#111111] text-[#C9A876] hover:bg-[#C9A876] hover:text-[#111111] transition-colors flex items-center justify-center shadow-xl group/badge min-h-[44px] min-w-[44px]"
                  >
                    {/* Curved Rotating Text */}
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-badge absolute inset-0">
                      <path
                        id={`textPathWorkBadge-${idx}`}
                        d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                      />
                      <text fill="currentColor" fontSize="10" fontWeight="bold" letterSpacing="1.5">
                        <textPath href={`#textPathWorkBadge-${idx}`} startOffset="0%">
                          VIEW LIVE DEMO • VIEW LIVE DEMO •
                        </textPath>
                      </text>
                    </svg>

                    {/* Arrow Icon */}
                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover/badge:translate-x-0.5 group-hover/badge:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Card Bottom Meta & Actions */}
              <div className="p-6 sm:p-8 space-y-4 bg-[#121214]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3
                    onClick={() => onOpenDetail(proj)}
                    className="font-display-archivo text-2xl sm:text-4xl text-white group-hover:text-[#C9A876] transition-colors cursor-pointer"
                  >
                    {proj.title}
                  </h3>

                  <button
                    onClick={() => onOpenDetail(proj)}
                    className="px-4 py-2 bg-white/5 hover:bg-[#C9A876]/20 border border-white/10 hover:border-[#C9A876] text-white rounded-xl font-mono-jetbrains text-xs flex items-center gap-2 transition-colors self-start sm:self-center"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A876]" /> Case Study
                  </button>
                </div>

                <p className="font-sans text-sm text-[#999999] leading-relaxed max-w-3xl">
                  {proj.summary}
                </p>

                {/* Tech Tag Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 bg-[#0B0B0C] border border-[#C9A876]/20 text-[#C9A876] rounded font-mono-jetbrains text-[11px]"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
