import React from 'react';
import { INTELLIGENT_STAGE_TOKENS } from '../design-tokens';

interface LedMastheadProps {
  title: string;
  subtitle?: string;
  status?: 'active' | 'warning' | 'danger';
}

export const LedMasthead: React.FC<LedMastheadProps> = ({ title, subtitle, status = 'active' }) => {
  const ledColor =
    status === 'active'
      ? INTELLIGENT_STAGE_TOKENS.colors.ledActive
      : status === 'warning'
      ? INTELLIGENT_STAGE_TOKENS.colors.ledWarning
      : INTELLIGENT_STAGE_TOKENS.colors.ledDanger;

  return (
    <div className="flex items-center justify-between pb-4 border-b border-[#dcdcdc] mb-6">
      <div>
        <div className="flex items-center gap-3">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: ledColor, boxShadow: `0 0 8px ${ledColor}` }}
          />
          <h1
            className="text-2xl font-bold uppercase tracking-widest text-[#1a1a1a]"
            style={{ fontFamily: INTELLIGENT_STAGE_TOKENS.typography.fontFamily }}
          >
            {title}
          </h1>
        </div>
        {subtitle && <p className="text-sm text-[#666666] mt-1 pl-5.5">{subtitle}</p>}
      </div>

      <div className="text-xs uppercase tracking-wider text-[#666666] font-mono px-3 py-1 bg-[#e0e0df] rounded border border-[#d2d2d0]">
        STAGE OS // SYS_OK
      </div>
    </div>
  );
};
