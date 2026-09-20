import React, { useState, useEffect } from 'react';
import { EraSpec } from '../eras.config';
import { soundSynth } from '../../theme-08/soundSynth';

interface GtaHudTopProps {
  era: EraSpec;
  visitedCount: number;
}

export const GtaHudTop: React.FC<GtaHudTopProps> = ({ era, visitedCount }) => {
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

  return (
    <header className="h-[56px] px-6 bg-black/90 border-b border-white/15 flex items-center justify-between z-30 font-mono text-xs">
      {/* Left: Era Title & Wanted Level Stars */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: era.accent }} />
          <span className="font-bold text-white tracking-widest uppercase">{era.name} OS</span>
        </div>

        {/* Wanted Level Stars */}
        <div className="hidden sm:flex items-center space-x-1 px-3 py-1 rounded bg-black/60 border border-white/15">
          <span className="text-[10px] text-white/50 mr-1">WANTED LEVEL:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-sm transition-transform ${star <= wantedStars ? 'scale-110' : 'text-white/20'}`}
              style={{ color: star <= wantedStars ? era.accent : undefined }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Center: Money Counter / Project Value */}
      <div className="flex items-center space-x-2 px-3 py-1 rounded bg-black/60 border border-white/15">
        <span className="text-[10px] text-white/50">PROJECT VALUE:</span>
        <span className="text-sm font-bold text-emerald-400">$1,480,000</span>
      </div>

      {/* Right: Local Clock & Sound Toggle */}
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2 text-white/80">
          <span>{timeStr || '12:00:00'}</span>
        </div>

        <button
          onClick={toggleSound}
          className="px-2.5 py-1 rounded bg-black/60 border border-white/20 hover:border-white text-white/80 text-xs transition-colors flex items-center space-x-1"
        >
          <span>{soundOn ? '🔊' : '🔇'}</span>
          <span className="hidden sm:inline">{soundOn ? 'SOUND ON' : 'MUTED'}</span>
        </button>
      </div>
    </header>
  );
};
