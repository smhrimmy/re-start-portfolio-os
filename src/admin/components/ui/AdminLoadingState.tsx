import React from 'react';

interface AdminLoadingStateProps {
  label?: string;
}

export const AdminLoadingState: React.FC<AdminLoadingStateProps> = ({ label = 'Loading telemetry...' }) => {
  return (
    <div className="p-8 flex items-center justify-center gap-3 font-mono text-sm text-[#666]">
      <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
      <span>{label}</span>
    </div>
  );
};
