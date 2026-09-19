import React, { useState } from 'react';
import { SkillItem } from '@/types/portfolio';

interface SkillsOrbitProps {
  skills: SkillItem[];
}

export const SkillsOrbit: React.FC<SkillsOrbitProps> = ({ skills }) => {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const defaultSkills: SkillItem[] = [
    { name: 'React / Next.js', level: 95, iconName: 'react' },
    { name: 'Three.js / R3F', level: 90, iconName: 'three' },
    { name: 'TypeScript', level: 92, iconName: 'typescript' },
    { name: 'GSAP & Framer', level: 88, iconName: 'motion' },
    { name: 'Tailwind & CSS', level: 96, iconName: 'css' },
    { name: 'Figma Design', level: 85, iconName: 'figma' },
  ];

  const skillList = skills.length > 0 ? skills : defaultSkills;

  return (
    <section className="relative py-24 px-6 max-w-7xl mx-auto z-10">
      {/* Section Title */}
      <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-xs font-mono tracking-widest text-[#D8955D] uppercase">
          02 // TECHNICAL CAPABILITIES
        </h2>
        <h3 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          The Toolkit
        </h3>
        <p className="text-[#91A0AD] text-sm">
          Core technologies powering 3D environments, interactive systems, and high-performance interfaces.
        </p>
      </div>

      {/* Orbit Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillList.map((skill: SkillItem, index: number) => (
          <div
            key={index}
            onMouseEnter={() => setActiveSkill(skill)}
            onMouseLeave={() => setActiveSkill(null)}
            className="architect-glass architect-glass-interactive p-6 flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#69D9FF] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                MODULE 0{index + 1}
              </span>
              <span className="text-sm font-bold text-[#D8955D]">
                {skill.level || 90}%
              </span>
            </div>

            <h4 className="text-xl font-serif font-semibold text-white group-hover:text-[#69D9FF] transition-colors">
              {skill.name}
            </h4>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#249BFF] to-[#D8955D] rounded-full transition-all duration-500"
                style={{ width: `${skill.level || 90}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Detail Toast when hovering a skill */}
      {activeSkill && (
        <div className="mt-8 architect-glass p-4 text-center max-w-md mx-auto animate-fade-in border-l-4 border-l-[#69D9FF]">
          <span className="text-xs font-mono text-[#91A0AD]">FOCUSED TOOLKIT MODULE</span>
          <p className="text-sm font-semibold text-white mt-1">
            {activeSkill.name} — Optimized for high frame rate, responsive WebGL scenes.
          </p>
        </div>
      )}
    </section>
  );
};
