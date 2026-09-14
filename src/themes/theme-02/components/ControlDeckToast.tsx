import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ControlDeckToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ControlDeckToastContainer: React.FC<ControlDeckToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            className={`pointer-events-auto relative p-3 border rounded-sm font-mono shadow-2xl backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-[#0A0D10]/90 border-[#00F0FF]/60 text-[#00F0FF]'
                : toast.type === 'warning'
                ? 'bg-[#0A0D10]/90 border-[#FF9F1C]/60 text-[#FF9F1C]'
                : toast.type === 'error'
                ? 'bg-[#0A0D10]/90 border-[#FF4D4D]/60 text-[#FF4D4D]'
                : 'bg-[#0A0D10]/90 border-[#30363D] text-[#C9D1D9]'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 shrink-0">
                {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />}
                {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#FF9F1C]" />}
                {toast.type === 'error' && <XCircle className="w-4 h-4 text-[#FF4D4D]" />}
                {toast.type === 'info' && <Info className="w-4 h-4 text-[#00F0FF]" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>[SYS_LOG]: {toast.title}</span>
                  <span className="text-[10px] opacity-60">LIVE</span>
                </div>
                {toast.message && (
                  <p className="text-[11px] mt-1 text-[#8B949E] leading-tight">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => onDismiss(toast.id)}
                className="text-[#8B949E] hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Top scanning bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-[2px] ${
                toast.type === 'success'
                  ? 'bg-[#00F0FF]'
                  : toast.type === 'warning'
                  ? 'bg-[#FF9F1C]'
                  : toast.type === 'error'
                  ? 'bg-[#FF4D4D]'
                  : 'bg-[#8B949E]'
              }`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
