import React, { useState, useEffect } from 'react';

interface Theme05PreloaderProps {
  onComplete: () => void;
}

export const Theme05Preloader: React.FC<Theme05PreloaderProps> = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'signature' | 'fadeOut' | 'done'>('counting');

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase('signature');
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === 'signature') {
      const timer1 = setTimeout(() => {
        setPhase('fadeOut');
      }, 1600);

      const timer2 = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 2200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0B0B0C] text-[#C9A876] flex flex-col items-center justify-center transition-all duration-700 ${
        phase === 'fadeOut' ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center justify-center space-y-6 max-w-sm px-6 text-center select-none">
        {phase === 'counting' && (
          <div className="flex flex-col items-center space-y-4 animate-in fade-in duration-300">
            {/* Center Percentage Counter */}
            <div className="font-script-dancing text-6xl sm:text-7xl font-bold tracking-wider text-[#C9A876]">
              {counter}%
            </div>

            {/* Rotating / Peeling SVG Brand Mark */}
            <div className="w-10 h-10 relative flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-8 h-8 text-[#C9A876] animate-spin-badge"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
              >
                <circle cx="50" cy="50" r="38" strokeDasharray="180 60" strokeLinecap="round" />
                <path d="M50 20 L50 80 M20 50 L80 50" strokeWidth="4" />
              </svg>
            </div>

            <span className="font-mono-jetbrains text-[10px] text-[#999999] tracking-[0.25em] uppercase">
              INITIALIZING EXPERIENTIAL PORTFOLIO
            </span>
          </div>
        )}

        {phase === 'signature' && (
          <div className="flex flex-col items-center space-y-4 animate-in fade-in duration-500">
            {/* Hand-drawn Cursive Initial 'P' SVG stroke-dashoffset animation */}
            <div className="w-36 h-36 flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="w-32 h-32 text-[#C9A876]">
                <path
                  d="M 35 25 C 35 25, 35 95, 35 95 M 35 25 C 65 15, 95 35, 65 60 C 45 75, 35 60, 35 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="signature-path"
                />
              </svg>
            </div>

            <span className="font-script-caveat text-2xl text-white tracking-widest">
              Prajwal DL
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
