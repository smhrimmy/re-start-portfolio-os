import React from 'react';
import { Project } from '@/types/portfolio';

interface ProjectPortalsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectPortals: React.FC<ProjectPortalsProps> = ({ projects, onSelectProject }) => {
  return (
    <section className="relative py-24 px-6 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-xs font-mono tracking-widest text-[#249BFF] uppercase">
          03 // FEATURED WORK
        </h2>
        <h3 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          Worlds I Built
        </h3>
        <p className="text-[#91A0AD] text-sm">
          Interactive portals showcasing spatial WebGL experiences, creative technology, and full-stack solutions.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project: Project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="architect-glass architect-glass-interactive group p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            {/* Top Bar: Role & Date */}
            <div className="flex items-center justify-between text-xs font-mono text-[#91A0AD]">
              <span>{project.role || 'LEAD DEVELOPER'}</span>
              <span>{project.date || '2026'}</span>
            </div>

            {/* Thumbnail Preview with Holographic Shimmer */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#07090D] border border-white/10">
              <img
                src={project.coverImage || '/assets/character-reference.png'}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-[#69D9FF]">
                DIMENSIONAL PORTAL
              </div>
            </div>

            {/* Project Title & Short Description */}
            <div className="space-y-3">
              <h4 className="text-2xl font-serif font-bold text-white group-hover:text-[#69D9FF] transition-colors">
                {project.title}
              </h4>
              <p className="text-sm text-[#91A0AD] line-clamp-2 leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Technologies Pills & Action Link */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {(project.technologies || ['React', 'Three.js']).slice(0, 3).map((tech: string, i: number) => (
                  <span key={i} className="text-[11px] font-mono text-white/80 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {tech}
                  </span>
                ))}
              </div>
              <span className="text-xs font-semibold text-[#249BFF] group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                <span>EXPLORE</span>
                <span>→</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
