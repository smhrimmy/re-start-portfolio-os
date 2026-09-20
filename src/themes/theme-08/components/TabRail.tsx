import React from 'react';
import { motion } from 'framer-motion';
import { THEME_08_TABS, TabSpec } from '../theme08Tokens';
import { soundSynth } from '../soundSynth';

interface TabRailProps {
  activeTab: number;
  onSelectTab: (id: number) => void;
  accentColor: string;
}

export const TabRail: React.FC<TabRailProps> = ({ activeTab, onSelectTab, accentColor }) => {
  return (
    <aside className="w-[260px] bg-[#07080A]/80 border-r border-white/15 p-4 flex flex-col justify-between z-20">
      <div className="space-y-2">
        {/* Menu Header Label */}
        <div className="px-3 py-2 text-[10px] font-mono tracking-widest text-white/40 border-b border-white/10 flex items-center justify-between">
          <span>PAUSE MENU OS</span>
          <span>v1.0</span>
        </div>

        {/* Tab Buttons */}
        <div className="space-y-1 relative" role="tablist" aria-label="Pause Menu Tabs">
          {THEME_08_TABS.map((tab: TabSpec) => {
            const isSelected = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  soundSynth.playSelect();
                  onSelectTab(tab.id);
                }}
                onMouseEnter={() => {
                  soundSynth.playMove();
                }}
                className={`w-full relative px-4 py-3 rounded-lg text-left transition-all duration-150 flex items-center justify-between group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E8B44A] ${
                  isSelected ? 'text-white font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                {/* Framer Motion Sliding Selection Cursor (layoutId) */}
                {isSelected && (
                  <motion.div
                    layoutId="tabCursor"
                    className="absolute inset-0 rounded-lg pause-bevel border border-white/20 shadow-lg"
                    style={{
                      backgroundColor: `${accentColor}25`,
                      borderColor: accentColor,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Left Selection Bar Indicator */}
                <div className="relative z-10 flex items-center space-x-3">
                  <span
                    className={`w-1.5 h-4 rounded-full transition-all duration-200 ${
                      isSelected ? 'scale-100 opacity-100' : 'opacity-0 scale-50'
                    }`}
                    style={{ backgroundColor: accentColor }}
                  />
                  <span className="text-xs font-mono text-white/40">{tab.badge}</span>
                  <span className="text-sm font-bold tracking-wider font-mono">{tab.label}</span>
                </div>

                {/* Chevron */}
                {isSelected && (
                  <span className="relative z-10 text-xs font-bold animate-pulse" style={{ color: accentColor }}>
                    ▸
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Brand Stamp */}
      <div className="px-3 py-3 rounded bg-black/40 border border-white/10 text-[11px] font-mono text-white/50 space-y-1">
        <div className="flex items-center justify-between text-white/70 font-bold">
          <span>PRAJWAL DL</span>
          <span>DEV OS</span>
        </div>
        <div>PRESS [ESC] TO RESUME</div>
      </div>
    </aside>
  );
};
