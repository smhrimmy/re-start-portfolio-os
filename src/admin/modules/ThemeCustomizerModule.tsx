import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { loadAdminStore, saveAdminStore } from '../store/adminStore';
import { ThemeOverrideConfig } from '../types/admin-types';
import { Palette, Download, Upload, RefreshCw } from 'lucide-react';

export const ThemeCustomizerModule: React.FC = () => {
  const [store, setStore] = useState(() => loadAdminStore());
  const [config, setConfig] = useState<ThemeOverrideConfig>(store.themeOverrides);

  const handleSave = () => {
    store.themeOverrides = config;
    saveAdminStore(store);
    setStore({ ...store });
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-overrides-${config.activeThemeId}.json`;
    a.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setConfig(parsed);
        store.themeOverrides = parsed;
        saveAdminStore(store);
        setStore({ ...store });
      } catch (err) {
        console.error('Invalid theme override JSON file:', err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl">
      <LedMasthead
        title="Theme System Customizer"
        subtitle="Manage live CSS design token overrides and export theme configs"
        status="active"
      />

      <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#dcdcdc]">
          <h2 className="font-mono font-bold text-base text-[#1a1a1a] flex items-center gap-2">
            <Palette size={18} className="text-[#10b981]" />
            <span>Design Token Overrides</span>
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="bg-[#e0e0df] text-[#1a1a1a] font-mono font-bold text-xs px-3 py-1.5 rounded flex items-center gap-1 border border-[#d2d2d0]"
            >
              <Download size={14} /> Export JSON
            </button>
            <label className="bg-[#e0e0df] text-[#1a1a1a] font-mono font-bold text-xs px-3 py-1.5 rounded flex items-center gap-1 cursor-pointer border border-[#d2d2d0]">
              <Upload size={14} /> Import JSON
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div>
            <label className="block uppercase font-bold text-[#666] mb-1">Primary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={config.primaryColor}
                onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                className="bg-[#eaeaea] border border-[#dcdcdc] rounded px-3 py-2 text-sm text-[#1a1a1a] flex-1"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-[#666] mb-1">Surface Background Tint</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={config.surfaceColor}
                onChange={(e) => setConfig({ ...config, surfaceColor: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={config.surfaceColor}
                onChange={(e) => setConfig({ ...config, surfaceColor: e.target.value })}
                className="bg-[#eaeaea] border border-[#dcdcdc] rounded px-3 py-2 text-sm text-[#1a1a1a] flex-1"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-[#666] mb-1">Border Radius ({config.borderRadiusPx}px)</label>
            <input
              type="range"
              min="0"
              max="24"
              value={config.borderRadiusPx}
              onChange={(e) => setConfig({ ...config, borderRadiusPx: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-[#666] mb-1">Font Scale ({config.fontScale}x)</label>
            <input
              type="range"
              min="0.8"
              max="1.3"
              step="0.05"
              value={config.fontScale}
              onChange={(e) => setConfig({ ...config, fontScale: Number(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-[#10b981] text-white font-mono font-bold text-sm py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} /> Apply Live Theme Overrides
        </button>
      </div>
    </div>
  );
};
