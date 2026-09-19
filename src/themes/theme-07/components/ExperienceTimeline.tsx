import React from 'react';
import { Experience } from '@/types/portfolio';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences }) => {
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
      achievements: ['Shipped 10+ 3D web portals', 'Boosted WebGL frame rate by 40%'],
      technologies: ['Three.js', 'React', 'TypeScript', 'Shader Programming'],
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
      achievements: ['Reduced initial load time by 50%'],
      technologies: ['React', 'WebGL', 'TailwindCSS', 'GSAP'],
    },
  ];

  const items = experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <section className="relative py-24 px-6 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-xs font-mono tracking-widest text-[#69D9FF] uppercase">
          04 // CAREER TRAJECTORY
        </h2>
        <h3 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          Timeline of Motion
        </h3>
        <p className="text-[#91A0AD] text-sm">
          Chronological progression across lead roles, spatial graphics engineering, and product launches.
        </p>
      </div>

      {/* Timeline Nodes */}
      <div className="relative border-l-2 border-white/15 ml-4 sm:ml-32 space-y-12">
        {items.map((exp: Experience, idx: number) => (
          <div key={exp.id || idx} className="relative pl-8 group">
            {/* Luminous Glass Node Marker */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#07090D] border-2 border-[#249BFF] group-hover:bg-[#69D9FF] group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(36,155,255,0.6)]" />

            {/* Glass Card Content */}
            <div className="architect-glass p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-xl font-serif font-bold text-white group-hover:text-[#69D9FF] transition-colors">
                    {exp.role}
                  </h4>
                  <span className="text-sm font-medium text-[#D8955D]">{exp.company}</span>
                </div>
                <span className="text-xs font-mono text-[#91A0AD] px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
                  {exp.startDate} — {exp.current ? 'PRESENT' : exp.endDate}
                </span>
              </div>

              <p className="text-sm text-[#91A0AD] leading-relaxed">
                {exp.description}
              </p>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech: string, sIdx: number) => (
                    <span key={sIdx} className="text-[11px] font-mono text-white/70 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
