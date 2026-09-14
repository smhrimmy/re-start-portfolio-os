import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ControlDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const ControlDeckModal: React.FC<ControlDeckModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl',
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0D10]/80 backdrop-blur-md font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`relative w-full ${maxWidth} bg-[#161B22] border border-[#30363D] rounded-sm shadow-2xl overflow-hidden`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363D] bg-[#0A0D10]/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                <h3 className="text-sm font-bold uppercase text-[#00F0FF] tracking-wider">
                  {title}
                </h3>
              </div>
              {subtitle && <p className="text-[11px] text-[#8B949E] mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1 border border-[#30363D] text-[#8B949E] hover:text-white hover:border-[#8B949E] rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 max-h-[75vh] overflow-y-auto">{children}</div>

          {/* Footer Bar Accent */}
          <div className="h-1 bg-gradient-to-r from-[#00F0FF] via-[#FF9F1C] to-[#00F0FF] opacity-60" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
