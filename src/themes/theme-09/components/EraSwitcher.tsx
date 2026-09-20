import React, { useState, useEffect } from 'react';
import { GTA_ERAS, EraSpec } from '../eras.config';

interface EraSwitcherProps {
  currentEra: EraSpec;
  onSelectEra: (era: EraSpec) => void;
}

export const EraSwitcher: React.FC<EraSwitcherProps> = ({ currentEra, onSelectEra }) => {
  const [showWheel, setShowWheel] = useState(false);

  const currentIndex = GTA_ERAS.findIndex((e) => e.id === currentEra.id);

  const cyclePrevious = () => {
    const nextIdx = currentIndex > 0 ? currentIndex - 1 : GTA_ERAS.length - 1;
    onSelectEra(GTA_ERAS[nextIdx]);
  };

  const cycleNext = () => {
    const nextIdx = currentIndex < GTA_ERAS.length - 1 ? currentIndex + 1 : 0;
    onSelectEra(GTA_ERAS[nextIdx]);
  };

  // Global Keyboard listener for '[' and ']'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === '[') {
        e.preventDefault();
        cyclePrevious();
      } else if (e.key === ']') {
        e.preventDefault();
        cycleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="relative inline-flex items-center space-x-2 font-mono text-xs">
      {/* Previous Arrow */}
      <button
        onClick={cyclePrevious}
        className="px-2 py-1 rounded bg-black/60 border border-white/20 hover:border-white text-white/80 hover:text-white transition-colors cursor-pointer"
        title="Previous Era (Key: [ )"
      >
        ◀
      </button>

      {/* Main Era Display Badge (Click to open Wheel) */}
      <button
        onClick={() => setShowWheel(!showWheel)}
        className="px-3 py-1.5 rounded font-bold tracking-wider text-black transition-transform transform active:scale-95 cursor-pointer flex items-center space-x-1.5"
        style={{ backgroundColor: currentEra.accent }}
      >
        <span>ERA: {currentEra.shortName} ({currentEra.year})</span>
        <span className="text-[10px]">▼</span>
      </button>

      {/* Next Arrow */}
      <button
        onClick={cycleNext}
        className="px-2 py-1 rounded bg-black/60 border border-white/20 hover:border-white text-white/80 hover:text-white transition-colors cursor-pointer"
        title="Next Era (Key: ] )"
      >
        ▶
      </button>

      {/* Radial Era Wheel Selector Modal */}
      {showWheel && (
        <div className="absolute bottom-12 left-0 z-50 p-4 rounded-xl bg-black/95 border border-white/20 shadow-2xl backdrop-blur-md w-72 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-[11px] text-white/60 border-b border-white/10 pb-2">
            <span>SELECT GTA ERA STATION</span>
            <span>HOTKEYS: [ / ]</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {GTA_ERAS.map((era) => {
              const isSelected = era.id === currentEra.id;
              return (
                <button
                  key={era.id}
                  onClick={() => {
                    onSelectEra(era);
                    setShowWheel(false);
                  }}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-2 text-black font-bold'
                      : 'border-white/15 bg-white/5 text-white/80 hover:bg-white/10'
                  }`}
                  style={{
                    backgroundColor: isSelected ? era.accent : undefined,
                    borderColor: isSelected ? '#FFFFFF' : undefined,
                  }}
                >
                  <div className="text-xs font-bold font-mono">{era.name}</div>
                  <div className="text-[10px] opacity-70 font-mono">{era.year}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
