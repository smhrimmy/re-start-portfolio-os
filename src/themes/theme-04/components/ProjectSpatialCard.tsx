import React, { useState } from 'react';
import { Project } from '@/types/portfolio';
import { ExternalLink, Github, Layers, ChevronRight, Activity } from 'lucide-react';

interface ProjectSpatialCardProps {
  project: Project;
  index: number;
  onOpenDetail?: (project: Project) => void;
}

export const ProjectSpatialCard: React.FC<ProjectSpatialCardProps> = ({
  project,
  index,
  onOpenDetail
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const cardCenterX = card.left + card.width / 2;
    const cardCenterY = card.top + card.height / 2;
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;

    setRotate({
      x: (mouseY / (card.height / 2)) * -6,
      y: (mouseX / (card.width / 2)) * 6,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const numStr = String(index + 1).padStart(2, '0');

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="spatial-card-container w-full"
    >
      <div
        className="spatial-card p-6 sm:p-8 flex flex-col justify-between gap-6 relative group overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Top Header Tag */}
        <div className="flex items-center justify-between border-b border-[#f59e0b]/20 pb-4 font-mono-jetbrains text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#f59e0b] font-bold">[{numStr}]</span>
            <span className="text-[#9ca3af] uppercase tracking-wider">{project.role || 'FULL STACK SYSTEM'}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full text-[11px] text-[#f59e0b]">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>{project.status === 'published' ? 'PRODUCTION LIVE' : 'DEPLOYED'}</span>
          </div>
        </div>

        {/* Image / Cover Preview */}
        {project.coverImage && (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 group-hover:border-[#f59e0b]/50 transition-colors">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-transparent opacity-80" />
          </div>
        )}

        {/* Content Body */}
        <div className="space-y-3">
          <h3 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#f3f4f6] group-hover:text-[#f59e0b] transition-colors leading-tight">
            {project.title}
          </h3>
          <p className="font-sans text-sm sm:text-base text-[#9ca3af] leading-relaxed line-clamp-3">
            {project.summary}
          </p>
        </div>

        {/* Technology Stack Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {(project.technologies || ['React', 'TypeScript', 'Tailwind', 'Node.js']).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-[#111319] border border-white/10 rounded-md font-mono-jetbrains text-xs text-[#00f0ff]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer Link Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 mt-2">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="amber-glow-pill px-4 py-2 rounded-lg font-mono-jetbrains text-xs inline-flex items-center gap-2 min-h-[44px]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live System</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#111319] hover:bg-white/10 border border-white/15 text-white rounded-lg font-mono-jetbrains text-xs inline-flex items-center gap-2 transition-colors min-h-[44px]"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            )}
          </div>

          {onOpenDetail && (
            <button
              onClick={() => onOpenDetail(project)}
              className="text-xs font-mono-jetbrains text-[#9ca3af] hover:text-[#f59e0b] inline-flex items-center gap-1 group/btn min-h-[44px]"
            >
              <span>Case Study Dossier</span>
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
