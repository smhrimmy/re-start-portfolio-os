import React from 'react';
import { loadAdminStore } from '../../../admin/store/adminStore';
import { EditorialButton } from '../components/EditorialButton';

interface ExperiencePageProps {
  onNavigate: (tab: string) => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ onNavigate }) => {
  const store = loadAdminStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="border-b border-[#111111] pb-6 mb-12">
        <span className="font-mono text-xs text-[#8B0000] tracking-widest uppercase mb-2 block">
          CHAPTER 04 // CAREER TIMELINE & ROLES
        </span>
        <h1 className="theme-01-display text-4xl sm:text-5xl font-bold tracking-tight text-[#111111]">
          Professional History
        </h1>
        <p className="text-sm text-[#666666] mt-2 font-light max-w-xl">
          Chronological record of enterprise roles, client consulting, and technical execution.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-12">
        {store.experiences.map((exp, idx) => (
          <div
            key={exp.id}
            className="border-b border-[#E2E0D8] pb-10 flex flex-col md:flex-row md:items-start justify-between gap-6"
          >
            <div className="md:w-1/3">
              <span className="font-mono text-xs font-bold text-[#8B0000] block mb-1">
                ROLE // 0{idx + 1}
              </span>
              <span className="font-mono text-xs text-[#666666] block mb-2">{exp.period}</span>
              <h3 className="theme-01-display text-2xl font-bold text-[#111111]">{exp.company}</h3>
              <p className="font-mono text-xs text-[#444444] mt-1">{exp.location}</p>
            </div>

            <div className="md:w-2/3">
              <h4 className="theme-01-display text-xl font-semibold text-[#111111] mb-3">
                {exp.role}
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed font-light mb-4">
                {exp.description}
              </p>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px] border-t border-[#E2E0D8] pt-3">
                  <span className="text-[#999999] uppercase block w-full mb-1">
                    VERIFIED TECHNOLOGIES & TOOLS:
                  </span>
                  {exp.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="bg-[#F2F0EB] text-[#111111] px-2 py-0.5 border border-[#E2E0D8]">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-12 text-center bg-[#F2F0EB] p-8 border border-[#E2E0D8]">
        <h3 className="theme-01-display text-2xl font-bold mb-2">Looking for a verified summary?</h3>
        <p className="text-xs text-[#666666] mb-6">Download or print the full publication resume document.</p>
        <EditorialButton onClick={() => onNavigate('resume')} variant="primary">
          OPEN RESUME & PRINT →
        </EditorialButton>
      </div>
    </div>
  );
};
