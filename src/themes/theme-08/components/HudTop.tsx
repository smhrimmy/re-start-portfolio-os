import React, { useState, useEffect } from 'react';
import { MinimapCanvas } from './MinimapCanvas';
import { soundSynth } from '../soundSynth';

interface HudTopProps {
  activeTab: number;
  visitedTabs: Set<number>;
  accentColor: string;
}

export const HudTop: React.FC<HudTopProps> = ({ activeTab, visitedTabs, accentColor }) => {
  const [timeStr, setTimeStr] = useState('');
  const [soundOn, setSoundOn] = useState(soundSynth.enabled);

  // Live ticking local clock
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

  // 5 Progression stars based on visited tabs count (capped at 5)
  const filledStarsCount = Math.min(visitedTabs.size, 5);

  return (
    <header className="h-[56px] px-6 bg-[#07080A]/90 border-b border-white/15 flex items-center justify-between z-30 font-mono-hud text-xs">
      {/* Left: Online Status & Local Clock */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
            style={{ backgroundColor: accentColor, color: accentColor }}
          />
          <span className="text-white font-bold tracking-wider">SYSTEM ONLINE</span>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-white/70">
          <span>{timeStr || '12:00:00'}</span>
          <span className="text-white/30">|</span>
          <span>BLR, IN</span>
        </div>
      </div>

      {/* Center: Progression Stars & XP Counter */}
      <div className="flex items-center space-x-6">
        {/* Progression Stars */}
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded bg-black/40 border border-white/10">
          <span className="text-[10px] text-white/50 mr-1 hidden md:inline">PROGRESSION</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-sm transition-transform duration-300 ${
                star <= filledStarsCount
                  ? 'scale-110'
                  : 'text-white/20'
              }`}
              style={{ color: star <= filledStarsCount ? accentColor : undefined }}
            >
              ★
            </span>
          ))}
        </div>

        {/* XP / Commits Counter */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded bg-black/40 border border-white/10">
          <span className="text-[10px] text-white/50">XP</span>
          <span className="text-sm font-bold text-white">◆ 1,480</span>
        </div>
      </div>

      {/* Right: Sound Toggle & Minimap */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSound}
          className="px-2.5 py-1 rounded bg-black/40 border border-white/15 hover:border-white/40 text-xs text-white/80 transition-colors flex items-center space-x-1.5"
          title="Toggle UI Sound Effects"
        >
          <span>{soundOn ? '🔊' : '🔇'}</span>
          <span className="hidden sm:inline text-[11px]">{soundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
        </button>

        <div className="hidden sm:block">
          <MinimapCanvas activeTab={activeTab} visitedTabs={visitedTabs} accentColor={accentColor} />
        </div>
      </div>
    </header>
  );
};
