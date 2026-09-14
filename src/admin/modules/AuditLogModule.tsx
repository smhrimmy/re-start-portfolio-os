import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { AdminDialog } from '../components/primitives/AdminDialog';
import { loadAdminStore, saveAdminStore } from '../store/adminStore';
import { ShieldCheck, Download, Trash2, AlertTriangle } from 'lucide-react';

export const AuditLogModule: React.FC = () => {
  const [store, setStore] = useState(() => loadAdminStore());
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');

  const handleExportSnapshot = () => {
    const jsonStr = JSON.stringify(store, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-os-full-snapshot-${Date.now()}.json`;
    a.click();
  };

  const handleFactoryReset = () => {
    if (confirmInput !== 'RESET') return;
    localStorage.clear();
    const freshStore = loadAdminStore();
    setStore(freshStore);
    saveAdminStore(freshStore);
    setIsResetModalOpen(false);
    setConfirmInput('');
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Audit Log & Data Utilities"
        subtitle="System audit history trail, snapshot backup export, and factory reset controls"
        status="active"
      />

      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={handleExportSnapshot}
          className="bg-[#10b981] text-white font-mono font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors flex items-center gap-2"
        >
          <Download size={16} /> Export Full System Snapshot
        </button>

        <button
          onClick={() => setIsResetModalOpen(true)}
          className="bg-red-600 text-white font-mono font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <Trash2 size={16} /> Factory Reset System
        </button>
      </div>

      <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm">
        <h2 className="font-mono text-base font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
          <ShieldCheck size={18} className="text-[#10b981]" />
          <span>Audit Log Trail ({store.auditLogs.length} Events)</span>
        </h2>

        <div className="space-y-3 font-mono text-xs">
          {store.auditLogs.map((log) => (
            <div key={log.id} className="bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-[#10b981] mr-2">[{log.action}]</span>
                <span className="text-[#1a1a1a]">Target: {log.entityType} ({log.entityId})</span>
                {log.revisionId && <span className="text-[#888] ml-2">Revision: {log.revisionId}</span>}
              </div>
              <div className="text-[#888]">{new Date(log.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Double Confirmation Factory Reset Modal */}
      <AdminDialog isOpen={isResetModalOpen} onOpenChange={setIsResetModalOpen} title="Factory Reset Confirmation" description="This will wipe all local CMS data, projects, articles, and revisions.">
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 flex items-start gap-2">
            <AlertTriangle size={18} className="shrink-0 text-red-600 mt-0.5" />
            <div>
              <strong className="block font-bold">Irreversible Action:</strong>
              <span>Type "RESET" in capital letters below to confirm wiping local storage memory.</span>
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-[#666] mb-1">Type "RESET" to confirm</label>
            <input
              type="text"
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              placeholder="RESET"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
            />
          </div>

          <button
            onClick={handleFactoryReset}
            disabled={confirmInput !== 'RESET'}
            className="w-full bg-red-600 disabled:opacity-50 text-white font-bold text-sm py-2.5 rounded-lg hover:bg-red-700 transition-colors"
          >
            Confirm & Execute Factory Reset
          </button>
        </div>
      </AdminDialog>
    </div>
  );
};
