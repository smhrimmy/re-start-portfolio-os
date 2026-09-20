import React from 'react';
import { PortfolioIdentity } from '@/types/portfolio';

interface ProfileTabProps {
  identity: PortfolioIdentity | null;
  accentColor: string;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ identity, accentColor }) => {
  const attributes = [
    { name: 'PROBLEM SOLVING', level: 95 },
    { name: 'SYSTEM DESIGN', level: 90 },
    { name: '3D WEBGUL GRAPHICS', level: 92 },
    { name: 'FRONTEND ARCHITECTURE', level: 96 },
    { name: 'RUNTIME TROUBLESHOOTING', level: 94 },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold font-mono text-white">CHARACTER SHEET</h2>
        <p className="text-xs font-mono text-[#91A0AD]">
          01 // BIOGRAPHICAL PROFILE & ATTRIBUTE PARAMETERS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Framed Character Portrait */}
        <div className="lg:col-span-5 space-y-3">
          <div className="pause-panel pause-bevel p-2 relative group overflow-hidden border-2" style={{ borderColor: `${accentColor}66` }}>
            <img
              src={identity?.avatarUrl || '/assets/character-reference.png'}
              alt={identity?.name || 'Prajwal DL'}
              className="w-full aspect-[4/5] object-cover filter brightness-95 contrast-105"
            />
            <div className="absolute bottom-4 left-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/20 font-mono text-xs flex justify-between">
              <span className="text-white/70">CLASS</span>
              <span className="font-bold text-white" style={{ color: accentColor }}>CREATIVE ARCHITECT</span>
            </div>
          </div>

          <div className="pause-panel pause-bevel p-4 text-xs font-mono space-y-1">
            <div className="flex justify-between text-white/60">
              <span>LOCATION</span>
              <span className="text-white">{identity?.location || 'Bengaluru, India'}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>STATUS</span>
              <span className="text-emerald-400 font-bold">ACTIVE FOR PROJECTS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Prose & RPG Attribute Bars */}
        <div className="lg:col-span-7 space-y-6">
          <div className="pause-panel pause-bevel p-6 space-y-4">
            <h3 className="text-lg font-bold font-mono text-white">BIOGRAPHY & MISSION</h3>
            <p className="text-sm text-[#F2F4F7] leading-relaxed">
              Prajwal DL is a developer and creative technologist building immersive digital experiences at the intersection of web performance, spatial 3D graphics, and intuitive user interfaces.
            </p>
          </div>

          {/* RPG Attribute Skill Bars */}
          <div className="pause-panel pause-bevel p-6 space-y-4">
            <h3 className="text-xs font-mono tracking-widest text-[#91A0AD] uppercase">
              ATTRIBUTES & MASTERY
            </h3>

            <div className="space-y-4">
              {attributes.map((attr, idx) => (
                <div key={idx} className="space-y-1.5 font-mono">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-bold">{attr.name}</span>
                    <span style={{ color: accentColor }}>{attr.level} / 100</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/60 rounded-sm overflow-hidden border border-white/10">
                    <div
                      className="h-full transition-all duration-700 ease-out"
                      style={{
                        width: `${attr.level}%`,
                        backgroundColor: accentColor,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
