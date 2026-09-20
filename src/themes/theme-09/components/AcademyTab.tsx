import React from 'react';
import { PortfolioIdentity } from '@/types/portfolio';

interface AcademyTabProps {
  identity: PortfolioIdentity | null;
  accentColor: string;
}

export const AcademyTab: React.FC<AcademyTabProps> = ({ identity, accentColor }) => {
  return (
    <div className="space-y-6 text-left font-mono">
      {/* Header Banner */}
      <div className="p-6 rounded-xl bg-black/80 border border-white/15 space-y-2">
        <div className="text-xs uppercase tracking-widest text-white/50">ACADEMY & TRAINING GROUND</div>
        <h2 className="text-2xl font-extrabold text-white tracking-wide uppercase">
          EDUCATION & MILESTONES
        </h2>
        <p className="text-xs text-white/70 max-width-prose leading-relaxed">
          Formal computer science foundations combined with late-night self-taught engineering.
        </p>
      </div>

      {/* Degrees & Certifications Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Formal Degree */}
        <div className="p-5 rounded-xl bg-black/70 border border-white/15 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              BACHELOR DEGREE
            </span>
            <span className="text-white/40">2020 – 2024</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase">
              B.Tech in Computer Science & Engineering
            </h3>
            <p className="text-xs text-white/60">Major in Software Systems & Architecture</p>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Strong foundation in algorithms, data structures, database management systems, operating systems, and computer networks.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['Algorithms', 'OS', 'DBMS', 'Networks', 'OOP'].map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/80">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Self-Taught & Certifications */}
        <div className="p-5 rounded-xl bg-black/70 border border-white/15 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              CONTINUOUS LEARNING
            </span>
            <span className="text-white/40">ALWAYS ACTIVE</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase">
              Full-Stack & Systems Masterclass
            </h3>
            <p className="text-xs text-white/60">Self-Directed Deep Dives & Certifications</p>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Mastered modern React, WebGL/Three.js spatial graphics, distributed backend design, and production cloud ops through hands-on project builds.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['React', 'TypeScript', 'Node.js', 'Three.js', 'Docker', 'AWS'].map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]" style={{ color: accentColor }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
