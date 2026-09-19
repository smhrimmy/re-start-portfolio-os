import React from 'react';
import { PortfolioIdentity } from '@/types/portfolio';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  identity: PortfolioIdentity;
}

export const Hero: React.FC<HeroProps> = ({ identity }) => {
  const handleScrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
      <div className="hero-content max-w-4xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-black/10 text-xs font-semibold text-[#0066FF] shadow-sm mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{identity.role || 'FULL STACK DEVELOPER & WEB ADVISOR'}</span>
        </div>

        <h1 className="hero-title text-5xl sm:text-7xl lg:text-8xl font-serif-instrument font-bold text-[#1A1A1A] leading-[1.05] tracking-tight">
          {identity.name || 'Prajwal DL'}
        </h1>

        <p className="hero-subtitle text-lg sm:text-2xl font-sans-satoshi text-[#5C5C5C] leading-relaxed max-w-2xl mx-auto">
          {identity.bio || 'Designing and engineering high-performance web applications, fluid user interfaces, and reliable cloud infrastructure.'}
        </p>

        <div className="hero-cta flex flex-wrap justify-center gap-4 pt-4">
          <button
            onClick={handleScrollToWork}
            className="btn-primary px-8 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 min-h-[44px]"
          >
            <span>Explore Selected Work</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-black/5 font-sans-satoshi text-xs text-left max-w-3xl mx-auto">
          <div>
            <span className="text-[#A0A0A0] block text-[10px] uppercase font-bold">Location</span>
            <span className="text-[#1A1A1A] font-semibold block mt-0.5">{identity.location || 'Mangalore, India'}</span>
          </div>
          <div>
            <span className="text-[#A0A0A0] block text-[10px] uppercase font-bold">Experience</span>
            <span className="text-[#0066FF] font-semibold block mt-0.5">2+ Years</span>
          </div>
          <div>
            <span className="text-[#A0A0A0] block text-[10px] uppercase font-bold">Projects</span>
            <span className="text-[#00D4FF] font-semibold block mt-0.5">10+ Systems</span>
          </div>
          <div>
            <span className="text-[#A0A0A0] block text-[10px] uppercase font-bold">Status</span>
            <span className="text-[#10B981] font-semibold block mt-0.5">Open for Contracts</span>
          </div>
        </div>
      </div>
    </section>
  );
};
