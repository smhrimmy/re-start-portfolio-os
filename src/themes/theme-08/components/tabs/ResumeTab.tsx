import React from 'react';
import { PortfolioIdentity } from '@/types/portfolio';

interface ResumeTabProps {
  identity: PortfolioIdentity | null;
  onJumpToQuests: () => void;
  accentColor: string;
}

export const ResumeTab: React.FC<ResumeTabProps> = ({ identity, onJumpToQuests, accentColor }) => {
  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Title Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono" style={{ color: accentColor }}>
          <span>●</span>
          <span>PAUSE MENU // HERO RESUME</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-wider font-mono text-white">
          {identity?.name || 'PRAJWAL DL'}
        </h1>
        <p className="text-base sm:text-lg text-[#91A0AD] font-mono">
          {identity?.tagline || 'WEB ADVISOR · FULL STACK DEVELOPER · TROUBLESHOOTING SPECIALIST'}
        </p>
      </div>

      {/* Main Glass Panel */}
      <div className="pause-panel pause-bevel p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold font-mono text-white">SYSTEM SUMMARY</h2>
        <p className="text-[#F2F4F7] leading-relaxed text-sm sm:text-base">
          {identity?.bio ||
            'Building high-performance interactive web systems, 3D WebGL graphics, and robust cloud software. Focused on diegetic UI design, architectural elegance, and rapid execution.'}
        </p>
      </div>

      {/* Three Stat Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="pause-panel pause-bevel p-5 space-y-1">
          <span className="text-xs font-mono text-[#91A0AD]">YEARS BUILDING</span>
          <div className="text-2xl font-bold font-mono text-white">
            {identity?.stats?.yearsBuilding || '5+ YEARS'}
          </div>
        </div>

        <div className="pause-panel pause-bevel p-5 space-y-1">
          <span className="text-xs font-mono text-[#91A0AD]">PROJECTS SHIPPED</span>
          <div className="text-2xl font-bold font-mono text-white" style={{ color: accentColor }}>
            {identity?.stats?.projectsShipped || '35+ SHIPPED'}
          </div>
        </div>

        <div className="pause-panel pause-bevel p-5 space-y-1">
          <span className="text-xs font-mono text-[#91A0AD]">CLIENT SATISFACTION</span>
          <div className="text-2xl font-bold font-mono text-white">
            {identity?.stats?.happyClients || '100%'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={onJumpToQuests}
          className="pause-bevel px-8 py-4 font-bold tracking-wider font-mono text-black transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          style={{ backgroundColor: accentColor }}
        >
          ▸ RESUME GAME (VIEW QUESTS)
        </button>
        <a
          href={identity?.resumeUrl || '/assets/resume.pdf'}
          download
          className="pause-bevel px-8 py-4 border border-white/20 bg-white/5 font-mono text-white hover:bg-white/10 transition-colors text-center"
        >
          ⤓ DOWNLOAD CV
        </a>
      </div>
    </div>
  );
};
