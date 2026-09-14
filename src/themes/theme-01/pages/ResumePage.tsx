import React from 'react';
import { loadAdminStore } from '../../../admin/store/adminStore';
import { EditorialButton } from '../components/EditorialButton';
import { Printer } from 'lucide-react';

export const ResumePage: React.FC = () => {
  const store = loadAdminStore();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Controls */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#111111] pb-6 mb-8 gap-4">
        <div>
          <span className="font-mono text-xs text-[#8B0000] tracking-widest uppercase mb-1 block">
            CHAPTER 06 // CURRICULUM VITAE
          </span>
          <h1 className="theme-01-display text-3xl font-bold">Master Publication Resume</h1>
        </div>
        <div className="flex items-center gap-3">
          <EditorialButton onClick={handlePrint} variant="primary">
            <Printer size={14} /> PRINT DOCUMENT
          </EditorialButton>
        </div>
      </div>

      {/* Resume Publication Paper Card */}
      <div className="bg-white border border-[#111111] p-8 sm:p-12 shadow-md text-[#111111] space-y-10">
        {/* Header Block */}
        <div className="border-b border-[#111111] pb-8 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="theme-01-display text-4xl font-bold tracking-tight mb-1">
              Prajwal DL
            </h2>
            <p className="font-mono text-xs text-[#8B0000] font-bold tracking-wider uppercase">
              Web Advisor & Full Stack Systems Specialist
            </p>
          </div>
          <div className="font-mono text-xs text-[#555555] space-y-1 sm:text-right">
            <div>+91 8105561638</div>
            <div>pdlkpt@gmail.com</div>
            <div>Mangalore, Karnataka, India</div>
            <div>https://praxel.space</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <h3 className="font-mono text-xs font-bold text-[#8B0000] tracking-widest uppercase border-b border-[#E2E0D8] pb-1 mb-3">
            01 / EXECUTIVE SUMMARY
          </h3>
          <p className="text-xs text-[#333333] leading-relaxed font-light">
            Results-driven Web Advisor and Full Stack Developer with extensive expertise in WordPress site management, hosting migrations, DNS configurations, and building high-performance web applications using React.js, TypeScript, and modern APIs.
          </p>
        </div>

        {/* Work Experience */}
        <div>
          <h3 className="font-mono text-xs font-bold text-[#8B0000] tracking-widest uppercase border-b border-[#E2E0D8] pb-1 mb-4">
            02 / PROFESSIONAL EXPERIENCE
          </h3>
          <div className="space-y-6">
            {store.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-mono text-xs mb-1">
                  <span className="font-bold text-[#111111]">{exp.role} // {exp.company}</span>
                  <span className="text-[#666666]">{exp.period}</span>
                </div>
                <p className="text-xs text-[#555555] font-light mb-2">{exp.description}</p>
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 font-mono text-[10px] text-[#444444]">
                    <span className="text-[#999999] uppercase">TOOLS:</span>
                    {exp.technologies.join(' · ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Projects */}
        <div>
          <h3 className="font-mono text-xs font-bold text-[#8B0000] tracking-widest uppercase border-b border-[#E2E0D8] pb-1 mb-4">
            03 / FEATURED PRODUCTION PROJECTS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {store.projects.slice(0, 4).map((proj) => (
              <div key={proj.id} className="border border-[#E2E0D8] p-4 bg-[#F9F8F6]">
                <div className="font-mono text-xs font-bold text-[#111111] mb-1">{proj.title}</div>
                <p className="text-[11px] text-[#666666] mb-2">{proj.tagline}</p>
                <div className="font-mono text-[10px] text-[#8B0000]">{proj.tags.join(' · ')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Certifications */}
        <div className="border-t border-[#111111] pt-6 flex flex-col sm:flex-row justify-between items-start gap-6 font-mono text-xs">
          <div>
            <span className="font-bold text-[#8B0000] block mb-2">TECHNICAL STACK</span>
            <p className="text-[#444444] max-w-md">
              React.js, TypeScript, JavaScript, Node.js, Express, Tailwind CSS, MySQL, PostgreSQL, WordPress, DNS, SSL, Linux VPS.
            </p>
          </div>
          <div>
            <span className="font-bold text-[#8B0000] block mb-2">EDUCATION</span>
            <p className="text-[#444444]">
              Diploma in Full Stack Web Development (2024)<br />
              Karnataka, India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
