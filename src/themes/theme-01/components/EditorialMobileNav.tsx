import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';

interface EditorialMobileNavProps {
  isOpen: boolean;
  currentTab: string;
  onTabChange: (tab: string) => void;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const EditorialMobileNav: React.FC<EditorialMobileNavProps> = ({
  isOpen,
  currentTab,
  onTabChange,
  onClose,
  onOpenSearch,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#F9F8F6] text-[#111111] flex flex-col justify-between p-6 sm:p-10 select-none overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#E2E0D8] pb-4">
            <div>
              <span className="font-mono text-[10px] text-[#8B0000] tracking-widest block uppercase">
                ISSUE 01 INDEX
              </span>
              <h2 className="theme-01-display text-2xl font-bold">Table of Contents</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F9F8F6] transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chapters Navigation */}
          <nav className="my-8 space-y-4">
            {[
              { id: 'home', number: '01', title: 'EDITORIAL INDEX & OVERVIEW' },
              { id: 'projects', number: '02', title: 'SELECTED WORKS ARCHIVE' },
              { id: 'blog', number: '03', title: 'ESSAYS & TECHNICAL WRITING' },
              { id: 'experience', number: '04', title: 'CAREER TIMELINE & ROLES' },
              { id: 'skills', number: '05', title: 'COMPETENCIES & STACK' },
              { id: 'resume', number: '06', title: 'CURRICULUM VITAE & PRINT' },
              { id: 'contact', number: '07', title: 'CONTACT & INQUIRIES' },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`group cursor-pointer py-3 border-b border-[#E2E0D8] flex items-baseline justify-between transition-colors ${
                  currentTab === item.id ? 'text-[#8B0000]' : 'text-[#111111] hover:text-[#8B0000]'
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs font-bold">{item.number}</span>
                  <span className="theme-01-display text-lg sm:text-xl font-semibold">
                    {item.title}
                  </span>
                </div>
                <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </div>
            ))}
          </nav>

          {/* Footer Actions */}
          <div className="border-t border-[#E2E0D8] pt-4 flex flex-col gap-3 font-mono text-xs">
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="w-full bg-[#111111] text-[#F9F8F6] py-3 text-center font-bold hover:bg-[#8B0000] transition-colors flex items-center justify-center gap-2"
            >
              <Search size={14} /> SEARCH ARCHIVE (/)
            </button>
            <div className="text-[10px] text-[#999999] text-center">
              PRAJWAL DL // PORTFOLIO OS v2.4 EDITION 2026
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
