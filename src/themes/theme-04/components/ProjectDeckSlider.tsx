import React, { useState } from 'react';
import { Project } from '@/types/portfolio';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { soundSynth } from '../soundSynth';

interface ProjectDeckSliderProps {
  projects: Project[];
  onOpenDetail: (project: Project) => void;
}

export const ProjectDeckSlider: React.FC<ProjectDeckSliderProps> = ({ projects, onOpenDetail }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    if (activeIndex > 0) {
      soundSynth.playClick(600);
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < projects.length - 1) {
      soundSynth.playClick(750);
      setActiveIndex((prev) => prev + 1);
    }
  };

  return (
    <section id="work" className="w-full space-y-8">
      {/* Work Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono-jetbrains text-xs text-[#f59e0b] uppercase tracking-wider block mb-1">
            CHAPTER 03 // PORTFOLIO SHOWCASE
          </span>
          <h2 className="font-space-grotesk text-3xl sm:text-5xl font-bold text-white">
            Some Things I’ve Worked On
          </h2>
        </div>
        <p className="font-mono-jetbrains text-xs text-[#9ca3af] max-w-xs">
          Use navigation pips or click any card to inspect full system case study.
        </p>
      </div>

      {/* Interactive Deck Slider Area */}
      <div className="relative w-full space-y-6">
        {/* Active Card Deck Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Featured Showcase Card */}
          <div className="lg:col-span-8">
            {projects[activeIndex] && (
              <div
                onMouseEnter={() => soundSynth.playHover()}
                className="spatial-card p-6 sm:p-8 space-y-6 relative overflow-hidden group border-[#f59e0b]/40 hover:border-[#f59e0b] transition-all"
              >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#f59e0b]/10 rounded-full filter blur-3xl pointer-events-none" />

                {/* Card Top Meta */}
                <div className="flex items-center justify-between font-mono-jetbrains text-xs">
                  <span className="px-3 py-1 bg-[#f59e0b]/10 border border-[#f59e0b]/40 text-[#f59e0b] rounded-full font-bold">
                    SYSTEM #{String(activeIndex + 1).padStart(2, '0')} // {projects[activeIndex].technologies?.[0] || 'FULL STACK'}
                  </span>
                  <span className="text-[#9ca3af]">STATUS: PUBLISHED</span>
                </div>

                {/* Thumbnail Image */}
                <div
                  onClick={() => {
                    soundSynth.playClick(900);
                    onOpenDetail(projects[activeIndex]);
                  }}
                  className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden border border-white/10 cursor-pointer group/img"
                >
                  <img
                    src={projects[activeIndex].coverImage}
                    alt={projects[activeIndex].title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                    <span className="px-4 py-2 bg-[#f59e0b] text-black font-mono-jetbrains text-xs font-bold rounded-lg shadow-lg flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Inspect System Case Study
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-white">
                    {projects[activeIndex].title}
                  </h3>
                  <p className="font-sans text-sm text-[#9ca3af] leading-relaxed">
                    {projects[activeIndex].summary}
                  </p>

                  {/* Technology Tag Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {projects[activeIndex].technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 bg-[#111319] border border-white/15 text-neutral-300 rounded font-mono-jetbrains text-[11px]"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  {projects[activeIndex].liveUrl && (
                    <a
                      href={projects[activeIndex].liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="amber-glow-pill px-5 py-2.5 rounded-xl font-mono-jetbrains text-xs font-bold inline-flex items-center gap-2 min-h-[44px]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo View</span>
                    </a>
                  )}

                  {projects[activeIndex].githubUrl && (
                    <a
                      href={projects[activeIndex].githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 bg-[#111319] hover:bg-white/10 border border-white/15 text-white rounded-xl font-mono-jetbrains text-xs font-bold inline-flex items-center gap-2 transition-colors min-h-[44px]"
                    >
                      <Github className="w-4 h-4" />
                      <span>Repository</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Side Deck Quick Switch Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <span className="font-mono-jetbrains text-xs text-[#9ca3af] block mb-2 uppercase">
              PROJECT REPOSITORY INDEX ({projects.length})
            </span>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {projects.map((proj, pIdx) => {
                const isActive = pIdx === activeIndex;
                return (
                  <button
                    key={proj.id || pIdx}
                    onClick={() => {
                      soundSynth.playClick(650);
                      setActiveIndex(pIdx);
                    }}
                    onMouseEnter={() => soundSynth.playHover()}
                    className={`w-full p-3.5 rounded-xl text-left font-mono-jetbrains transition-all flex items-center justify-between border ${
                      isActive
                        ? 'bg-[#f59e0b]/15 border-[#f59e0b] text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : 'bg-[#111319]/80 border-white/10 text-[#9ca3af] hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className={`text-xs font-bold ${isActive ? 'text-[#f59e0b]' : 'text-neutral-500'}`}>
                        {String(pIdx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs truncate font-bold">{proj.title}</span>
                    </div>
                    {isActive && <Layers className="w-4 h-4 text-[#f59e0b] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Deck Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono-jetbrains text-xs">
          <div className="text-[#9ca3af]">
            SYSTEM <strong className="text-white">{activeIndex + 1}</strong> OF <strong className="text-white">{projects.length}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`p-3 rounded-xl border flex items-center justify-center transition-all ${
                activeIndex === 0
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-600 cursor-not-allowed'
                  : 'bg-[#111319] border-[#f59e0b]/40 text-[#f59e0b] hover:bg-[#f59e0b]/20 hover:border-[#f59e0b]'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              disabled={activeIndex === projects.length - 1}
              className={`p-3 rounded-xl border flex items-center justify-center transition-all ${
                activeIndex === projects.length - 1
                  ? 'bg-neutral-900 border-neutral-800 text-neutral-600 cursor-not-allowed'
                  : 'bg-[#111319] border-[#f59e0b]/40 text-[#f59e0b] hover:bg-[#f59e0b]/20 hover:border-[#f59e0b]'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
