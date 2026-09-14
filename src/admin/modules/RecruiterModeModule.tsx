import React from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { loadAdminStore } from '../store/adminStore';
import { Briefcase, Download, CheckCircle2 } from 'lucide-react';

export const RecruiterModeModule: React.FC = () => {
  const store = loadAdminStore();

  const handleExportCandidatePacket = () => {
    const packetData = {
      profileSummary: store.resumeConfig.summary,
      skills: store.resumeConfig.skills,
      experiences: store.experiences,
      education: store.resumeConfig.education,
      certifications: store.resumeConfig.certifications,
      featuredProjects: store.projects.slice(0, 5),
    };

    const jsonStr = JSON.stringify(packetData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prajwal-candidate-packet-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Recruiter Mode & Candidate Dashboard"
        subtitle="High-impact summary dashboard optimized for tech recruiters and hiring managers"
        status="active"
      />

      <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase bg-[#10b981] text-white px-2.5 py-1 rounded">
            AVAILABLE FOR SENIOR ROLES
          </span>
          <h2 className="font-mono text-xl font-bold text-[#1a1a1a] mt-2">Prajwal D L</h2>
          <p className="text-sm font-sans text-[#666] max-w-xl mt-1">{store.resumeConfig.summary}</p>
        </div>

        <button
          onClick={handleExportCandidatePacket}
          className="bg-[#10b981] text-white font-mono font-bold text-xs px-5 py-3 rounded-lg hover:bg-[#0d9668] transition-colors flex items-center gap-2 shrink-0"
        >
          <Download size={16} /> Export Candidate Packet (JSON)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs mb-8">
        <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-[#1a1a1a] flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#10b981]" />
            <span>Top Core Strengths & Skills</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {store.resumeConfig.skills.map((sk, i) => (
              <span key={i} className="bg-[#e0e0df] text-[#1a1a1a] px-2.5 py-1 rounded font-bold uppercase">
                {sk}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-[#1a1a1a] flex items-center gap-2">
            <Briefcase size={16} className="text-[#10b981]" />
            <span>5 Verified Showcase Projects</span>
          </h3>
          <div className="space-y-1 text-[#666]">
            {store.projects.slice(0, 5).map((p, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-[#eaeaea] rounded border border-[#dcdcdc]">
                <span className="font-bold text-[#1a1a1a]">{p.title}</span>
                <span>{p.tags.slice(0, 2).join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
