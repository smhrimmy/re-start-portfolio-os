import React from 'react';
import { Search } from 'lucide-react';

interface EditorialMastheadProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenSearch: () => void;
  onToggleMobileMenu: () => void;
}

export const EditorialMasthead: React.FC<EditorialMastheadProps> = ({
  currentTab,
  onTabChange,
  onOpenSearch,
  onToggleMobileMenu,
}) => {
  return (
    <header className="w-full bg-[#F9F8F6] border-b border-[#E2E0D8] sticky top-0 z-40 transition-all duration-300">
      {/* Top Issue Meta Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center font-mono text-[10px] text-[#666666] border-b border-[#E2E0D8]/60">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#8B0000]" />
          <span className="font-bold tracking-widest text-[#111111]">PRAJWAL DL</span>
          <span className="hidden sm:inline">// SYSTEMS ARCHITECT</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">ISSUE 01 · 2026 EDITION</span>
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 text-[#111111] hover:text-[#8B0000] font-bold tracking-wider transition-colors"
          >
            <Search size={12} /> SEARCH ARCHIVE (/)
          </button>
        </div>
      </div>

      {/* Main Publication Title Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div
          onClick={() => onTabChange('home')}
          className="cursor-pointer group"
        >
          <h1 className="theme-01-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] group-hover:text-[#8B0000] transition-colors">
            Portfolio OS
          </h1>
          <p className="font-mono text-[10px] text-[#666666] tracking-widest uppercase">
            Minimal Editorial · Selected Works
          </p>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 font-mono text-xs">
          {[
            { id: 'home', label: '01 INDEX' },
            { id: 'projects', label: '02 WORKS' },
            { id: 'blog', label: '03 ESSAYS' },
            { id: 'experience', label: '04 EXPERIENCE' },
            { id: 'skills', label: '05 SKILLS' },
            { id: 'resume', label: '06 RESUME' },
            { id: 'contact', label: '07 CONTACT' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`editorial-link-hover py-1 transition-colors ${
                currentTab === item.id ? 'text-[#8B0000] font-bold' : 'text-[#111111] hover:text-[#8B0000]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden font-mono text-xs font-bold text-[#111111] border border-[#111111] px-3 py-1.5 hover:bg-[#111111] hover:text-[#F9F8F6] transition-colors"
        >
          CHAPTERS ☰
        </button>
      </div>
    </header>
  );
};
