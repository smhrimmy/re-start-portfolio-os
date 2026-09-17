import React from 'react';

interface EditorialButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const EditorialButton: React.FC<EditorialButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  isDisabled = false,
  isLoading = false,
  className = '',
  type = 'button',
}) => {
  const baseStyles =
    'font-mono inline-flex items-center justify-center gap-2 font-bold tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none min-h-[44px]';

  const variantStyles = {
    primary: 'bg-[#111111] text-[#F9F8F6] border border-[#111111] hover:bg-[#8B0000] hover:border-[#8B0000] active:bg-[#6B0000]',
    secondary: 'bg-[#F2F0EB] text-[#111111] border border-[#E2E0D8] hover:bg-[#111111] hover:text-[#F9F8F6] active:bg-[#333333]',
    outline: 'bg-transparent text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-[#F9F8F6] active:bg-[#333333]',
    text: 'bg-transparent text-[#111111] hover:text-[#8B0000] p-0 underline-offset-4 hover:underline',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-3 py-1.5',
    md: 'text-xs px-4 py-2.5',
    lg: 'text-sm px-6 py-3.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${variant !== 'text' ? sizeStyles[size] : ''} ${className}`}
    >
      {isLoading ? (
        <>
          <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>PROCESSING...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
