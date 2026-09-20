import React, { useState, useEffect } from 'react';
import { Project } from '@/types/portfolio';
import { soundSynth } from '../../soundSynth';

interface QuestsTabProps {
  projects: Project[];
  accentColor: string;
}

export const QuestsTab: React.FC<QuestsTabProps> = ({ projects, accentColor }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedProject = projects[selectedIndex] || projects[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundSynth.playMove();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundSynth.playMove();
        setSelectedIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projects]);

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl h-full flex flex-col">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold font-mono text-white">QUEST LOG // PROJECTS</h2>
        <p className="text-xs font-mono text-[#91A0AD]">
          02 // MASTER–DETAIL QUEST MANIFEST (NAVIGATE WITH ARROW KEYS)
        </p>
      </div>

      {/* Master Detail Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
        {/* Left Column 38%: Quest List */}
        <div className="lg:col-span-5 space-y-2 max-h-[calc(100vh-230px)] overflow-y-auto pr-1 pause-scroll">
          {projects.map((quest, idx) => {
            const isSelected = idx === selectedIndex;

            return (
              <div
                key={quest.id}
                onClick={() => {
                  soundSynth.playSelect();
                  setSelectedIndex(idx);
                }}
                onMouseEnter={() => soundSynth.playMove()}
                className={`pause-panel pause-bevel-sm p-4 cursor-pointer transition-all duration-150 relative ${
                  isSelected ? 'border-2 text-white bg-white/10' : 'border border-white/10 text-white/70 hover:text-white'
                }`}
                style={{ borderColor: isSelected ? accentColor : undefined }}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-white/40">QUEST 0{idx + 1}</span>
                  <span className="text-emerald-400 font-bold">COMPLETED</span>
                </div>
                <h4 className="text-base font-bold font-mono text-white">{quest.title}</h4>
                <p className="text-xs text-[#91A0AD] line-clamp-1 mt-1 font-mono">
                  {quest.summary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column 62%: Quest Detail Panel */}
        {selectedProject && (
          <div className="lg:col-span-7 pause-panel pause-bevel p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/15 pb-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#91A0AD]">ACTIVE QUEST DETAILS</span>
                <h3 className="text-2xl font-bold font-mono text-white">{selectedProject.title}</h3>
              </div>
              <span className="px-3 py-1 rounded font-mono text-xs font-bold text-black w-fit" style={{ backgroundColor: accentColor }}>
                {selectedProject.role || 'LEAD DEVELOPER'}
              </span>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-video rounded overflow-hidden border border-white/20">
              <img
                src={selectedProject.coverImage || '/assets/character-reference.png'}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-transparent opacity-60" />
            </div>

            {/* Objective Paragraph */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-[#91A0AD] uppercase">QUEST OBJECTIVE & SUMMARY</h4>
              <p className="text-sm text-[#F2F4F7] leading-relaxed">
                {selectedProject.summary}
              </p>
            </div>

            {/* Rewards / Stack Tags */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-[#91A0AD] uppercase">QUEST REWARDS (TECH STACK)</h4>
              <div className="flex flex-wrap gap-2">
                {(selectedProject.technologies || ['React', 'TypeScript']).map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-black/60 border border-white/20 font-mono text-xs text-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-white/15">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pause-bevel px-6 py-3 font-mono font-bold text-black text-xs transition-transform transform hover:-translate-y-0.5"
                  style={{ backgroundColor: accentColor }}
                >
                  ▸ DEPLOYED LINK
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pause-bevel px-6 py-3 border border-white/20 bg-white/5 font-mono text-white text-xs hover:bg-white/10"
                >
                  SOURCE CODE
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
