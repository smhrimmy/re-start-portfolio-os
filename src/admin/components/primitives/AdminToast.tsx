import React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export interface ToastNotification {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

interface AdminToastProps {
  toast: ToastNotification | null;
  onClose: () => void;
}

export const AdminToast: React.FC<AdminToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={!!toast}
        onOpenChange={(open) => !open && onClose()}
        className="fixed bottom-6 right-6 w-80 bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-4 shadow-2xl z-50 flex items-start justify-between gap-3 font-sans"
      >
        <div className="flex items-start gap-3">
          {isSuccess && <CheckCircle2 size={20} className="text-emerald-600 mt-0.5" />}
          {isError && <AlertCircle size={20} className="text-red-600 mt-0.5" />}
          {!isSuccess && !isError && <Info size={20} className="text-blue-600 mt-0.5" />}

          <div>
            <Toast.Title className="font-mono text-sm font-bold text-[#1a1a1a] uppercase">
              {toast.title}
            </Toast.Title>
            {toast.description && (
              <Toast.Description className="text-xs text-[#666] mt-1">
                {toast.description}
              </Toast.Description>
            )}
          </div>
        </div>

        <Toast.Close className="text-[#888] hover:text-[#1a1a1a] p-1 rounded">
          <X size={16} />
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
};
