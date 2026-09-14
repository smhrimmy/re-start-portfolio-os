import React from 'react';

interface ArchiveNavbarProps {
  brandName?: string;
  onNavigateSection?: (sectionId: string) => void;
}

export const ArchiveNavbar: React.FC<ArchiveNavbarProps> = ({
  brandName = "prajwal",
  onNavigateSection
}) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    if (onNavigateSection) {
      onNavigateSection(targetId);
    }
  };

  return (
    <nav className="sticky top-0 z-20 w-full min-h-[72px] bg-white py-4 border-b border-[#18203A]/14 transition-all">
      <div className="w-full max-w-[1440px] mx-auto px-[5%] flex flex-wrap items-center justify-between gap-4">
        {/* Brand Link */}
        <a
          href="#top"
          onClick={(e) => handleScroll(e, 'top')}
          className="font-serif-instrument text-[34px] leading-none text-[#18203A] tracking-[-1px] cursor-pointer selection:bg-[#3054DE]/20"
          aria-label="Return to top"
        >
          {brandName}<span className="text-[#3054DE]">.</span>
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-7 font-sans-satoshi text-[14px] font-medium text-[#18203A]">
          <a
            href="#work"
            onClick={(e) => handleScroll(e, 'work')}
            className="hover:text-[#3054DE] transition-colors"
          >
            Work
          </a>
          <a
            href="#process"
            onClick={(e) => handleScroll(e, 'process')}
            className="hover:text-[#3054DE] transition-colors"
          >
            My process
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, 'contact')}
            className="glossy-navy-pill px-[22px] py-[12px] text-white text-[14px] font-medium leading-none"
          >
            Work with me ↗
          </a>
        </div>
      </div>
    </nav>
  );
};
