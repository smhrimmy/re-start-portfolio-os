import React, { ReactNode } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface AdminTooltipProps {
  content: string;
  children: ReactNode;
}

export const AdminTooltip: React.FC<AdminTooltipProps> = ({ content, children }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-[#1a1a1a] text-white text-xs font-mono px-2.5 py-1.5 rounded shadow-lg z-50 uppercase tracking-wider"
            sideOffset={4}
          >
            {content}
            <Tooltip.Arrow className="fill-[#1a1a1a]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
