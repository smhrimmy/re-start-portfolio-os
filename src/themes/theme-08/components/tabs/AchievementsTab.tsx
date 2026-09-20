import React from 'react';

interface TrophyItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  unlocked: boolean;
  icon: string;
  description: string;
}

interface AchievementsTabProps {
  accentColor: string;
}

export const AchievementsTab: React.FC<AchievementsTabProps> = ({ accentColor }) => {
  const trophies: TrophyItem[] = [
    {
      id: '1',
      title: 'Full Stack Web Architect',
      issuer: 'Meta / Coursera',
      date: '2024',
      unlocked: true,
      icon: '🏆',
      description: 'Certified mastery in end-to-end full-stack web architecture and database optimization.',
    },
    {
      id: '2',
      title: '3D Graphics Specialist',
      issuer: 'Three.js Journey',
      date: '2024',
      unlocked: true,
      icon: '🌌',
      description: 'Advanced shaders, matrix transformations, and WebGL scene performance.',
    },
    {
      id: '3',
      title: 'Accessibility Pioneer',
      issuer: 'W3C / WebAIM',
      date: '2023',
      unlocked: true,
      icon: '♿',
      description: '100% WCAG 2.2 AA contrast compliance and full screen reader interoperability.',
    },
    {
      id: '4',
      title: 'AI System Integration Master',
      issuer: 'Google Cloud Platform',
      date: '2025',
      unlocked: true,
      icon: '🤖',
      description: 'Autonomous agent design, Gemini API integration, and MCP sidecars.',
    },
    {
      id: '5',
      title: '100k Concurrent Users Launched',
      issuer: 'Production Release',
      date: 'LOCKED',
      unlocked: false,
      icon: '🔒',
      description: 'Scale next enterprise application to 100k active users.',
    },
    {
      id: '6',
      title: 'Global Design Award Nominee',
      issuer: 'Awwwards / FWA',
      date: 'LOCKED',
      unlocked: false,
      icon: '🔒',
      description: 'Nominate Theme 08 Diegetic UI for global site of the year.',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold font-mono text-white">ACHIEVEMENTS // TROPHIES</h2>
        <p className="text-xs font-mono text-[#91A0AD]">
          06 // CERTIFICATIONS, RECOGNITION & UNLOCKED MILESTONES
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trophies.map((item) => (
          <div
            key={item.id}
            className={`pause-panel pause-bevel p-6 space-y-4 font-mono transition-all duration-300 ${
              item.unlocked
                ? 'border-2 text-white'
                : 'opacity-40 border border-white/10 filter grayscale'
            }`}
            style={{ borderColor: item.unlocked ? accentColor : undefined }}
          >
            <div className="flex justify-between items-center text-xs">
              <span className="text-3xl">{item.icon}</span>
              <span
                className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                  item.unlocked ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-white/10 text-white/50'
                }`}
              >
                {item.unlocked ? 'UNLOCKED' : 'LOCKED'}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white leading-tight">{item.title}</h3>
              <div className="text-xs text-[#91A0AD]">
                {item.issuer} • {item.date}
              </div>
            </div>

            <p className="text-xs text-white/70 font-sans leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
