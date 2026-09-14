import React from 'react';
import { EditorialButton } from '../components/EditorialButton';

interface NotFoundPageProps {
  onNavigate: (tab: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="border border-[#111111] bg-white p-10 sm:p-16 space-y-6">
        <span className="font-mono text-xs font-bold text-[#8B0000] tracking-widest uppercase block">
          ERROR STATE // ISSUE 404
        </span>
        <h1 className="theme-01-display text-4xl sm:text-6xl font-bold text-[#111111]">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm font-mono text-[#666666] max-w-md mx-auto leading-relaxed">
          THE REQUESTED PUBLICATION SECTION OR CASE STUDY DOES NOT EXIST IN ISSUE 01 ARCHIVE.
        </p>
        <div className="pt-4 border-t border-[#E2E0D8]">
          <EditorialButton onClick={() => onNavigate('home')} variant="primary">
            RETURN TO INDEX →
          </EditorialButton>
        </div>
      </div>
    </div>
  );
};
