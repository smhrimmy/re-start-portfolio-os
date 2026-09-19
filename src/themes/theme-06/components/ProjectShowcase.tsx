import React from 'react';
import { Project } from '@/types/portfolio';
import { DeviceTier } from '@/core/device/device-tier';
import { ProjectCard } from './ProjectCard';

interface ProjectShowcaseProps {
  projects: Project[];
  tier: DeviceTier;
  onSelectProject: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects, tier, onSelectProject }) => {
  return (
    <section id="work" className="projects-section quiet-entrance relative z-10 py-24 px-6 sm:px-12 bg-gradient-to-b from-[#FAFAF8] to-[#F5F3F0]">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF] block mb-2 font-sans-satoshi">
            01 // PORTFOLIO
          </span>
          <h2 className="section-title text-4xl sm:text-6xl font-serif-instrument font-bold text-[#1A1A1A]">
            Selected Work & Projects
          </h2>
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects
            .slice(0, tier === 'LOW' ? 4 : 9)
            .map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={onSelectProject} />
            ))}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-[#A0A0A0] py-16 font-sans-satoshi text-sm">
            No projects published yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
};
