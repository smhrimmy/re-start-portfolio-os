import React, { useRef, useState, useEffect } from 'react';

interface HeroControlCoreProps {
  isLowTier?: boolean;
}

export const HeroControlCore: React.FC<HeroControlCoreProps> = ({ isLowTier = false }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLowTier) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 15;
      const y = (e.clientY - rect.top - rect.height / 2) / 15;
      setRotation({ x: -y, y: x });
    };

    const node = containerRef.current;
    node?.addEventListener('mousemove', handleMouseMove);
    return () => node?.removeEventListener('mousemove', handleMouseMove);
  }, [isLowTier]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[280px] sm:h-[340px] relative bg-[#161B22] border border-[#30363D] overflow-hidden flex items-center justify-center p-6 select-none shadow-xl"
      style={{ perspective: '800px' }}
    >
      {/* Background Technical Markings */}
      <div className="absolute inset-0 tech-grid-bg opacity-30" />
      <div className="absolute top-3 left-3 font-mono text-[10px] text-[#00F0FF] tracking-widest">
        CORE MODULE // ROT_X: {rotation.x.toFixed(1)}° ROT_Y: {rotation.y.toFixed(1)}°
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[10px] text-[#8B949E]">
        SYS_STATUS: OPTIMAL · 60FPS
      </div>

      {/* Interactive 3D Control Core Object */}
      <div
        className="w-40 h-40 sm:w-48 sm:h-48 relative transition-transform duration-200 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(12deg)`,
        }}
      >
        {/* Outer Structural Wireframe Cube Panel */}
        <div className="absolute inset-0 border-2 border-[#00F0FF]/60 bg-[#00F0FF]/5 flex items-center justify-center transform translate-z-10 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
          <div className="w-20 h-20 border border-[#FF9F1C]/80 rotate-45 flex items-center justify-center">
            <span className="font-mono text-[10px] font-bold text-[#00F0FF]">CORE_02</span>
          </div>
        </div>

        {/* Layer 2 Offset Tech Plate */}
        <div
          className="absolute inset-2 border border-[#30363D] bg-[#1F242C]/90 flex items-center justify-center"
          style={{ transform: 'translateZ(-30px)' }}
        >
          <div className="w-full h-full p-2 flex flex-col justify-between font-mono text-[9px] text-[#8B949E]">
            <div className="flex justify-between">
              <span>[L2_SYNC]</span>
              <span className="text-[#FF9F1C]">ACT_99%</span>
            </div>
            <div className="text-center font-bold text-[#E6EDF3] tracking-widest">
              SYSTEM ARCHITECTURE CORE
            </div>
            <div className="flex justify-between">
              <span>N 12.973</span>
              <span>E 77.594</span>
            </div>
          </div>
        </div>

        {/* Layer 3 Inner Core Plate */}
        <div
          className="absolute inset-6 border border-[#00F0FF] bg-[#0A0D10] flex items-center justify-center"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="w-3 h-3 bg-[#00F0FF] rounded-full animate-ping" />
        </div>
      </div>
    </div>
  );
};
