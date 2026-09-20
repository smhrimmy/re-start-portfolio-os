import React from 'react';

interface HudBottomProps {
  hintText: string;
  accentColor: string;
}

export const HudBottom: React.FC<HudBottomProps> = ({ hintText, accentColor }) => {
  return (
    <footer className="h-[44px] px-6 bg-[#07080A]/95 border-t border-white/15 flex items-center justify-between z-30 font-mono-hud text-xs text-white/70">
      <div className="flex items-center space-x-3">
        <span className="text-[11px] font-bold tracking-widest text-[#91A0AD]">SYSTEM CONTROL:</span>
        <span className="text-white text-xs">{hintText}</span>
      </div>

      <div className="hidden sm:flex items-center space-x-4 text-[11px] text-white/50">
        <div className="flex items-center space-x-1">
          <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20 text-white font-mono">↑↓</kbd>
          <span>NAVIGATE</span>
        </div>
        <div className="flex items-center space-x-1">
          <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20 text-white font-mono">↵</kbd>
          <span>SELECT</span>
        </div>
        <div className="flex items-center space-x-1">
          <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20 text-white font-mono">ESC</kbd>
          <span>RESUME</span>
        </div>
      </div>
    </footer>
  );
};
