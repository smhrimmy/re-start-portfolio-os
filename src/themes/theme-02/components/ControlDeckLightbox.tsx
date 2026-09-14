import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';

interface ControlDeckLightboxProps {
  isOpen: boolean;
  imageUrl: string | null;
  caption?: string;
  onClose: () => void;
}

export const ControlDeckLightbox: React.FC<ControlDeckLightboxProps> = ({
  isOpen,
  imageUrl,
  caption,
  onClose,
}) => {
  const [zoom, setZoom] = useState(1);

  if (!isOpen || !imageUrl) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0D10]/95 backdrop-blur-lg font-mono">
        {/* Header Telemetry */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between border-b border-[#30363D] pb-3 text-xs text-[#8B949E]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-[#00F0FF] font-bold">[VISUAL_INSPECTION_MODE]</span>
            <span className="hidden sm:inline text-[#30363D]">|</span>
            <span className="hidden sm:inline">SCALE: {Math.round(zoom * 100)}%</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.25, 2.5))}
              className="p-1.5 border border-[#30363D] rounded hover:border-[#00F0FF] text-[#C9D1D9] hover:text-[#00F0FF] transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}
              className="p-1.5 border border-[#30363D] rounded hover:border-[#00F0FF] text-[#C9D1D9] hover:text-[#00F0FF] transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 border border-[#30363D] rounded hover:border-[#00F0FF] text-[#C9D1D9] hover:text-[#00F0FF] transition-colors"
              title="Reset Zoom"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="p-1.5 border border-[#30363D] rounded hover:border-[#00F0FF] text-[#C9D1D9] hover:text-[#00F0FF] transition-colors"
              title="Download Asset"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 border border-[#FF4D4D]/40 text-[#FF4D4D] rounded hover:bg-[#FF4D4D]/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Image Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-5xl max-h-[80vh] overflow-auto flex items-center justify-center p-4 border border-[#30363D] bg-[#161B22] rounded-sm"
        >
          <img
            src={imageUrl}
            alt={caption || 'Asset Preview'}
            className="max-h-[70vh] object-contain transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          />

          {/* Target grid overlay */}
          <div className="absolute inset-0 border border-[#00F0FF]/10 pointer-events-none grid grid-cols-6 grid-rows-6">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="border-r border-b border-[#00F0FF]/5" />
            ))}
          </div>
        </motion.div>

        {/* Bottom Caption Bar */}
        {caption && (
          <div className="absolute bottom-4 left-4 right-4 p-2.5 bg-[#161B22] border border-[#30363D] text-xs text-[#C9D1D9] text-center">
            <span className="text-[#00F0FF] mr-2">[TELEMETRY_DATA]:</span>
            {caption}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
