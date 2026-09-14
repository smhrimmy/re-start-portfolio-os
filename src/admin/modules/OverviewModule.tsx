import React from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { TelemetryGauge } from '../components/TelemetryGauge';
import { loadAdminStore } from '../store/adminStore';
import { GitCommit, FolderKanban, FileText, Download } from 'lucide-react';

interface OverviewModuleProps {
  onNavigate: (tabId: string) => void;
}

export const OverviewModule: React.FC<OverviewModuleProps> = ({ onNavigate }) => {
  const store = loadAdminStore();

  const handleExportBackup = () => {
    const jsonStr = JSON.stringify(store, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-os-backup-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Executive Overview & Health"
        subtitle="Real-time system telemetry, active revisions, and quick CMS triggers"
        status="active"
      />

      {/* SVG Telemetry Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <TelemetryGauge label="FPS Target" value={100} displayValue="60 FPS" />
        <TelemetryGauge label="Revision Log" value={Math.min(100, store.revisions.length * 10)} displayValue={`${store.revisions.length} Commits`} />
        <TelemetryGauge label="Projects Count" value={Math.min(100, store.projects.length * 20)} displayValue={`${store.projects.length} Projs`} />
        <TelemetryGauge label="Articles Count" value={Math.min(100, store.articles.length * 20)} displayValue={`${store.articles.length} Posts`} />
      </div>

      {/* Quick Action Triggers */}
      <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm mb-8">
        <h2 className="font-mono text-base font-bold text-[#1a1a1a] mb-4">Quick Management Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('projects')}
            className="bg-[#10b981] text-white font-mono font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors flex items-center gap-2"
          >
            <FolderKanban size={16} /> New Project Entry
          </button>
          <button
            onClick={() => onNavigate('blog')}
            className="bg-[#3b82f6] text-white font-mono font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-[#2563eb] transition-colors flex items-center gap-2"
          >
            <FileText size={16} /> New Article Draft
          </button>
          <button
            onClick={handleExportBackup}
            className="bg-[#e0e0df] text-[#1a1a1a] font-mono font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-[#d5d5d4] transition-colors flex items-center gap-2 border border-[#d2d2d0]"
          >
            <Download size={16} /> Export JSON Backup
          </button>
        </div>
      </div>

      {/* Activity Feed driven by Revision Log */}
      <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm">
        <h2 className="font-mono text-base font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
          <GitCommit size={18} className="text-[#10b981]" />
          <span>Recent Activity Stream (Revision History)</span>
        </h2>

        <div className="space-y-3 font-mono text-xs">
          {store.revisions.slice(0, 5).map((rev) => (
            <div key={rev.id} className="bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#1a1a1a] mr-2">[{rev.entityType.toUpperCase()}]</span>
                <span className="text-[#444]">{rev.commitMessage}</span>
              </div>
              <span className="text-[#888]">{new Date(rev.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
