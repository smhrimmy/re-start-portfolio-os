import React, { useState } from 'react';
import { GitCommit, Calendar, Building, CheckCircle } from 'lucide-react';
import { getTheme02StoreData, Theme02Experience } from '../utils/theme02DataAdapter';

export const CareerTimelinePage: React.FC = () => {
  const [adminData] = useState(() => getTheme02StoreData());

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0D10] text-[#C9D1D9] font-mono py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Header Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363D] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-bold mb-1">
            <GitCommit className="w-4 h-4" />
            <span>[CAREER_NODE_TRAVERSAL]</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            TIMELINE & <span className="text-[#00F0FF]">SYSTEM ROLES</span>
          </h1>
        </div>
        <div className="text-xs text-[#8B949E]">
          TOTAL NODES: <span className="text-[#00F0FF] font-bold">{adminData.experiences.length} UNITS</span>
        </div>
      </div>

      {/* Node Traversal List */}
      <div className="relative border-l-2 border-[#00F0FF]/40 ml-4 pl-6 space-y-8 py-2">
        {adminData.experiences.map((exp: Theme02Experience) => (
          <div key={exp.id} className="relative group">
            {/* Node Pulse Indicator */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0A0D10] border-2 border-[#00F0FF] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
            </div>

            <div className="bg-[#161B22] border border-[#30363D] group-hover:border-[#00F0FF]/50 p-5 rounded-sm space-y-3 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#30363D] pb-2 text-xs">
                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                    {exp.role}
                  </h2>
                  <div className="flex items-center gap-2 text-[#8B949E] mt-0.5">
                    <Building className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span className="text-white font-medium">{exp.company}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[#FF9F1C] bg-[#0A0D10] px-2.5 py-1 border border-[#30363D] rounded-sm w-fit">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-xs text-[#8B949E] leading-relaxed">{exp.description}</p>

              {/* Achievements */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <div className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-wider">
                    SYSTEM DELIVERABLES:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {exp.achievements.map((ach: string, i: number) => (
                      <div
                        key={i}
                        className="p-2 bg-[#0A0D10] border border-[#30363D] flex items-start gap-2 text-xs text-[#C9D1D9]"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-[#00F0FF] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 pt-2">
                {exp.tech.map((t: string, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[10px] bg-[#0A0D10] border border-[#30363D] text-[#8B949E]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
