import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EditorialInitialLoaderProps {
  onComplete: () => void;
}

export const EditorialInitialLoader: React.FC<EditorialInitialLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="fixed inset-0 z-50 bg-[#F9F8F6] text-[#111111] flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none"
    >
      {/* Top Issue Header */}
      <div className="flex justify-between items-start font-mono text-xs tracking-widest text-[#666666] border-b border-[#E2E0D8] pb-4">
        <div>PDL PORTFOLIO OS // EDITION 2026</div>
        <div>ISSUE 01 — MINIMAL EDITORIAL</div>
      </div>

      {/* Center Magazine Opening Callout */}
      <div className="my-auto max-w-2xl">
        <div className="font-mono text-xs text-[#8B0000] tracking-wider mb-2">PUBLICATION OPENING</div>
        <h1 className="theme-01-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          Prajwal DL
        </h1>
        <p className="text-base sm:text-lg text-[#666666] font-light leading-relaxed mb-8">
          Systems Architect & Full Stack Web Specialist. Selected Case Studies & Technical Essays.
        </p>

        {/* Expanding Editorial Rule */}
        <div className="w-full bg-[#E2E0D8] h-[2px] relative overflow-hidden mb-4">
          <motion.div
            className="bg-[#111111] h-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        <div className="flex justify-between items-center font-mono text-xs text-[#666666]">
          <span>INDEXING CONTENT // {progress}%</span>
          <span>PRESS SKIP TO ENTER</span>
        </div>
      </div>

      {/* Footer / Skip Trigger */}
      <div className="flex justify-between items-center pt-4 border-t border-[#E2E0D8]">
        <div className="font-mono text-xs text-[#999999]">MANGALORE, KARNATAKA, INDIA</div>
        <button
          onClick={onComplete}
          className="font-mono text-xs font-bold text-[#111111] hover:text-[#8B0000] underline tracking-wider transition-colors"
        >
          SKIP LOADER →
        </button>
      </div>
    </motion.div>
  );
};
