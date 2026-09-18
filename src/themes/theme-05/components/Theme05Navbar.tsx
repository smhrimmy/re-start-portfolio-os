import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { PortfolioIdentity } from '@/types/portfolio';

interface Theme05NavbarProps {
  identity: PortfolioIdentity;
}

export const Theme05Navbar: React.FC<Theme05NavbarProps> = ({ identity }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'JOURNAL', href: '#journal' },
    { label: 'EXPERTISE', href: '#expertise' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 py-5 px-6 sm:px-12 flex items-center justify-between transition-colors">
        {/* Left Signature Logo Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="font-script-caveat text-2xl sm:text-3xl font-bold text-[#111111] hover:text-[#C9A876] transition-colors"
        >
          prajwal.dl
        </a>

        {/* Center / Right Staggered Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 font-mono-jetbrains text-xs tracking-[0.2em] text-[#111111]">
          {navLinks.map((link, idx) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              style={{ animationDelay: `${idx * 100}ms` }}
              className="hover:text-[#C9A876] transition-colors uppercase animate-in fade-in slide-in-from-top-2 duration-500 font-semibold"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Far Right Hamburger Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="w-11 h-11 rounded-full bg-[#111111] text-[#F0EBE1] hover:bg-[#C9A876] hover:text-[#111111] flex items-center justify-center transition-all shadow-md min-h-[44px] min-w-[44px]"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Full-Screen Dark Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0C] text-white flex flex-col justify-between p-8 sm:p-16 animate-in fade-in duration-300">
          {/* Menu Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="font-script-caveat text-3xl text-[#C9A876]">prajwal.dl</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#C9A876] hover:text-[#111111] flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Large Menu Nav List */}
          <div className="flex flex-col space-y-4 py-8">
            {navLinks.map((link, idx) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-display-archivo text-4xl sm:text-6xl text-left hover:text-[#C9A876] transition-colors flex items-center justify-between group py-2 border-b border-white/5"
              >
                <span>{link.label}</span>
                <span className="font-mono-jetbrains text-sm text-[#999999] group-hover:text-[#C9A876] flex items-center gap-1">
                  0{idx + 1} <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
            ))}
          </div>

          {/* Menu Bottom Info & Socials */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/10 font-mono-jetbrains text-xs text-[#999999]">
            <div>
              <span className="text-[#C9A876] block mb-1">LOCATION</span>
              <span>{identity.location || 'Mangalore, Karnataka, India'}</span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href={identity.socialLinks?.github || 'https://github.com/smhrimmy'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#C9A876] transition-colors flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href={identity.socialLinks?.linkedin || 'https://linkedin.com/in/prajwal-d-l-118198370/'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#C9A876] transition-colors flex items-center gap-1.5"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href={`mailto:${identity.socialLinks?.email || 'pdlkpt@gmail.com'}`}
                className="hover:text-[#C9A876] transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
