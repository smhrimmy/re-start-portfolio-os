import React from 'react';

interface CreditsTabProps {
  onReturnToResume: () => void;
  accentColor: string;
}

export const CreditsTab: React.FC<CreditsTabProps> = ({ onReturnToResume, accentColor }) => {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto text-center font-mono">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold text-white">SYSTEM CREDITS // COLOPHON</h2>
        <p className="text-xs text-[#91A0AD]">
          08 // ARCHITECTURAL ACKNOWLEDGMENTS & ENGINE SPECIFICATIONS
        </p>
      </div>

      <div className="pause-panel pause-bevel p-8 space-y-8 max-h-[calc(100vh-250px)] overflow-y-auto pause-scroll">
        <div className="space-y-2">
          <div className="text-xs text-[#91A0AD]">PORTFOLIO CREATOR & LEAD ARCHITECT</div>
          <div className="text-2xl font-bold text-white">PRAJWAL DL</div>
        </div>

        <div className="w-16 h-px bg-white/20 mx-auto" />

        <div className="space-y-2">
          <div className="text-xs text-[#91A0AD]">ENGINE & FRAMEWORK STACK</div>
          <div className="text-sm font-semibold text-white">
            NEXT.JS 15 • REACT 19 • TYPESCRIPT 5.7 • TAILWIND v4 • FRAMER MOTION
          </div>
        </div>

        <div className="w-16 h-px bg-white/20 mx-auto" />

        <div className="space-y-2">
          <div className="text-xs text-[#91A0AD]">TYPOGRAPHY & DESIGN SYSTEM</div>
          <div className="text-sm font-semibold text-white">
            JETBRAINS MONO • INTER VARIABLE • BEBAS NEUE
          </div>
        </div>

        <div className="w-16 h-px bg-white/20 mx-auto" />

        <div className="space-y-2">
          <div className="text-xs text-[#91A0AD]">SOUND & GRAPHICS SYNTHESIS</div>
          <div className="text-sm font-semibold text-white">
            WEB AUDIO API OSCILLATORS • HTML5 CANVAS MINIMAP • BEVEL POLYGONS
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={onReturnToResume}
            className="pause-bevel px-8 py-4 font-bold text-black text-xs transition-transform transform hover:-translate-y-0.5 cursor-pointer"
            style={{ backgroundColor: accentColor }}
          >
            ▸ PRESS [ESC] OR CLICK TO RETURN TO RESUME
          </button>
        </div>
      </div>
    </div>
  );
};
