import React from 'react';
import { CharacterAvatar } from './CharacterAvatar';
import { PortfolioIdentity } from '../../../types/portfolio';

interface AboutChamberProps {
  identity: PortfolioIdentity | null;
}

export const AboutChamber: React.FC<AboutChamberProps> = ({ identity }) => {
  const metadata = [
    { label: 'ROLE', value: identity?.role || 'CREATIVE DEVELOPER' },
    { label: 'FOCUS', value: '3D WEB EXPERIENCES & WEBGUL SCENERY' },
    { label: 'METHOD', value: 'DESIGN × CODE × MOTION' },
    { label: 'STATUS', value: 'BUILDING THE NEXT IDEA' },
  ];

  return (
    <section className="relative py-24 px-6 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-xs font-mono tracking-widest text-[#69D9FF] uppercase">
          01 // ABOUT THE ARCHITECT
        </h2>
        <h3 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          Behind the Interface
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#249BFF] to-[#D8955D] mx-auto rounded-full" />
      </div>

      {/* Main Glass Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Holographic Character Card */}
        <div className="lg:col-span-5 flex justify-center">
          <CharacterAvatar mode="focused" className="w-full max-w-sm" />
        </div>

        {/* Right: Profile Details & Metadata */}
        <div className="lg:col-span-7 space-y-8">
          <div className="architect-glass p-8 sm:p-10 space-y-6">
            <h4 className="text-2xl font-serif font-semibold text-white">
              {identity?.name || 'Prajwal DL'} — Creative Developer
            </h4>
            <p className="text-[#91A0AD] leading-relaxed text-base">
              I specialize in crafting high-impact digital experiences that seamlessly blend interactive 3D WebGL scenes, custom shader animations, and bulletproof frontend architecture.
            </p>
            <p className="text-[#91A0AD] leading-relaxed text-base">
              With a deep focus on design precision, accessibility, and smooth performance, every project is engineered as an immersive digital world.
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metadata.map((item, idx) => (
              <div key={idx} className="architect-glass p-5 flex flex-col space-y-1 border-l-2 border-l-[#249BFF]">
                <span className="text-[11px] font-mono text-[#91A0AD] tracking-widest">{item.label}</span>
                <span className="text-sm font-semibold text-[#F2F5F7]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
