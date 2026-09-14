import React from 'react';
import { Project } from '@/types/portfolio';
import { ArrowUpRight } from 'lucide-react';
import { theme03Tokens } from '../theme03Tokens';

interface ProjectPillsListProps {
  projects: Project[];
  activeHoverSlug: string | null;
  onHoverProject: (slug: string | null) => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectPillsList: React.FC<ProjectPillsListProps> = ({
  projects,
  activeHoverSlug,
  onHoverProject,
  onSelectProject
}) => {
  return (
    <div className="flex flex-col gap-[22px] w-full">
      {projects.map((project, idx) => {
        const numStr = String(idx + 1).padStart(2, '0');
        const cardBg = theme03Tokens.cardColors[idx % theme03Tokens.cardColors.length];
        const numColor = theme03Tokens.numberColors[idx % theme03Tokens.numberColors.length];
        const isHovered = activeHoverSlug === project.slug;

        return (
          <button
            key={project.id || idx}
            type="button"
            onClick={() => onSelectProject(project)}
            onMouseEnter={() => onHoverProject(project.slug)}
            onMouseLeave={() => onHoverProject(null)}
            onFocus={() => onHoverProject(project.slug)}
            onBlur={() => onHoverProject(null)}
            className="w-full text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#3054DE]"
            style={{
              backgroundColor: cardBg,
              minHeight: '100px',
              padding: '18px 20px',
              borderRadius: '16px',
              border: '1px solid rgba(24, 32, 58, 0.05)',
            }}
            aria-label={`Open case study for ${project.title}`}
          >
            <div className="grid grid-cols-[40px_minmax(0,1fr)_36px] items-center gap-[12px]">
              {/* Number */}
              <div
                className="font-sans-satoshi text-[1.6rem] font-bold tracking-[-0.5px] tabular-nums leading-none"
                style={{ color: numColor }}
              >
                {numStr}
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-[7px]">
                <h3 className="font-serif-instrument text-[1.4rem] font-normal text-[#18203A] leading-[1.1]">
                  {project.title}
                </h3>
                <p className="font-sans-satoshi text-[0.85rem] font-normal text-[#536083] leading-[1.5] max-w-[340px] m-0">
                  {project.summary}
                </p>
              </div>

              {/* Northeast Arrow */}
              <div
                className={`w-[36px] h-[36px] rounded-full border border-[#18203A]/14 flex items-center justify-center transition-transform duration-200 ${
                  isHovered ? 'scale-110 bg-white/40' : ''
                }`}
              >
                <ArrowUpRight className="w-5 h-5 text-[#18203A]" />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
