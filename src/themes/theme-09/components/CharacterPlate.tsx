import React, { useState } from 'react';
import { EraSpec } from '../eras.config';
import { PortfolioIdentity } from '@/types/portfolio';

interface CharacterPlateProps {
  era: EraSpec;
  identity: PortfolioIdentity | null;
}

export const CharacterPlate: React.FC<CharacterPlateProps> = ({ era, identity }) => {
  const [showStats, setShowStats] = useState(false);
  const info = era.characterInfo;

  return (
    <div className="relative group transition-all duration-500">
      {/* Outer Glow Frame */}
      <div
        className="absolute -inset-1.5 rounded-xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: era.accent }}
      />

      {/* Main Card Frame */}
      <div
        className="relative overflow-hidden rounded-xl border p-3 bg-black/85 backdrop-blur-md shadow-2xl space-y-3"
        style={{ borderColor: era.panelBorder }}
      >
        {/* Character Portrait Frame */}
        <div className="relative aspect-[4/4.5] rounded-lg overflow-hidden bg-black">
          <img
            src={identity?.avatarUrl || '/assets/character-reference.png'}
            alt={identity?.name || 'Prajwal DL'}
            className="w-full h-full object-cover filter contrast-105 brightness-105 transition-all duration-700 group-hover:scale-105"
          />

          {/* Era Specific Gradient Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
          <div
            className="absolute inset-0 opacity-20 mix-blend-color-dodge pointer-events-none"
            style={{ backgroundColor: era.accent }}
          />

          {/* Top Era Tagline Badge */}
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/85 border border-white/20 text-[9px] font-mono tracking-widest text-white uppercase shadow-md">
            {era.tagline}
          </div>

          {/* Toggle Stats / Bio Button */}
          <button
            onClick={() => setShowStats(!showStats)}
            className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 hover:bg-black border border-white/20 text-[9px] font-mono tracking-wider text-white transition-colors cursor-pointer"
          >
            {showStats ? '📷 PORTRAIT' : '📊 STATS'}
          </button>

          {/* Bottom Name & Role Overlay */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left space-y-0.5">
            <div className="text-xs font-extrabold uppercase font-mono tracking-wider text-white drop-shadow">
              {info.alias}
            </div>
            <div className="text-[10px] font-mono tracking-wide" style={{ color: era.accent }}>
              {info.operatorRole}
            </div>
          </div>
        </div>

        {/* Character Stats or Bio Panel */}
        {showStats ? (
          <div className="space-y-1.5 p-2 rounded bg-black/60 border border-white/10 font-mono text-[10px]">
            <div className="flex justify-between items-center text-white/50 text-[9px] uppercase tracking-widest border-b border-white/10 pb-1 mb-1.5">
              <span>CHARACTER STATS</span>
              <span>OVERALL: 95%</span>
            </div>

            {[
              { label: 'STAMINA', val: info.stats.stamina },
              { label: 'CODING (SHOOTING)', val: info.stats.shooting },
              { label: 'SYSTEM ARCH (STRENGTH)', val: info.stats.strength },
              { label: 'DEBUGGING (STEALTH)', val: info.stats.stealth },
              { label: 'CLOUD & DEPLOY (FLYING)', val: info.stats.flying },
              { label: 'EXECUTION PACE (DRIVING)', val: info.stats.driving },
            ].map((st) => (
              <div key={st.label} className="space-y-0.5">
                <div className="flex justify-between text-white/70">
                  <span>{st.label}</span>
                  <span style={{ color: era.accent }}>{st.val}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${st.val}%`,
                      backgroundColor: era.accent,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 text-left font-mono text-[11px]">
            <p className="text-white/70 text-[10.5px] leading-relaxed italic">
              "{info.bio}"
            </p>

            {/* Specialty & Weapon Tags */}
            <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
              <div className="p-1.5 rounded bg-black/60 border border-white/10 flex flex-col">
                <span className="text-white/40 text-[8.5px]">SPECIALTY:</span>
                <span className="font-bold text-white tracking-wide truncate">{info.specialty}</span>
              </div>
              <div className="p-1.5 rounded bg-black/60 border border-white/10 flex flex-col">
                <span className="text-white/40 text-[8.5px]">PRIMARY WEAPON:</span>
                <span className="font-bold tracking-wide truncate" style={{ color: era.accent }}>
                  {info.primaryWeapon}
                </span>
              </div>
            </div>

            {/* Location Bar */}
            <div className="px-2.5 py-1.5 rounded bg-black/60 border border-white/10 flex items-center justify-between text-[10px]">
              <span className="text-white/50">BASE LOCATION:</span>
              <span className="font-bold text-white tracking-wide">{info.location}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

