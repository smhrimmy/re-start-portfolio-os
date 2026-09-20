import React from 'react';
import { EraSpec } from '../eras.config';
import { PortfolioIdentity } from '@/types/portfolio';

interface CharacterPlateProps {
  era: EraSpec;
  identity: PortfolioIdentity | null;
}

export const CharacterPlate: React.FC<CharacterPlateProps> = ({ era, identity }) => {
  return (
    <div className="relative group transition-all duration-500">
      {/* Outer Glow Frame */}
      <div
        className="absolute -inset-1.5 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: era.accent }}
      />

      {/* Main Card Frame */}
      <div
        className="relative overflow-hidden rounded-xl border p-2 bg-black/80 backdrop-blur-md shadow-2xl space-y-2"
        style={{ borderColor: era.panelBorder }}
      >
        <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-black">
          <img
            src={identity?.avatarUrl || '/assets/character-reference.png'}
            alt={identity?.name || 'Prajwal DL'}
            className="w-full h-full object-cover filter contrast-105 brightness-105 transition-all duration-700"
          />

          {/* Era Specific Shimmer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75" />
          <div
            className="absolute inset-0 opacity-20 mix-blend-color-dodge pointer-events-none"
            style={{ backgroundColor: era.accent }}
          />

          {/* Top Era Tagline Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 border border-white/20 text-[10px] font-mono tracking-widest text-white uppercase">
            {era.tagline}
          </div>
        </div>

        {/* Bottom Character Role Bar */}
        <div className="px-3 py-2 rounded bg-black/60 border border-white/10 flex items-center justify-between text-[11px] font-mono">
          <span className="text-white/60">OPERATOR:</span>
          <span className="font-bold tracking-wider" style={{ color: era.accent }}>
            {era.characterBadge}
          </span>
        </div>
      </div>
    </div>
  );
};
