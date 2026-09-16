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
        {/* 1. Back Shell SVG (z-index: 0 - Behind folders) */}
        <svg
          className="box-back absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Inner Back Wall */}
          <polygon
            points="40,190 195,45 460,75 345,275"
            fill="#1E3BB3"
            stroke="#18203A"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Inner Floor */}
          <polygon
            points="40,390 345,475 460,310 345,275"
            fill="#14257C"
            stroke="#18203A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* 2. Folder Deck (z-index: 1..4 - Between Back and Front Shells) */}
        <div className="folder-deck absolute inset-0">
          {projects.map((project, idx) => {
            const numStr = String(idx + 1).padStart(2, '0');
            const folderBg = theme03Tokens.folderColors[idx % theme03Tokens.folderColors.length];
            const isTargetHovered = activeHoverSlug === project.slug;

            // Geometry offsets per index
            const stepIdx = idx % 4;
            const leftPercent = 10 + stepIdx * 5;
            const topPercent = 21 - stepIdx * 7;
            const baseZIndex = projects.length - idx;

            // Lift calculation:
            // Targeted folder lifts -48px total; z-index boosted to 4 (strictly behind front shell z-index 5)
            // Stage/List hover lifts all folders -14px
            let liftPx = 0;
            let currentZIndex = baseZIndex;

            if (isTargetHovered) {
              liftPx = -48;
              currentZIndex = 4;
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

        {/* 3. Front Shell SVG (z-index: 5 ALWAYS - In front of folders) */}
        <svg
          className="box-front absolute inset-0 w-full h-full pointer-events-none z-5"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Front Outer Wall */}
          <polygon
            points="40,190 345,275 345,475 40,390"
            fill="#3054DE"
            stroke="#18203A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Right Outer Wall */}
          <polygon
            points="345,275 460,75 460,310 345,475"
            fill="#2342B8"
            stroke="#18203A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Handle Cutout on Front Wall */}
          <rect
            x="147"
            y="305"
            width="90"
            height="26"
            rx="13"
            fill="#14257C"
            stroke="#18203A"
            strokeWidth="2.5"
          />

          {/* White Label Sticker "MY WORKS" */}
          <rect
            x="102"
            y="350"
            width="180"
            height="48"
            rx="6"
            fill="#FAF8F5"
            stroke="#18203A"
            strokeWidth="2.5"
          />
          <text
            x="192"
            y="381"
            fill="#18203A"
            fontFamily="'Satoshi', sans-serif"
            fontSize="19"
            fontWeight="800"
            letterSpacing="1.5"
            textAnchor="middle"
          >
            MY WORKS
          </text>
        </svg>
      </div>
    </div>
  );
};
