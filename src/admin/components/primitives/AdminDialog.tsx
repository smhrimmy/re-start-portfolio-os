import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { INTELLIGENT_STAGE_TOKENS } from '../../design-tokens';

interface AdminDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export const AdminDialog: React.FC<AdminDialogProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 animate-fadeIn" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-2xl z-50 focus:outline-none"
          style={{ backgroundColor: INTELLIGENT_STAGE_TOKENS.colors.surfaceCard }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#dcdcdc] mb-4">
            <Dialog.Title
              className="font-mono font-bold text-lg uppercase tracking-wider text-[#1a1a1a]"
              style={{ fontFamily: INTELLIGENT_STAGE_TOKENS.typography.fontFamily }}
            >
              {title}
            </Dialog.Title>
            <Dialog.Close className="p-1 rounded text-[#666] hover:text-[#1a1a1a] hover:bg-[#e0e0df] transition-colors">
              <X size={18} />
            </Dialog.Close>
          </div>

          {description && (
            <Dialog.Description className="text-sm text-[#666] mb-4 font-sans">
              {description}
            </Dialog.Description>
          )}

          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
