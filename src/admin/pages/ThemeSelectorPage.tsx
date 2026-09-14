import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { AdminTooltip } from '../components/primitives/AdminTooltip';
import { AdminDropdown } from '../components/primitives/AdminDropdown';
import { Palette, Check, Search, MoreVertical } from 'lucide-react';

interface ThemeCardData {
  id: string;
  name: string;
  category: string;
  minTier: 'HIGH' | 'MEDIUM' | 'LOW';
  supports3D: boolean;
}

const THEME_REGISTRY_27: ThemeCardData[] = Array.from({ length: 27 }, (_, i) => {
  const num = (i + 1).toString().padStart(2, '0');
  const is3D = [2, 3, 5, 8, 12, 15, 25].includes(i + 1);
  return {
    id: `theme-${num}`,
    name: `Theme ${num} — ${is3D ? 'Spatial 3D' : 'Minimal 2D'}`,
    category: is3D ? '3D Interactive' : '2D Typography',
    minTier: is3D ? 'HIGH' : 'LOW',
    supports3D: is3D,
  };
});

export const ThemeSelectorPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeThemeId, setActiveThemeId] = useState('theme-01');

  const filteredThemes = THEME_REGISTRY_27.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl">
      <LedMasthead
        title="Theme OS Registry (27 Themes)"
        subtitle="Manage and switch active portfolio themes with device-tier fallback validation"
        status="active"
      />

      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-4 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 27 themes..."
            className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg pl-9 pr-3 py-2 text-sm font-mono text-[#1a1a1a]"
          />
        </div>

        <div className="text-xs font-mono text-[#666]">
          Active Theme: <span className="font-bold text-[#10b981] uppercase">{activeThemeId}</span>
        </div>
      </div>

      {/* 27 Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThemes.map((theme) => {
          const isActive = theme.id === activeThemeId;
          return (
            <div
              key={theme.id}
              className={`bg-[#f4f4f3] border rounded-xl p-5 shadow-sm transition-all flex flex-col justify-between ${
                isActive ? 'border-[#10b981] ring-2 ring-[#10b981]/20' : 'border-[#dcdcdc] hover:border-[#aaa]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#e0e0df] text-[#666]">
                    {theme.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <AdminTooltip content={`Minimum Hardware Tier: ${theme.minTier}`}>
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          theme.minTier === 'HIGH' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {theme.minTier}
                      </span>
                    </AdminTooltip>

                    <AdminDropdown
                      trigger={
                        <button className="p-1 text-[#888] hover:text-[#1a1a1a] rounded">
                          <MoreVertical size={16} />
                        </button>
                      }
                      items={[
                        {
                          id: 'activate',
                          label: 'Set as Active',
                          icon: <Check size={14} />,
                          onSelect: () => setActiveThemeId(theme.id),
                        },
                      ]}
                    />
                  </div>
                </div>

                <h3 className="font-mono font-bold text-base text-[#1a1a1a] mb-1">{theme.name}</h3>
                <p className="text-xs text-[#666] font-sans mb-4">
                  {theme.supports3D ? 'Includes WebGL 3D Canvas with 2D fallback' : 'Pure 2D CSS high-performance layout'}
                </p>
              </div>

              <button
                onClick={() => setActiveThemeId(theme.id)}
                className={`w-full py-2 rounded-lg font-mono font-bold text-xs transition-colors flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-[#10b981] text-white cursor-default'
                    : 'bg-[#e0e0df] text-[#1a1a1a] hover:bg-[#d5d5d4]'
                }`}
              >
                {isActive ? (
                  <>
                    <Check size={14} />
                    <span>Active Theme</span>
                  </>
                ) : (
                  <>
                    <Palette size={14} />
                    <span>Activate Theme</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
