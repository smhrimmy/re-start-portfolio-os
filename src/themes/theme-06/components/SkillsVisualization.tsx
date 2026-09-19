import React from 'react';
import { SkillCategory } from '@/types/portfolio';

interface SkillsVisualizationProps {
  skills: SkillCategory[];
}

export const SkillsVisualization: React.FC<SkillsVisualizationProps> = ({ skills }) => {
  return (
    <section id="skills" className="skills-section quiet-entrance relative z-10 py-24 px-6 sm:px-12 bg-gradient-to-b from-[#F5F3F0] to-[#FAFAF8]">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF] block mb-2 font-sans-satoshi">
            03 // SKILLS & CAPABILITIES
          </span>
          <h2 className="section-title text-4xl sm:text-6xl font-serif-instrument font-bold text-[#1A1A1A]">
            Technical Capabilities
          </h2>
        </div>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category) => (
            <div key={category.id || category.category} className="skill-category-card glass-card p-6 sm:p-8 rounded-2xl space-y-6">
              <h3 className="text-xl font-serif-instrument font-bold text-[#1A1A1A] border-b border-black/5 pb-3">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-sans-satoshi">
                      <span className="font-semibold text-[#1A1A1A]">{skill.name}</span>
                      <span className="text-[#A0A0A0] font-mono">{skill.level || 80}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full transition-all duration-700"
                        style={{ width: `${skill.level || 80}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {skills.length === 0 && (
            <p className="text-center text-[#A0A0A0] py-8 text-sm col-span-full">
              Skills matrix loading...
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
