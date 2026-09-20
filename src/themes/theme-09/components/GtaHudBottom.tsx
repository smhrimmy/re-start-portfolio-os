import React from 'react';
import { EraSpec } from '../eras.config';
import { EraSwitcher } from './EraSwitcher';

interface GtaHudBottomProps {
  era: EraSpec;
  onSelectEra: (era: EraSpec) => void;
  hintText: string;
}

export const GtaHudBottom: React.FC<GtaHudBottomProps> = ({ era, onSelectEra, hintText }) => {
  return (
    <footer className="h-[44px] px-6 bg-black/95 border-t border-white/15 flex items-center justify-between z-30 font-mono text-xs text-white/70">
      {/* Left: Persistent Era Switcher Control */}
      <div className="flex items-center space-x-3">
        <EraSwitcher currentEra={era} onSelectEra={onSelectEra} />
      </div>

      {/* Center/Right: Contextual Key Glyph Hints */}
      <div className="flex items-center space-x-4">
        <span className="text-white text-xs hidden lg:inline">{hintText}</span>
        <div className="hidden sm:flex items-center space-x-2 text-[11px] text-white/50">
          <span className="px-1.5 py-0.5 rounded bg-black border border-white/20 text-white">[ / ]</span>
          <span>CYCLE ERA</span>
        </div>
      </div>
    </footer>
  );
};
