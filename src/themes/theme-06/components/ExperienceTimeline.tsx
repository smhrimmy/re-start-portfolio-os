import React from 'react';
import { Experience } from '@/types/portfolio';
import { Calendar, Briefcase, MapPin } from 'lucide-react';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences }) => {
  return (
    <section id="experience" className="experience-section quiet-entrance relative z-10 py-24 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF] block mb-2 font-sans-satoshi">
            02 // CAREER TIMELINE
          </span>
          <h2 className="section-title text-4xl sm:text-6xl font-serif-instrument font-bold text-[#1A1A1A]">
            Professional Experience
          </h2>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="glass-card p-6 sm:p-8 rounded-2xl space-y-4 hover:border-[#0066FF]/40 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-4">
                <div>
                  <h3 className="font-serif-instrument font-bold text-2xl text-[#1A1A1A]">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0066FF] mt-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{exp.company}</span>
                    {exp.location && (
                      <>
                        <span className="text-[#A0A0A0]">•</span>
                        <span className="text-[#5C5C5C] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {exp.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-[#A0A0A0] bg-black/5 px-3 py-1.5 rounded-full self-start sm:self-center">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
              </div>

              <p className="text-[#5C5C5C] text-sm leading-relaxed font-sans-satoshi">
                {exp.description}
              </p>

              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="list-disc list-inside text-xs text-[#5C5C5C] space-y-1 pt-2">
                  {exp.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
              )}

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-black/5 text-[#1A1A1A] font-medium">
                      #{tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {experiences.length === 0 && (
            <p className="text-center text-[#A0A0A0] py-8 text-sm">
              Experience history being updated.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
