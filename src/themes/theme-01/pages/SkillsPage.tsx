import React from 'react';

export const SkillsPage: React.FC = () => {
  const skillGroups = [
    {
      category: 'CORE TECHNICAL STACK',
      skills: [
        { name: 'React.js & Next.js', level: 'ADVANCED', years: '4+ YEARS' },
        { name: 'TypeScript & JavaScript (ES6+)', level: 'EXPERT', years: '5+ YEARS' },
        { name: 'Tailwind CSS & CSS Architecture', level: 'EXPERT', years: '5+ YEARS' },
        { name: 'Node.js & Express APIs', level: 'ADVANCED', years: '4+ YEARS' },
      ],
    },
    {
      category: 'HOSTING, DNS & MIGRATION',
      skills: [
        { name: 'DNS Record Management & Propagation', level: 'EXPERT', years: '5+ YEARS' },
        { name: 'cPanel, VPS & Server Administration', level: 'ADVANCED', years: '4+ YEARS' },
        { name: 'SSL Certificate Installation & Zero-Downtime Migration', level: 'EXPERT', years: '5+ YEARS' },
        { name: 'WordPress Core & CMS Maintenance', level: 'EXPERT', years: '5+ YEARS' },
      ],
    },
    {
      category: 'DATABASES & TELEMETRY',
      skills: [
        { name: 'MySQL & PostgreSQL Schema Design', level: 'ADVANCED', years: '3+ YEARS' },
        { name: 'SQLite & Local Storage Sync', level: 'EXPERT', years: '4+ YEARS' },
        { name: 'REST APIs & Webhook Integrations', level: 'EXPERT', years: '5+ YEARS' },
        { name: 'Git Version Control & CI/CD Pipelines', level: 'EXPERT', years: '5+ YEARS' },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="border-b border-[#111111] pb-6 mb-12">
        <span className="font-mono text-xs text-[#8B0000] tracking-widest uppercase mb-2 block">
          CHAPTER 05 // COMPETENCIES MATRIX
        </span>
        <h1 className="theme-01-display text-4xl sm:text-5xl font-bold tracking-tight text-[#111111]">
          Technical Skills & Stack
        </h1>
        <p className="text-sm text-[#666666] mt-2 font-light max-w-xl">
          Verified stack proficiencies, infrastructure capabilities, and technical domain mastery.
        </p>
      </div>

      {/* Skill Groups */}
      <div className="space-y-12">
        {skillGroups.map((group, gIdx) => (
          <div key={gIdx} className="border-b border-[#E2E0D8] pb-10">
            <div className="font-mono text-xs font-bold text-[#8B0000] mb-4">
              SECTION 0{gIdx + 1} // {group.category}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-white p-5 border border-[#E2E0D8] hover:border-[#111111] transition-all flex items-center justify-between"
                >
                  <div>
                    <h3 className="theme-01-display text-base font-bold text-[#111111]">
                      {skill.name}
                    </h3>
                    <span className="font-mono text-[10px] text-[#666666]">{skill.years}</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#8B0000] bg-[#F2F0EB] px-2 py-1 border border-[#E2E0D8]">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
