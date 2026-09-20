import React from 'react';
import { Experience } from '@/types/portfolio';

interface JournalTabProps {
  experiences: Experience[];
  accentColor: string;
}

export const JournalTab: React.FC<JournalTabProps> = ({ experiences, accentColor }) => {
  const defaultExperiences: Experience[] = [
    {
      id: '1',
      company: 'Antigravity Studio',
      role: 'Lead Creative Technologist',
      location: 'Remote',
      startDate: '2024',
      endDate: 'Present',
      current: true,
      description: 'Architected high-performance 3D WebGL experiences and design systems for enterprise clients.',
      achievements: ['Shipped 10+ 3D web portals'],
      technologies: ['Three.js', 'React', 'TypeScript'],
    },
    {
      id: '2',
      company: 'Orbital Labs',
      role: 'Senior Frontend Engineer',
      location: 'Bengaluru',
      startDate: '2022',
      endDate: '2024',
      current: false,
      description: 'Developed real-time interactive dashboards and 3D data visualization engines.',
      achievements: ['Boosted frame rates by 45%'],
      technologies: ['React', 'WebGL', 'TailwindCSS'],
    },
  ];

  const items = experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold font-mono text-white">SYSTEM JOURNAL // LOGS</h2>
        <p className="text-xs font-mono text-[#91A0AD]">
          05 // CHRONOLOGICAL EXPERIENCE & MILESTONE ENTRIES
        </p>
      </div>

      <div className="space-y-4">
        {items.map((exp) => (
          <div key={exp.id} className="pause-panel pause-bevel p-6 space-y-3 font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                <span className="text-xs font-semibold" style={{ color: accentColor }}>
                  {exp.company}
                </span>
              </div>
              <span className="text-xs text-[#91A0AD] px-2.5 py-1 rounded bg-black/40 border border-white/10 w-fit">
                {exp.startDate} — {exp.current ? 'PRESENT' : exp.endDate}
              </span>
            </div>

            <p className="text-sm text-[#F2F4F7] leading-relaxed font-sans">
              {exp.description}
            </p>

            {exp.technologies && exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.technologies.map((tech, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
