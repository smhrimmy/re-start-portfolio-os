import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectCheckingPopupProps {
  isOpen: boolean;
  projectNumber: string;
  projectName: string;
  category: string;
  year: string;
  onComplete: () => void;
}

export const ProjectCheckingPopup: React.FC<ProjectCheckingPopupProps> = ({
  isOpen,
  projectNumber,
  projectName,
  category,
  year,
  onComplete,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onComplete]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#F9F8F6] border border-[#111111] p-8 max-w-md w-full shadow-2xl text-[#111111] relative"
          >
            {/* Top Masthead Tag */}
            <div className="flex items-center justify-between font-mono text-[11px] text-[#8B0000] border-b border-[#E2E0D8] pb-3 mb-6">
              <span>PROJECT // {projectNumber}</span>
              <span>OPENING CASE STUDY...</span>
            </div>

            {/* Center Content */}
            <div className="space-y-3 mb-8">
              <span className="font-mono text-xs text-[#666666] tracking-widest uppercase">
                {category} · {year}
              </span>
              <h3 className="theme-01-display text-3xl font-bold tracking-tight">
                {projectName}
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Loading publication metrics, architecture specs, and live deployment environment.
              </p>
            </div>

            {/* Expanding Progress Rule */}
            <div className="w-full bg-[#E2E0D8] h-[2px] relative overflow-hidden mb-4">
              <motion.div
                className="bg-[#8B0000] h-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className="flex justify-between items-center font-mono text-[10px] text-[#999999]">
              <span>ISSUE 01 // CASE STUDY TRANSITION</span>
              <span>CHAPTER INITIALIZED</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
