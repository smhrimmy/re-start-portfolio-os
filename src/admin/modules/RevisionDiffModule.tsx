import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { RevisionDiffModal } from '../components/RevisionDiffModal';
import { loadAdminStore, saveAdminStore, addRevisionCommit } from '../store/adminStore';
import { ContentRevision } from '../types/admin-types';
import { GitCommit, History, Eye } from 'lucide-react';

export const RevisionDiffModule: React.FC = () => {
  const [store, setStore] = useState(() => loadAdminStore());
  const [selectedRevision, setSelectedRevision] = useState<ContentRevision | null>(null);

  const handleRevert = (targetRev: ContentRevision) => {
    addRevisionCommit(
      store,
      targetRev.entityType,
      targetRev.entityId,
      `REVERT: Reverted to revision ${targetRev.id}`,
      {},
      targetRev.afterSnapshot
    );
    saveAdminStore(store);
    setStore({ ...store });
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Git-Style Revision & Diff Engine"
        subtitle="Complete commit history log with unified/split diff visualizer and 1-click revert"
        status="active"
      />

      <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm">
        <h2 className="font-mono text-base font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
          <History size={18} className="text-[#10b981]" />
          <span>Commit Log History ({store.revisions.length} Commits)</span>
        </h2>

        <div className="space-y-3 font-mono text-xs">
          {store.revisions.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-[#aaa] transition-colors"
            >
              <div className="flex items-start gap-3">
                <GitCommit size={18} className="text-[#10b981] shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1a1a1a]">{rev.id}</span>
                    <span className="text-[10px] uppercase font-bold bg-[#dcdcdc] px-2 py-0.5 rounded text-[#666]">
                      {rev.entityType}
                    </span>
                  </div>
                  <p className="text-sm text-[#1a1a1a] font-sans mt-0.5">{rev.commitMessage}</p>
                  <div className="text-[#888] mt-1">By {rev.author} on {new Date(rev.timestamp).toLocaleString()}</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedRevision(rev)}
                className="bg-[#e0e0df] hover:bg-[#d5d5d4] text-[#1a1a1a] font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-[#d2d2d0]"
              >
                <Eye size={14} /> View Diff
              </button>
            </div>
          ))}
        </div>
      </div>

      <RevisionDiffModal
        isOpen={!!selectedRevision}
        onClose={() => setSelectedRevision(null)}
        revision={selectedRevision}
        onRevert={handleRevert}
      />
    </div>
  );
};
