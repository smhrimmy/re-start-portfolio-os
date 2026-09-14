import React, { useState } from 'react';
import { Project } from '@/types/portfolio';
import { theme03Tokens } from '../theme03Tokens';

interface ArchiveBoxProps {
  projects: Project[];
  activeHoverSlug: string | null;
  onHoverProject: (slug: string | null) => void;
  onSelectProject: (project: Project) => void;
}

export const ArchiveBox: React.FC<ArchiveBoxProps> = ({
  projects,
  activeHoverSlug,
  onHoverProject,
  onSelectProject
}) => {
  const [isStageHovered, setIsStageHovered] = useState(false);

  return (
    <div className="archive archive-container">
      <div
        className="archive-stage"
        onMouseEnter={() => setIsStageHovered(true)}
        onMouseLeave={() => {
          setIsStageHovered(false);
          onHoverProject(null);
        }}
      >
        {/* Back Box Shell (behind folders, z-index 0) */}
        <img
          className="box-back"
          src="/assets/my-works-box.png"
          alt=""
          aria-hidden="true"
        />

        {/* Dynamic Folder Deck */}
        <div className="folder-deck">
          {projects.map((project, idx) => {
            const numStr = String(idx + 1).padStart(2, '0');
            const folderBg = theme03Tokens.folderColors[idx % theme03Tokens.folderColors.length];
            const isTargetHovered = activeHoverSlug === project.slug;

            // Geometry offsets per index
            const stepIdx = idx % 4;
            const leftPercent = 10 + stepIdx * 5;
            const topPercent = 21 - stepIdx * 7;
            const baseZIndex = projects.length - idx;

            // Lift calculation
            let liftPx = 0;
            let currentZIndex = baseZIndex;

            if (isTargetHovered) {
              liftPx = -48;
              currentZIndex = 4; // Raise highlighted folder z-index below front shell (5)
            } else if (isStageHovered || activeHoverSlug !== null) {
              liftPx = -14;
            }

            return (
              <button
                key={project.id || idx}
                type="button"
                className={`project-folder folder-${stepIdx + 1}`}
                onClick={() => onSelectProject(project)}
                onMouseEnter={() => onHoverProject(project.slug)}
                onFocus={() => onHoverProject(project.slug)}
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                  zIndex: currentZIndex,
                  '--lift': `${liftPx}px`,
                } as React.CSSProperties}
                aria-label={`Folder for ${project.title}`}
              >
                <span
                  className="folder-tab"
                  style={{ backgroundColor: folderBg }}
                >
                  {numStr} / {project.title.toUpperCase()}
                </span>
                <span
                  className="folder-face"
                  style={{ backgroundColor: folderBg }}
                >
                  <small className="font-sans-satoshi text-[0.7rem] font-bold text-[#18203A]/70 uppercase tracking-wider">
                    PROJECT / {numStr}
                  </small>
                  <strong className="folder-logo line-clamp-2">
                    {project.title}
                  </strong>
                  <span className="folder-open">
                    OPEN FILE ↗
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Front Box Shell (in front of folders, z-index 5) */}
        <img
          className="box-front"
          src="/assets/my-works-box.png"
          alt=""
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
