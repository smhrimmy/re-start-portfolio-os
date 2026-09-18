import React from 'react';
import { Cpu, Server, Globe, Shield, Terminal, Code2 } from 'lucide-react';

export const SkillOrbitMatrix: React.FC = () => {
  const skills = [
    {
      category: 'Frontend Systems',
      icon: <Code2 className="w-5 h-5 text-[#00f0ff]" />,
      items: ['React 18', 'TypeScript', 'Tailwind CSS', 'Three.js / WebGL', 'Framer Motion'],
      desc: 'Architecting high-performance, accessible, and reactive user interfaces.'
    },
    {
      category: 'Backend & APIs',
      icon: <Server className="w-5 h-5 text-[#f59e0b]" />,
      items: ['Node.js', 'Express', 'REST APIs', 'Zod', 'PostgreSQL / SQL'],
      desc: 'Building scalable REST endpoints, data stores, and server logic.'
    },
    {
      category: 'DNS & Cloud Infrastructure',
      icon: <Globe className="w-5 h-5 text-[#10b981]" />,
      items: ['DNS Management', 'Cloud Hosting', 'SSL Certificates', 'Zero-Downtime Migrations', 'WordPress Infrastructure'],
      desc: 'Handling complex domain transitions, SSL provisioning, and cloud deployment pipelines.'
    },
    {
      category: 'Tooling & Security',
      icon: <Shield className="w-5 h-5 text-[#ec4899]" />,
      items: ['Git / GitHub', 'Vite', 'Docker', 'Linux / VPS', 'System Health Telemetry'],
      desc: 'Automating build pipelines, environment configurations, and security audits.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {skills.map((skill, idx) => (
        <div
          key={idx}
          className="spatial-card p-6 sm:p-8 flex flex-col justify-between gap-4 group"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#111319] border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <h3 className="font-space-grotesk text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                {skill.category}
              </h3>
            </div>
            <span className="font-mono-jetbrains text-xs text-[#9ca3af]">NODE 0{idx + 1}</span>
          </div>

          <p className="font-sans text-sm text-[#9ca3af] leading-relaxed">
            {skill.desc}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {skill.items.map((item, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-[#111319] border border-[#00f0ff]/30 text-[#00f0ff] rounded-lg font-mono-jetbrains text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
