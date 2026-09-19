import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    'INITIALIZING PERSONAL SYSTEM',
    'LOADING CREATIVE MODULES',
    'CONNECTING TO DIGITAL ARCHITECT',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 33 && progress <= 66) setStatusIndex(1);
    else if (progress > 66) setStatusIndex(2);
  }, [progress]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090D] text-[#F2F5F7]">
      {/* Background Subtle Wireframe Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[#249BFF]/10 blur-3xl animate-pulse" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center space-y-6">
        {/* Rotating Geometric Wireframe */}
        <div className="w-16 h-16 border-2 border-[#249BFF] rounded-lg animate-spin-slow flex items-center justify-center shadow-[0_0_20px_rgba(36,155,255,0.4)]">
          <div className="w-8 h-8 border border-[#D8955D] rotate-45" />
        </div>

        {/* Progress Counter */}
        <div className="text-4xl font-serif font-bold text-gradient-cyan tracking-wider">
          {progress}%
        </div>

        {/* Status Message */}
        <div className="h-6 text-xs font-mono tracking-widest text-[#91A0AD] uppercase transition-all duration-300">
          {statusMessages[statusIndex]}
        </div>

        {/* Thin Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#249BFF] via-[#69D9FF] to-[#D8955D] transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
