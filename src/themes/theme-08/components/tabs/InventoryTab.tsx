import React, { useState } from 'react';

interface ToolItem {
  id: string;
  name: string;
  category: string;
  rarity: 'LEGENDARY' | 'RARE' | 'COMMON';
  description: string;
  icon: string;
}

interface InventoryTabProps {
  accentColor: string;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({ accentColor }) => {
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  const inventoryItems: ToolItem[] = [
    {
      id: '1',
      name: 'VS Code & AGY IDE',
      category: 'Primary Workspace',
      rarity: 'LEGENDARY',
      description: 'Customized editor setup with AI agent extensions and vim keybindings.',
      icon: '⚡',
    },
    {
      id: '2',
      name: 'Three.js & R3F',
      category: 'Graphics Engine',
      rarity: 'LEGENDARY',
      description: 'Used to render real-time WebGL scenes, custom shaders, and spatial particle fields.',
      icon: '🌌',
    },
    {
      id: '3',
      name: 'React 19 & Next.js',
      category: 'UI Core',
      rarity: 'LEGENDARY',
      description: 'The foundation for fast, accessible, server-rendered web applications.',
      icon: '⚛️',
    },
    {
      id: '4',
      name: 'TypeScript',
      category: 'Type Safety',
      rarity: 'RARE',
      description: 'Strict typing for zero runtime surprises and self-documenting codebases.',
      icon: '📘',
    },
    {
      id: '5',
      name: 'Framer Motion & GSAP',
      category: 'Motion Engine',
      rarity: 'RARE',
      description: 'Choreographs smooth fluid transitions, layout animations, and kinetic text.',
      icon: '🎬',
    },
    {
      id: '6',
      name: 'TailwindCSS v4',
      category: 'Styling Architecture',
      rarity: 'RARE',
      description: 'Utility-first CSS framework enforcing consistent design tokens.',
      icon: '🎨',
    },
    {
      id: '7',
      name: 'Figma',
      category: 'Interface Design',
      rarity: 'COMMON',
      description: 'Where wireframes, component systems, and visual layouts originate.',
      icon: '📐',
    },
    {
      id: '8',
      name: 'Git & GitHub Actions',
      category: 'Version Control',
      rarity: 'COMMON',
      description: 'Automated CI/CD pipelines, lint enforcement, and versioning.',
      icon: '🐙',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold font-mono text-white">EQUIPMENT INVENTORY</h2>
        <p className="text-xs font-mono text-[#91A0AD]">
          04 // TOOLS, SOFTWARE & STACK SLOTS
        </p>
      </div>

      {/* Equipment Slots Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {inventoryItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedTool(item)}
            onMouseEnter={() => setSelectedTool(item)}
            className="pause-panel pause-bevel aspect-square p-4 flex flex-col justify-between cursor-pointer group hover:border-white/50 transition-all relative overflow-hidden"
          >
            {/* Top Rarity Badge */}
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span
                className={`font-bold px-1.5 py-0.5 rounded ${
                  item.rarity === 'LEGENDARY'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : item.rarity === 'RARE'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}
              >
                {item.rarity}
              </span>
            </div>

            {/* Center Icon */}
            <div className="text-4xl text-center group-hover:scale-110 transition-transform">
              {item.icon}
            </div>

            {/* Bottom Tool Name */}
            <div className="text-xs font-mono font-bold text-white text-center truncate">
              {item.name}
            </div>
          </div>
        ))}
      </div>

      {/* Item Inspector Panel */}
      {selectedTool && (
        <div className="pause-panel pause-bevel p-6 space-y-3 animate-fade-in border-l-4" style={{ borderColor: accentColor }}>
          <div className="flex items-center justify-between font-mono">
            <span className="text-xs text-[#91A0AD]">{selectedTool.category}</span>
            <span className="text-xs font-bold text-white">{selectedTool.rarity} TIER</span>
          </div>
          <h3 className="text-xl font-bold font-mono text-white flex items-center space-x-2">
            <span>{selectedTool.icon}</span>
            <span>{selectedTool.name}</span>
          </h3>
          <p className="text-sm text-[#F2F4F7] leading-relaxed">
            {selectedTool.description}
          </p>
        </div>
      )}
    </div>
  );
};
