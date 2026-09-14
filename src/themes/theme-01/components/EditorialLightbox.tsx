import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxImage {
  src: string;
  caption?: string;
}

interface EditorialLightboxProps {
  isOpen: boolean;
  images: LightboxImage[];
  currentIndex: number;
  projectName?: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const EditorialLightbox: React.FC<EditorialLightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  projectName = 'PROJECT CASE STUDY',
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#111111]/95 text-[#F9F8F6] flex flex-col justify-between p-4 sm:p-8 backdrop-blur-md"
      >
        {/* Top Header Plate Info */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4 font-mono text-xs">
          <div>
            <span className="text-[#8B0000] font-bold mr-2">PLATE NO. 0{currentIndex + 1}</span>
            <span className="text-gray-400">// {projectName}</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded"
          >
            <X size={16} /> <span>CLOSE [ESC]</span>
          </button>
        </div>

        {/* Center Image Viewport */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
          {images.length > 1 && (
            <button
              onClick={onPrev}
              className="absolute left-2 sm:left-6 z-10 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <motion.img
            key={currentIndex}
            src={currentImg.src}
            alt={currentImg.caption || projectName}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[70vh] max-w-full object-contain border border-white/10 shadow-2xl"
          />

          {images.length > 1 && (
            <button
              onClick={onNext}
              className="absolute right-2 sm:right-6 z-10 p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 rounded-full transition-all"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Bottom Caption & Controls */}
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-xs text-gray-400">
          <div>
            {currentImg.caption ? (
              <p className="font-sans text-sm text-gray-200">{currentImg.caption}</p>
            ) : (
              <span>FIGURE 0{currentIndex + 1} — HIGH RESOLUTION ARCHIVAL PLATE</span>
            )}
          </div>
          <div>
            <span>IMAGE {currentIndex + 1} OF {images.length}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
