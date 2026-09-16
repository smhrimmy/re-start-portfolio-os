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
          {/* Inner Back Wall of Box */}
          <polygon
            points="50,160 250,60 450,120 250,220"
            fill="#1A329E"
            stroke="#18203A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Inner Floor of Box */}
          <polygon
            points="50,380 250,440 450,340 250,220"
            fill="#14257C"
            stroke="#18203A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* 2. Folder Deck (z-index: 1..4 - Sitting inside the box cavity) */}
        <div className="folder-deck absolute inset-0 z-1">
          {projects.map((project, idx) => {
            const numStr = String(idx + 1).padStart(2, '0');
            const folderBg = theme03Tokens.folderColors[idx % theme03Tokens.folderColors.length];
            const isTargetHovered = activeHoverSlug === project.slug;

            // Step geometry per index
            const stepIdx = idx % 4;
            const leftPercent = 12 + stepIdx * 5;
            const topPercent = 18 - stepIdx * 6;
            const baseZIndex = projects.length - idx;

            // Lift mechanics:
            // - Active/hovered folder lifts -36px (rises above other folders while remaining inside box)
            // - Hovering box/list gently lifts all folders -12px
            let liftPx = 0;
            let currentZIndex = baseZIndex;

            if (isTargetHovered) {
              liftPx = -36;
              currentZIndex = 4; // Max z-index below front shell (5)
            } else if (isStageHovered || activeHoverSlug !== null) {
              liftPx = -12;
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
                  <small className="font-sans-satoshi text-[0.7rem] font-bold text-[#18203A]/75 uppercase tracking-wider">
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

        {/* 3. Front Shell SVG (z-index: 5 - ALWAYS ON TOP OF FOLDERS) */}
        <svg
          className="box-front absolute inset-0 w-full h-full pointer-events-none z-5"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Front Outer Wall */}
          <polygon
            points="50,160 250,220 250,440 50,380"
            fill="#3054DE"
            stroke="#18203A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Right Outer Side Wall */}
          <polygon
            points="250,220 450,120 450,340 250,440"
            fill="#2240B6"
            stroke="#18203A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Handle Cutout on Front Wall */}
          <rect
            x="110"
            y="245"
            width="80"
            height="24"
            rx="12"
            fill="#122063"
            stroke="#18203A"
            strokeWidth="2.5"
            transform="rotate(16, 150, 257)"
          />

          {/* White Label Sticker "MY WORKS" */}
          <g transform="rotate(16, 150, 320)">
            <rect
              x="70"
              y="298"
              width="160"
              height="44"
              rx="6"
              fill="#FAF8F5"
              stroke="#18203A"
              strokeWidth="2.5"
            />
            <text
              x="150"
              y="327"
              fill="#18203A"
              fontFamily="'Satoshi', sans-serif"
              fontSize="17"
              fontWeight="800"
              letterSpacing="1.5"
              textAnchor="middle"
            >
              MY WORKS
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
