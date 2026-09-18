import React, { useState } from 'react';
import { PortfolioIdentity } from '@/types/portfolio';

interface Theme05NavbarProps {
  identity: PortfolioIdentity;
}

export const Theme05Navbar: React.FC<Theme05NavbarProps> = ({ identity }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const firstName = identity.name ? identity.name.split(' ')[0] : 'Prajwal';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between p-[26px_6vw] mix-blend-difference pointer-events-auto">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="logo font-script-caveat text-[28px] color-white font-bold text-white"
        >
          {firstName}
        </a>

        {/* Nav Links */}
        <ul className="nav-links hidden md:flex gap-[34px]" id="nav-links">
          <li>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#work');
              }}
              className="text-[12px] tracking-[0.14em] uppercase text-white hover:text-[#c9a876] transition-colors"
            >
              Work
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#about');
              }}
              className="text-[12px] tracking-[0.14em] uppercase text-white hover:text-[#c9a876] transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#expertise"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#expertise');
              }}
              className="text-[12px] tracking-[0.14em] uppercase text-white hover:text-[#c9a876] transition-colors"
            >
              Journal
            </a>
          </li>
          <li>
            <a
              href="#expertise"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#expertise');
              }}
              className="text-[12px] tracking-[0.14em] uppercase text-white hover:text-[#c9a876] transition-colors"
            >
              Expertise
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="text-[12px] tracking-[0.14em] uppercase text-white hover:text-[#c9a876] transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Burger Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          className="burger w-[26px] h-[16px] relative cursor-pointer z-[600] border-0 bg-transparent p-0"
        >
          <span
            className={`absolute left-0 w-full h-[1.5px] bg-white transition-all duration-350 ${
              isMenuOpen ? 'top-[7px] rotate-45' : 'top-0'
            }`}
          />
          <span
            className={`absolute left-0 w-full h-[1.5px] bg-white transition-all duration-350 top-[7px] ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute left-0 w-full h-[1.5px] bg-white transition-all duration-350 ${
              isMenuOpen ? 'top-[7px] -rotate-45' : 'top-[14px]'
            }`}
          />
        </button>
      </nav>

      {/* Menu Overlay */}
      <div
        id="menu-overlay"
        style={{
          clipPath: isMenuOpen ? 'circle(150% at 95% 4%)' : 'circle(0% at 95% 4%)',
        }}
        className="fixed inset-0 bg-[#0c0c0c] z-[400] flex items-center justify-center transition-[clip-path] duration-800 cubic-bezier(0.76, 0, 0.24, 1)"
      >
        <ul className="flex flex-col gap-[18px] text-center">
          <li>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#work');
              }}
              className="font-display-anton uppercase text-[clamp(32px,7vw,60px)] text-[#8c8c8c] hover:text-[#c9a876] transition-colors"
            >
              Work
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#about');
              }}
              className="font-display-anton uppercase text-[clamp(32px,7vw,60px)] text-[#8c8c8c] hover:text-[#c9a876] transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#expertise"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#expertise');
              }}
              className="font-display-anton uppercase text-[clamp(32px,7vw,60px)] text-[#8c8c8c] hover:text-[#c9a876] transition-colors"
            >
              Expertise
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="font-display-anton uppercase text-[clamp(32px,7vw,60px)] text-[#8c8c8c] hover:text-[#c9a876] transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
