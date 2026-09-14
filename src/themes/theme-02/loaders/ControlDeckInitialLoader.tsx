import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ShieldCheck } from 'lucide-react';

interface ControlDeckInitialLoaderProps {
  onComplete?: () => void;
}

export const ControlDeckInitialLoader: React.FC<ControlDeckInitialLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const bootLogs = [
    'INITIALIZING SYSTEM BUS...',
    'VERIFYING HARDWARE CORE MODULES...',
    'LOADING TELEMETRY AGENTS...',
    'CONNECTING DECK PERSPECTIVE ENGINE...',
    'SYSTEM READY - CONTROL DECK ONLINE',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsFinished(true);
          if (onComplete) setTimeout(onComplete, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15) + 5;
        const clamped = Math.min(next, 100);
        setCurrentStep(Math.min(Math.floor((clamped / 100) * bootLogs.length), bootLogs.length - 1));
        return clamped;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0D10] text-[#C9D1D9] font-mono p-6 select-none"
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* Central Diagnostic Card */}
          <div className="relative z-10 w-full max-w-md bg-[#161B22] border border-[#30363D] p-6 rounded-sm shadow-2xl">
            {/* Header Telemetry */}
            <div className="flex items-center justify-between border-b border-[#30363D] pb-3 mb-4 text-xs">
              <div className="flex items-center gap-2 text-[#00F0FF]">
                <Cpu className="w-4 h-4 animate-pulse" />
                <span className="font-bold tracking-wider">[BOOT_SEQUENCE_V2.5]</span>
              </div>
              <span className="text-[#8B949E]">STATUS: ACTIVE</span>
            </div>

            {/* Diagnostic Log Output */}
            <div className="bg-[#0A0D10] border border-[#30363D] p-3 mb-4 rounded-sm text-[11px] h-28 overflow-hidden flex flex-col justify-end space-y-1">
              {bootLogs.slice(0, currentStep + 1).map((log, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-[#8B949E]">&gt;</span>
                  <span className={index === currentStep ? 'text-[#00F0FF] font-bold' : 'text-[#8B949E]'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress Bar Container */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#8B949E]">HARDWARE_INIT</span>
                <span className="text-[#00F0FF] font-bold">{progress}%</span>
              </div>
              <div className="h-2 w-full bg-[#0A0D10] border border-[#30363D] rounded-none overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF9F1C] transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="mt-4 flex items-center justify-between text-[10px] text-[#8B949E]">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#00F0FF]" />
                <span>SECURE BOOT ENFORCED</span>
              </div>
              <span>PORTFOLIO OS // THEME 02</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
