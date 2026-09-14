import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { modalEditorialSlide } from '../animations/editorialAnimations';

interface EditorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const EditorialModal: React.FC<EditorialModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  actions,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm">
          <motion.div
            variants={modalEditorialSlide}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-[#F9F8F6] border border-[#111111] max-w-lg w-full p-6 sm:p-8 shadow-xl text-[#111111] relative"
          >
            {/* Header */}
            <div className="flex justify-between items-start border-b border-[#E2E0D8] pb-4 mb-6">
              <div>
                <span className="font-mono text-[10px] text-[#8B0000] tracking-widest block uppercase mb-1">
                  EDITORIAL DIALOG
                </span>
                <h3 className="theme-01-display text-2xl font-bold">{title}</h3>
                {subtitle && <p className="text-xs text-[#666666] mt-1 font-light">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="p-1 text-[#666666] hover:text-[#111111] transition-colors"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="text-sm text-[#333333] leading-relaxed mb-8">{children}</div>

            {/* Actions */}
            {actions && (
              <div className="flex justify-end gap-3 pt-4 border-t border-[#E2E0D8]">
                {actions}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
