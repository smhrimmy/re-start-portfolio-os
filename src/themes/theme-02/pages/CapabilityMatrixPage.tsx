import React, { useState } from 'react';
import { Cpu } from 'lucide-react';

interface SkillCategory {
  title: string;
  skills: { name: string; level: number; status: string }[];
}

export const CapabilityMatrixPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ALL');

  const categories: SkillCategory[] = [
    {
      title: 'FRONTEND_ENGINEERING',
      skills: [
        { name: 'TypeScript / JavaScript', level: 98, status: 'OPTIMAL' },
        { name: 'React 18/19 & Next.js', level: 95, status: 'OPTIMAL' },
        { name: 'Tailwind CSS / Design Tokens', level: 96, status: 'OPTIMAL' },
        { name: 'Three.js / WebGL / Canvas', level: 85, status: 'ACTIVE' },
        { name: 'State Architecture & Zustand', level: 92, status: 'OPTIMAL' },
      ],
    },
    {
      title: 'BACKEND_&_SYSTEMS',
      skills: [
        { name: 'Node.js & Express / NestJS', level: 94, status: 'OPTIMAL' },
        { name: 'Go / Golang Microservices', level: 88, status: 'ACTIVE' },
        { name: 'Python / FastAPI / AsyncIO', level: 90, status: 'OPTIMAL' },
        { name: 'PostgreSQL & Prisma ORM', level: 92, status: 'OPTIMAL' },
        { name: 'Redis & Distributed Caching', level: 86, status: 'ACTIVE' },
      ],
    },
    {
      title: 'CLOUD_&_DEVOPS',
      skills: [
        { name: 'Docker / Container Security', level: 92, status: 'OPTIMAL' },
        { name: 'Kubernetes / Helm Orchestration', level: 84, status: 'ACTIVE' },
        { name: 'GCP / AWS Cloud Infra', level: 89, status: 'OPTIMAL' },
        { name: 'CI/CD Pipelines & GitHub Actions', level: 95, status: 'OPTIMAL' },
        { name: 'Terraform Infrastructure as Code', level: 82, status: 'ACTIVE' },
      ],
    },
  ];

  const filteredCategories =
    activeTab === 'ALL'
      ? categories
      : categories.filter((c) => c.title.includes(activeTab));

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0D10] text-[#C9D1D9] font-mono py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Header Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363D] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-bold mb-1">
            <Cpu className="w-4 h-4" />
            <span>[SYSTEM_CAPABILITY_MATRIX]</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            ENGINEERING <span className="text-[#00F0FF]">SKILLS</span> MATRIX
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1 border rounded-sm ${
              activeTab === 'ALL'
                ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] font-bold'
                : 'bg-[#161B22] border-[#30363D] text-[#8B949E]'
            }`}
          >
            [ALL_DOMAINS]
          </button>
          <button
            onClick={() => setActiveTab('FRONTEND')}
            className={`px-3 py-1 border rounded-sm ${
              activeTab === 'FRONTEND'
                ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] font-bold'
                : 'bg-[#161B22] border-[#30363D] text-[#8B949E]'
            }`}
          >
            [FRONTEND]
          </button>
          <button
            onClick={() => setActiveTab('BACKEND')}
            className={`px-3 py-1 border rounded-sm ${
              activeTab === 'BACKEND'
                ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] font-bold'
                : 'bg-[#161B22] border-[#30363D] text-[#8B949E]'
            }`}
          >
            [BACKEND]
          </button>
          <button
            onClick={() => setActiveTab('CLOUD')}
            className={`px-3 py-1 border rounded-sm ${
              activeTab === 'CLOUD'
                ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] font-bold'
                : 'bg-[#161B22] border-[#30363D] text-[#8B949E]'
            }`}
          >
            [CLOUD]
          </button>
        </div>
      </div>

      {/* Grid of Capability Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <div
            key={cat.title}
            className="bg-[#161B22] border border-[#30363D] p-5 rounded-sm space-y-4 shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-[#30363D] pb-2">
              <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider">
                [{cat.title}]
              </span>
              <span className="text-[10px] text-[#8B949E]">5 MODULES</span>
            </div>

            <div className="space-y-3">
              {cat.skills.map((s) => (
                <div key={s.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-medium">{s.name}</span>
                    <span className="text-[#00F0FF] font-bold">{s.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#0A0D10] border border-[#30363D] rounded-none overflow-hidden">
                    <div
                      className="h-full bg-[#00F0FF] transition-all duration-500"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
