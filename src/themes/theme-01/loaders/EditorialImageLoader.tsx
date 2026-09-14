import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EditorialImageLoaderProps {
  src?: string;
  alt: string;
  category?: string;
  indexNumber?: string;
  className?: string;
  onClick?: () => void;
}

export const EditorialImageLoader: React.FC<EditorialImageLoaderProps> = ({
  src,
  alt,
  category = 'PLATE',
  indexNumber = '01',
  className = '',
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative bg-[#F2F0EB] border border-[#E2E0D8] overflow-hidden group cursor-pointer ${className}`}
    >
      {/* Placeholder state while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex flex-col justify-between p-4 z-10 bg-[#F2F0EB]">
          <div className="flex justify-between items-center font-mono text-[10px] text-[#999999]">
            <span>{category} // {indexNumber}</span>
            <span>LOADING...</span>
          </div>
          <div className="w-full bg-[#E2E0D8] h-[1px] relative overflow-hidden">
            <motion.div
              className="bg-[#111111] h-full"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            />
          </div>
          <div className="font-mono text-[10px] text-[#666666] truncate">{alt}</div>
        </div>
      )}

      {/* Fallback state if image error */}
      {hasError ? (
        <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center p-6 text-center bg-[#F2F0EB] text-[#666666]">
          <span className="font-mono text-xs text-[#8B0000] mb-1">IMAGE PLATE #{indexNumber}</span>
          <span className="theme-01-display text-base font-semibold text-[#111111]">{alt}</span>
        </div>
      ) : (
        src && (
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } group-hover:scale-105`}
          />
        )
      )}

      {/* Hover Overlay Plate Badge */}
      <div className="absolute top-3 left-3 bg-[#111111] text-[#F9F8F6] text-[10px] font-mono px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        PLATE NO. {indexNumber}
      </div>
    </div>
  );
};
