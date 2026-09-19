import React from 'react';
import { CharacterAvatar } from './CharacterAvatar';
import { PortfolioIdentity } from '../../../types/portfolio';

interface HeroSectionProps {
  identity: PortfolioIdentity | null;
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ identity, onExploreClick, onContactClick }) => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 px-6 max-w-7xl mx-auto flex flex-col justify-center items-center lg:items-stretch">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & Controls */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 z-10 text-center lg:text-left">
          {/* Top Tagline */}
          <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#69D9FF] w-fit mx-auto lg:mx-0">
            <span className="w-2 h-2 rounded-full bg-[#249BFF] animate-pulse" />
            <span>ARCHITECTURAL PORTFOLIO OS v3.0</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-tight leading-[1.08] text-white">
            I DESIGN <br />
            <span className="text-gradient-cyan">DIGITAL WORLDS</span> <br />
            THAT MOVE.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-[#91A0AD] max-w-xl leading-relaxed mx-auto lg:mx-0">
            {identity?.bio ||
              'Developer, designer, and creative technologist building thoughtful experiences at the intersection of code, motion, and imagination.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#249BFF] to-[#69D9FF] text-[#07090D] font-semibold tracking-wide hover:shadow-[0_0_30px_rgba(36,155,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              EXPLORE MY WORK
            </button>
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-[#F2F5F7] font-medium tracking-wide hover:bg-white/10 hover:border-white/40 backdrop-blur-md transition-all duration-300"
            >
              START A CONVERSATION
            </button>
          </div>
        </div>

        {/* Right Column: Seated Character Avatar (Focused Pose) */}
        <div className="lg:col-span-5 flex justify-center z-10">
          <CharacterAvatar mode="focused" className="w-full max-w-md" />
        </div>
      </div>
    </section>
  );
};
