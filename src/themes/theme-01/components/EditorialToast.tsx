import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditorialToastProps {
  isVisible: boolean;
  message: string;
  onClose?: () => void;
}

export const EditorialToast: React.FC<EditorialToastProps> = ({
  isVisible,
  message,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 bg-[#111111] text-[#F9F8F6] border border-[#E2E0D8] p-4 max-w-sm shadow-xl flex items-center justify-between gap-4 font-mono text-xs"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#8B0000]" />
            <div>
              <span className="text-[10px] text-[#999999] block uppercase">PUBLICATION NOTICE</span>
              <span className="text-[#F9F8F6]">{message}</span>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-[#999999] hover:text-[#FFFFFF] text-xs font-bold transition-colors"
            >
              ✕
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
