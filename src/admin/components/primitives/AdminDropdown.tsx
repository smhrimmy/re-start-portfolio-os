import React, { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
  isDanger?: boolean;
}

interface AdminDropdownProps {
  trigger: ReactNode;
  items: DropdownMenuItem[];
}

export const AdminDropdown: React.FC<AdminDropdownProps> = ({ trigger, items }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[180px] bg-[#f4f4f3] border border-[#dcdcdc] rounded-lg p-1.5 shadow-xl z-50 animate-in fade-in-80 zoom-in-95"
          sideOffset={5}
        >
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.id}
              onClick={item.onSelect}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-mono rounded cursor-pointer outline-none transition-colors ${
                item.isDanger
                  ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                  : 'text-[#1a1a1a] hover:bg-[#e0e0df]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
