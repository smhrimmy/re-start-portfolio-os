import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface AdminFormErrorProps {
  message?: string;
}

export const AdminFormError: React.FC<AdminFormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 text-xs font-mono text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg mt-1">
      <AlertTriangle size={14} className="shrink-0" />
      <span>{message}</span>
    </div>
  );
};
