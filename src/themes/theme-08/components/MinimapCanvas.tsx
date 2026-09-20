import React, { useRef, useEffect } from 'react';
import { THEME_08_TABS } from '../theme08Tokens';

interface MinimapCanvasProps {
  activeTab: number;
  visitedTabs: Set<number>;
  accentColor: string;
}

export const MinimapCanvas: React.FC<MinimapCanvasProps> = ({ activeTab, visitedTabs, accentColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 14) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Node positions arranged in a futuristic radar ring/mesh
    const nodeCoords = THEME_08_TABS.map((_, i) => {
      const angle = (i / THEME_08_TABS.length) * Math.PI * 2;
      const radius = 26;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * (radius * 0.7),
      };
    });

    // Draw connecting edges
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    nodeCoords.forEach((pt, i) => {
      const nextPt = nodeCoords[(i + 1) % nodeCoords.length];
      ctx.moveTo(pt.x, pt.y);
      ctx.lineTo(nextPt.x, nextPt.y);
    });
    ctx.stroke();

    // Draw nodes
    nodeCoords.forEach((pt, i) => {
      const isActive = i === activeTab;
      const isVisited = visitedTabs.has(i);

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, isActive ? 5 : 3, 0, Math.PI * 2);

      if (isActive) {
        ctx.fillStyle = accentColor;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 8;
        ctx.fill();

        // Active node radar ping ring
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2);
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else if (isVisited) {
        ctx.fillStyle = '#F2F4F7';
        ctx.fill();
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fill();
      }
    });
  }, [activeTab, visitedTabs, accentColor]);

  return (
    <div className="relative w-[140px] h-[50px] pause-bevel-sm bg-black/60 border border-white/15 overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} width={140} height={50} className="w-full h-full" />
      <span className="absolute top-1 left-1.5 text-[9px] font-mono text-white/50 tracking-widest pointer-events-none">
        RADAR
      </span>
    </div>
  );
};
