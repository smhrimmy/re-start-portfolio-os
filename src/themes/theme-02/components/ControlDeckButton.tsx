import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ControlDeckButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'amber' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const ControlDeckButton: React.FC<ControlDeckButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-mono font-medium uppercase tracking-wider transition-all duration-150 rounded-sm border focus:outline-none focus:ring-1 focus:ring-[#00F0FF] disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1 text-xs gap-1.5 min-h-[32px]',
    md: 'px-4 py-2 text-sm gap-2 min-h-[40px]',
    lg: 'px-6 py-3 text-base gap-2.5 min-h-[48px]',
  };

  const variantStyles = {
    primary:
      'bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/50 hover:bg-[#00F0FF]/20 hover:border-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]',
    secondary:
      'bg-[#161B22] text-[#C9D1D9] border-[#30363D] hover:bg-[#21262D] hover:text-white hover:border-[#8B949E]',
    amber:
      'bg-[#FF9F1C]/10 text-[#FF9F1C] border-[#FF9F1C]/50 hover:bg-[#FF9F1C]/20 hover:border-[#FF9F1C] hover:shadow-[0_0_15px_rgba(255,159,28,0.3)]',
    ghost:
      'bg-transparent text-[#8B949E] border-transparent hover:bg-[#161B22] hover:text-[#00F0FF]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Corner bracket accent */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-current opacity-70" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-current opacity-70" />

      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
