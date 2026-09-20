import React, { useState, useEffect } from 'react';
import { EraSpec } from '../eras.config';
import { soundSynth } from '../../theme-08/soundSynth';

interface GtaHudTopProps {
  era: EraSpec;
  visitedCount: number;
  activeTopTab: string;
  onSelectTopTab: (tab: string) => void;
  customCash?: number;
}

export const TOP_TABS = ['GAME', 'STATS', 'BRIEF', 'MAP', 'SOCIAL', 'SETTINGS'];

export const GtaHudTop: React.FC<GtaHudTopProps> = ({
  era,
  visitedCount,
  activeTopTab,
  onSelectTopTab,
  customCash,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [soundOn, setSoundOn] = useState(soundSynth.enabled);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    soundSynth.enabled = !soundSynth.enabled;
    setSoundOn(soundSynth.enabled);
    if (soundSynth.enabled) soundSynth.playSelect();
  };

  const wantedStars = Math.min(visitedCount, 5);
  const displayCash = customCash !== undefined ? customCash : era.characterInfo.cashValue;

  return (
    <header className="h-[56px] px-4 sm:px-6 bg-black/95 border-b border-white/15 flex items-center justify-between z-30 font-mono text-xs">
      {/* Left: Diegetic Top Tab Bar */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <div className="hidden lg:flex items-center space-x-2 mr-3">
          <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: era.accent }} />
          <span className="font-bold text-white tracking-widest uppercase">{era.shortName} OS</span>
        </div>

        {TOP_TABS.map((tab) => {
          const isSelected = activeTopTab === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                soundSynth.playSelect();
                onSelectTopTab(tab);
              }}
              onMouseEnter={() => soundSynth.playMove()}
              className={`px-2.5 sm:px-3 py-1.5 rounded text-[11px] font-bold tracking-widest transition-all cursor-pointer ${
                isSelected
                  ? 'text-black shadow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              style={{
                backgroundColor: isSelected ? era.accent : undefined,
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Center: Wanted Stars & Cash Counter */}
      <div className="flex items-center space-x-3">
        {/* Wanted Level Stars */}
        <div className="hidden md:flex items-center space-x-1 px-2.5 py-1 rounded bg-black/60 border border-white/15">
          <span className="text-[9px] text-white/50 mr-1">WANTED:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-xs transition-transform ${star <= wantedStars ? 'scale-110' : 'text-white/20'}`}
              style={{ color: star <= wantedStars ? era.accent : undefined }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Money Counter */}
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded bg-black/60 border border-white/15">
          <span className="text-[9px] text-white/50 hidden sm:inline">CASH:</span>
          <span className="text-xs sm:text-sm font-bold text-emerald-400">
            ${displayCash.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Right: Local Clock & Sound Toggle */}
      <div className="flex items-center space-x-3">
        <div className="hidden xl:flex items-center space-x-2 text-white/80 text-[11px]">
          <span>{timeStr || '12:00:00'}</span>
        </div>

        <button
          onClick={toggleSound}
          className="px-2 py-1 rounded bg-black/60 border border-white/20 hover:border-white text-white/80 text-xs transition-colors flex items-center space-x-1 cursor-pointer"
          title="Toggle Audio Effects"
        >
          <span>{soundOn ? '🔊' : '🔇'}</span>
        </button>
      </div>
    </header>
  );
};

