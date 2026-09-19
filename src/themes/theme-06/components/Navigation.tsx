import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="font-serif-instrument font-bold text-xl text-[#1A1A1A] hover:text-[#0066FF] transition-colors"
        >
          ethereal // 3d
        </a>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden text-[#1A1A1A] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans-satoshi text-xs font-semibold uppercase tracking-wider text-[#5C5C5C]">
          <button
            onClick={() => handleNavClick('hero')}
            className="hover:text-[#0066FF] transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('work')}
            className="hover:text-[#0066FF] transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => handleNavClick('experience')}
            className="hover:text-[#0066FF] transition-colors"
          >
            Experience
          </button>
          <button
            onClick={() => handleNavClick('skills')}
            className="hover:text-[#0066FF] transition-colors"
          >
            Skills
          </button>
          <button
            onClick={() => handleNavClick('writing')}
            className="hover:text-[#0066FF] transition-colors"
          >
            Journal
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="hover:text-[#0066FF] transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-black/10 p-6 flex flex-col gap-4 font-sans-satoshi text-sm font-semibold uppercase tracking-wider text-[#1A1A1A] shadow-xl">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left py-2 hover:text-[#0066FF] transition-colors border-b border-black/5"
            >
              01 // Home
            </button>
            <button
              onClick={() => handleNavClick('work')}
              className="text-left py-2 hover:text-[#0066FF] transition-colors border-b border-black/5"
            >
              02 // Work
            </button>
            <button
              onClick={() => handleNavClick('experience')}
              className="text-left py-2 hover:text-[#0066FF] transition-colors border-b border-black/5"
            >
              03 // Experience
            </button>
            <button
              onClick={() => handleNavClick('skills')}
              className="text-left py-2 hover:text-[#0066FF] transition-colors border-b border-black/5"
            >
              04 // Skills
            </button>
            <button
              onClick={() => handleNavClick('writing')}
              className="text-left py-2 hover:text-[#0066FF] transition-colors border-b border-black/5"
            >
              05 // Journal
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 hover:text-[#0066FF] transition-colors"
            >
              06 // Contact
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
