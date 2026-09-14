import React, { useEffect, useRef } from 'react';
import { Project } from '@/types/portfolio';
import { X, ExternalLink, Github } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) {
        dialog.showModal();
      }
      document.body.style.overflow = 'hidden';
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="m-auto backdrop:bg-[#18203A]/42 max-w-[780px] w-[calc(100%-32px)] max-h-[85svh] p-6 sm:p-9 bg-white text-[#18203A] border border-[#D9DCE4] rounded-[20px] shadow-xl overflow-y-auto outline-none"
    >
      <div className="relative flex flex-col gap-6">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-[#18203A]/10 pb-4">
          <div>
            <span className="font-sans-satoshi text-xs font-bold text-[#3054DE] uppercase tracking-wider">
              {project.role || 'FULL STACK CASE STUDY'}
            </span>
            <h2 className="font-serif-instrument text-[2.2rem] sm:text-[2.8rem] font-normal leading-[1.1] text-[#18203A] mt-1">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#18203A]/5 hover:bg-[#18203A]/10 flex items-center justify-center text-[#18203A] transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Links if available */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#3054DE] text-white rounded-full text-xs font-medium font-sans-satoshi hover:bg-[#203ebb] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#18203A] text-white rounded-full text-xs font-medium font-sans-satoshi hover:bg-[#263454] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                Source Repository
              </a>
            )}
          </div>
        )}

        {/* Overview */}
        <div className="space-y-2">
          <h3 className="font-serif-instrument text-[1.5rem] font-normal text-[#18203A]">
            Overview
          </h3>
          <p className="font-sans-satoshi text-[0.92rem] text-[#536083] leading-relaxed">
            {project.summary || "Case study detailing product goals, design architecture, and engineering implementation."}
          </p>
        </div>

        {/* Problem */}
        <div className="space-y-2">
          <h3 className="font-serif-instrument text-[1.5rem] font-normal text-[#18203A]">
            The Problem
          </h3>
          <p className="font-sans-satoshi text-[0.92rem] text-[#536083] leading-relaxed">
            {project.caseStudyBody
              ? project.caseStudyBody.slice(0, 220) + "..."
              : "Identifying user friction points, scalability bottlenecks, and workflow inefficiencies prior to architecture design."}
          </p>
        </div>

        {/* Solution */}
        <div className="space-y-2">
          <h3 className="font-serif-instrument text-[1.5rem] font-normal text-[#18203A]">
            The Solution
          </h3>
          <p className="font-sans-satoshi text-[0.92rem] text-[#536083] leading-relaxed">
            {project.caseStudyBody || "Architected a full-stack solution featuring reactive state management, clean design tokens, and optimized cloud backend pipelines."}
          </p>
        </div>

        {/* Technologies / Contribution */}
        <div className="space-y-2">
          <h3 className="font-serif-instrument text-[1.5rem] font-normal text-[#18203A]">
            My Contribution & Stack
          </h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {(project.technologies || ['TypeScript', 'React', 'Tailwind', 'Node.js']).map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#F1EDFF] text-[#3054DE] font-sans-satoshi text-xs font-semibold rounded-md border border-[#3054DE]/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Process & Outcome */}
        <div className="space-y-2 border-t border-[#18203A]/10 pt-4">
          <h3 className="font-serif-instrument text-[1.5rem] font-normal text-[#18203A]">
            Process & Outcome
          </h3>
          <p className="font-sans-satoshi text-[0.92rem] text-[#536083] leading-relaxed">
            From initial requirements analysis through component prototyping and production deployment, delivered measurable efficiency gains and robust UI ergonomics.
          </p>
        </div>
      </div>
    </dialog>
  );
};
