import React, { useState } from 'react';
import { User, Laptop } from 'lucide-react';
import { ControlDeckButton } from '../components/ControlDeckButton';
import { getTheme02StoreData } from '../utils/theme02DataAdapter';

export const ProfileConsolePage: React.FC = () => {
  const [adminData] = useState(() => getTheme02StoreData());
  const profile = adminData.ownerProfile;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0D10] text-[#C9D1D9] font-mono py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Header Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363D] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-bold mb-1">
            <User className="w-4 h-4" />
            <span>[OPERATOR_PROFILE_CONSOLE]</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            SYSTEM <span className="text-[#00F0FF]">OPERATOR</span> PROFILE
          </h1>
        </div>

        <a href={adminData.resumeConfig.pdfUrl || '#'} target="_blank" rel="noopener noreferrer">
          <ControlDeckButton variant="primary" size="sm">
            DOWNLOAD SPECIFICATION SHEET (.PDF)
          </ControlDeckButton>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bio Console Card */}
        <div className="lg:col-span-8 bg-[#161B22] border border-[#30363D] p-6 rounded-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#30363D] pb-2 text-xs">
            <span className="font-bold text-[#00F0FF]">[BIOGRAPHICAL_TELEMETRY]</span>
            <span className="text-[#8B949E]">STATUS: ACTIVE</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-24 h-24 rounded-sm border border-[#00F0FF]/50 object-cover"
            />
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">{profile.name}</h2>
              <div className="text-xs text-[#00F0FF] font-bold">{profile.title}</div>
              <div className="text-xs text-[#8B949E]">{profile.location}</div>
              <p className="text-xs text-[#C9D1D9] pt-2 leading-relaxed">{profile.bio}</p>
            </div>
          </div>

          {/* Principles */}
          <div className="space-y-2 pt-4 border-t border-[#30363D]">
            <div className="text-xs font-bold text-[#FF9F1C]">[OPERATIONAL_PRINCIPLES]</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-3 bg-[#0A0D10] border border-[#30363D] text-xs">
                <div className="font-bold text-white mb-1">01. HARDWARE-GRADE PRECISION</div>
                <p className="text-[11px] text-[#8B949E]">
                  Every UI state, transition, and endpoint contract is verified against strict engineering standards.
                </p>
              </div>
              <div className="p-3 bg-[#0A0D10] border border-[#30363D] text-xs">
                <div className="font-bold text-white mb-1">02. ZERO REASONLESS SLOP</div>
                <p className="text-[11px] text-[#8B949E]">
                  No decorative fluff without structural utility or performance rationale.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hardware & Environment Stack */}
        <div className="lg:col-span-4 bg-[#161B22] border border-[#30363D] p-6 rounded-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#30363D] pb-2 text-xs font-bold text-[#00F0FF]">
            <Laptop className="w-4 h-4" />
            <span>[HARDWARE_STACK]</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-2.5 bg-[#0A0D10] border border-[#30363D] rounded-sm">
              <div className="text-[10px] text-[#8B949E]">PRIMARY WORKSTATION</div>
              <div className="font-bold text-white">Apple MacBook Pro M3 Max (64GB)</div>
            </div>
            <div className="p-2.5 bg-[#0A0D10] border border-[#30363D] rounded-sm">
              <div className="text-[10px] text-[#8B949E]">PRIMARY IDE & CONSOLE</div>
              <div className="font-bold text-white">VS Code + Antigravity AGY / Alacritty</div>
            </div>
            <div className="p-2.5 bg-[#0A0D10] border border-[#30363D] rounded-sm">
              <div className="text-[10px] text-[#8B949E]">SYSTEM MONITORS</div>
              <div className="font-bold text-white">Dual 32" 4K LG UltraFine Displays</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
