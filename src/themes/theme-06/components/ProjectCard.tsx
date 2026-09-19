import React from 'react';
import { Project } from '@/types/portfolio';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(project)}
      className="project-card glass-card group cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div className="project-image-wrapper relative overflow-hidden rounded-t-2xl bg-[#EBE8E3] aspect-video">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#A0A0A0] font-sans-satoshi text-xs">
            No image available
          </div>
        )}
        <div className="absolute inset-0 bg-[#0066FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="project-title text-xl font-serif-instrument font-bold text-[#1A1A1A] group-hover:text-[#0066FF] transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-[#A0A0A0] group-hover:text-[#0066FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </div>

          <p className="project-summary text-sm text-[#5C5C5C] line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
