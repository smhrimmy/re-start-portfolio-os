import React, { useState } from 'react';
import { ContentRevision } from '../types/admin-types';
import { AdminDialog } from './primitives/AdminDialog';
import { GitCommit, RotateCcw, LayoutGrid, Columns } from 'lucide-react';

interface RevisionDiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  revision: ContentRevision | null;
  onRevert: (revision: ContentRevision) => void;
}

export const RevisionDiffModal: React.FC<RevisionDiffModalProps> = ({
  isOpen,
  onClose,
  revision,
  onRevert,
}) => {
  const [mode, setMode] = useState<'unified' | 'split'>('unified');

  if (!revision) return null;

  const beforeStr = JSON.stringify(revision.beforeSnapshot, null, 2);
  const afterStr = JSON.stringify(revision.afterSnapshot, null, 2);

  return (
    <AdminDialog
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title={`Revision Diff — ${revision.id}`}
      description={`Commit by ${revision.author} on ${new Date(revision.timestamp).toLocaleString()}`}
    >
      <div className="space-y-4">
        {/* Commit Header & Controls */}
        <div className="bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-3 flex items-center justify-between font-mono text-xs text-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <GitCommit size={16} className="text-[#10b981]" />
            <span className="font-bold">{revision.commitMessage}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('unified')}
              className={`p-1.5 rounded flex items-center gap-1 ${
                mode === 'unified' ? 'bg-[#10b981] text-white font-bold' : 'bg-[#e0e0df] text-[#666]'
              }`}
            >
              <LayoutGrid size={14} /> Unified
            </button>
            <button
              onClick={() => setMode('split')}
              className={`p-1.5 rounded flex items-center gap-1 ${
                mode === 'split' ? 'bg-[#10b981] text-white font-bold' : 'bg-[#e0e0df] text-[#666]'
              }`}
            >
              <Columns size={14} /> Side-by-Side
            </button>
          </div>
        </div>

        {/* Diff Content Rendering */}
        {mode === 'unified' ? (
          <div className="font-mono text-xs bg-slate-900 text-slate-200 rounded-lg p-4 max-h-80 overflow-y-auto space-y-1">
            <div className="text-red-400 bg-red-950/40 p-2 rounded border border-red-800/40">
              <span className="select-none font-bold text-red-500 mr-2">- BEFORE SNAPSHOT:</span>
              <pre className="whitespace-pre-wrap mt-1">{beforeStr}</pre>
            </div>
            <div className="text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-800/40 mt-2">
              <span className="select-none font-bold text-emerald-500 mr-2">+ AFTER SNAPSHOT:</span>
              <pre className="whitespace-pre-wrap mt-1">{afterStr}</pre>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 font-mono text-xs max-h-80 overflow-y-auto">
            <div className="bg-red-950/30 text-red-300 border border-red-800/40 rounded-lg p-3">
              <div className="font-bold text-red-400 pb-1 mb-2 border-b border-red-800/40">- BEFORE</div>
              <pre className="whitespace-pre-wrap">{beforeStr}</pre>
            </div>
            <div className="bg-emerald-950/30 text-emerald-300 border border-emerald-800/40 rounded-lg p-3">
              <div className="font-bold text-emerald-400 pb-1 mb-2 border-b border-emerald-800/40">+ AFTER</div>
              <pre className="whitespace-pre-wrap">{afterStr}</pre>
            </div>
          </div>
        )}

        {/* Revert Action */}
        <div className="flex items-center justify-between pt-3 border-t border-[#dcdcdc]">
          <span className="text-xs text-[#666] font-mono">1-Click Revert creates a new revert commit entry</span>
          <button
            onClick={() => {
              onRevert(revision);
              onClose();
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white font-mono font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <RotateCcw size={14} /> Revert to This Commit
          </button>
        </div>
      </div>
    </AdminDialog>
  );
};
