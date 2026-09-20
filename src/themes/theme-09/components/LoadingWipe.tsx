import React from 'react';
import { EraSpec } from '../eras.config';

interface LoadingWipeProps {
  era: EraSpec;
}

export const LoadingWipe: React.FC<LoadingWipeProps> = ({ era }) => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center overflow-hidden">
      {/* Sweeping Diagonal Color Panel */}
      <div
        className="absolute inset-0 animate-loading-wipe flex flex-col items-center justify-center border-y-4"
        style={{
          backgroundColor: era.bg,
          borderColor: era.accent,
        }}
      >
        <div className="flex flex-col items-center space-y-4 px-6 text-center z-10">
          {/* Spinning Loader Icon */}
          <div
            className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin flex items-center justify-center shadow-lg"
            style={{ borderColor: `${era.accent} transparent ${era.accent} ${era.accent}` }}
          >
            <span className="text-xl font-bold font-mono text-white">{era.shortName}</span>
          </div>

          {/* Era Title */}
          <div className="text-3xl sm:text-4xl font-extrabold uppercase tracking-widest text-white">
            {era.name} ({era.year})
          </div>

          {/* Fake Streaming Asset Log */}
          <div className="px-4 py-1.5 rounded bg-black/60 border border-white/20 font-mono text-xs text-white/80 tracking-widest animate-pulse">
            {era.assetPak}
          </div>
        </div>
      </div>
    </div>
  );
};
