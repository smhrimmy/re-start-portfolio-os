import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AdminEmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const AdminEmptyState: React.FC<AdminEmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="p-10 border border-dashed border-[#dcdcdc] rounded-xl bg-[#f4f4f3] flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 rounded-full bg-[#e0e0df] flex items-center justify-center text-[#666] mb-3">
        <AlertCircle size={24} />
      </div>
      <h3 className="font-mono font-bold text-[#1a1a1a] text-base uppercase tracking-wider mb-1">
        {title}
      </h3>
      <p className="text-sm text-[#666] max-w-sm mb-4">{description}</p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-[#10b981] text-white font-mono font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#0d9668] transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
