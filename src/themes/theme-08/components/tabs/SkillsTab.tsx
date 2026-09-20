import React, { useState } from 'react';
import { SkillCategory, SkillItem } from '@/types/portfolio';

interface SkillsTabProps {
  skills: SkillCategory[];
  accentColor: string;
}

export const SkillsTab: React.FC<SkillsTabProps> = ({ skills, accentColor }) => {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);
  const [listView, setListView] = useState(false);

  const flatSkills = skills.flatMap((c) => c.skills || []);

  const defaultSkills: SkillItem[] = [
    { name: 'React / Next.js', level: 95, iconName: 'react' },
    { name: 'Three.js / R3F', level: 90, iconName: 'three' },
    { name: 'TypeScript', level: 92, iconName: 'typescript' },
    { name: 'Node.js & APIs', level: 88, iconName: 'node' },
    { name: 'Tailwind & CSS', level: 96, iconName: 'css' },
    { name: 'System Design', level: 85, iconName: 'architecture' },
  ];

  const skillList = flatSkills.length > 0 ? flatSkills : defaultSkills;

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold font-mono text-white">SKILL CONSTELLATION</h2>
          <p className="text-xs font-mono text-[#91A0AD]">
            03 // TECHNICAL NODE NETWORK & MASTERY TREE
          </p>
        </div>

        <button
          onClick={() => setListView(!listView)}
          className="pause-bevel px-4 py-2 border border-white/20 bg-white/5 font-mono text-xs text-white hover:bg-white/10"
        >
          {listView ? 'CONSTELLATION VIEW' : 'LIST VIEW'}
        </button>
      </div>

      {listView ? (
        /* Accessible List View */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillList.map((skill, idx) => (
            <div key={idx} className="pause-panel pause-bevel p-4 flex items-center justify-between font-mono">
              <span className="text-sm font-bold text-white">{skill.name}</span>
              <span style={{ color: accentColor }}>{skill.level}% MASTERY</span>
            </div>
          ))}
        </div>
      ) : (
        /* SVG Constellation Graphic View */
        <div className="pause-panel pause-bevel p-8 relative min-h-[380px] flex flex-col items-center justify-center">
          <svg className="w-full h-64 text-white/20" viewBox="0 0 600 240">
            {/* Constellation edge lines */}
            <line x1="100" y1="60" x2="250" y2="120" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="250" y1="120" x2="400" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="250" y1="120" x2="300" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="400" y1="60" x2="520" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

            {/* Constellation Nodes */}
            {skillList.slice(0, 6).map((skill, i) => {
              const coords = [
                { x: 100, y: 60 },
                { x: 250, y: 120 },
                { x: 400, y: 60 },
                { x: 300, y: 180 },
                { x: 520, y: 140 },
                { x: 160, y: 190 },
              ][i];

              return (
                <g
                  key={i}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                  className="cursor-pointer group"
                >
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={8}
                    fill={accentColor}
                    className="group-hover:scale-125 transition-transform"
                  />
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={16}
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  <text
                    x={coords.x}
                    y={coords.y + 26}
                    fill="#F2F4F7"
                    fontSize="11"
                    fontFamily="monospace"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {skill.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover Skill Inspector */}
          {activeSkill && (
            <div className="absolute bottom-4 left-6 right-6 pause-panel pause-bevel p-3 text-center animate-fade-in border-l-4" style={{ borderColor: accentColor }}>
              <span className="text-xs font-mono text-white/70">FOCUSED NODE: </span>
              <span className="text-xs font-mono font-bold text-white">{activeSkill.name}</span>
              <span className="text-xs font-mono text-white/60 ml-3">({activeSkill.level}% PROFICIENCY)</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
