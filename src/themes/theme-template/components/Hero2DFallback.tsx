import React from 'react';

export const Hero2DFallback: React.FC = () => {
  return (
    <div className="w-full h-64 bg-gradient-to-br from-blue-900 to-slate-900 rounded-xl flex items-center justify-center border border-blue-500/20 p-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-400/30">
          <span className="text-2xl text-blue-400">⚡</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">2D Optimized Display</h3>
        <p className="text-sm text-slate-400 max-w-md">
          High-performance CSS/gradient fallback rendering enabled for smooth device performance.
        </p>
      </div>
    </div>
  );
};
