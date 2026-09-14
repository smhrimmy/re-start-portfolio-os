import React, { useState, useEffect } from 'react';
import { 
  Palette, Check, Eye, Columns, Sparkles, Filter, Undo2, 
  ExternalLink, Layers, Sliders, Star, AlertCircle, X, Maximize2
} from 'lucide-react';
import { THEME_MANIFESTS } from '@/data/initialThemes';
import { ThemeManifest, ThemeCategory, ThemeCapability } from '@/types/theme';
import { mockStorage } from '@/data/mockStorage';
import { ThemeSwitchLoader } from '@/components/loaders/ThemeSwitchLoader';

interface ThemeSelectorPageProps {
  onNavigate: (route: string) => void;
  onPreviewTheme: (themeId: string) => void;
}

export const ThemeSelectorPage: React.FC<ThemeSelectorPageProps> = ({ onNavigate, onPreviewTheme }) => {
  const [activeThemeId, setActiveThemeId] = useState(mockStorage.getActiveTheme());
  const [liveThemeId, setLiveThemeId] = useState(mockStorage.getLiveTheme());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCapability, setSelectedCapability] = useState<string>('All');
  
  // Compare mode
  const [compareMode, setCompareMode] = useState(false);
  const [compareThemeA, setCompareThemeA] = useState<string>('theme-01-minimal-editorial');
  const [compareThemeB, setCompareThemeB] = useState<string>('theme-02-brutalist');

  // Loading switch animation state
  const [switchingToTheme, setSwitchingToTheme] = useState<string | null>(null);

  // Undo state
  const [lastSwitchedFrom, setLastSwitchedFrom] = useState<string | null>(null);
  const [showUndoToast, setShowUndoToast] = useState(false);

  // Quick customize modal
  const [customizingManifest, setCustomizingManifest] = useState<ThemeManifest | null>(null);
  const [customAccent, setCustomAccent] = useState('#3b82f6');

  // Pinned / Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const raw = localStorage.getItem('pdl_favorite_themes');
    return raw ? JSON.parse(raw) : ['theme-01-minimal-editorial', 'theme-05-galaxy-cosmos-3d'];
  });

  const categories = ['All', 'Editorial', 'Brutalist', 'Cyber', 'OS / Retro', '3D / Spatial', 'Minimalist', 'Experimental'];
  const capabilities = ['All', '3D', 'High Contrast', 'Motion-Rich', 'Heavy Assets', 'Pointer-Intensive', 'Camera'];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('pdl_favorite_themes', JSON.stringify(updated));
  };

  const handleApplyTheme = (themeId: string, applyToLive: boolean = false) => {
    setLastSwitchedFrom(activeThemeId);
    setSwitchingToTheme(themeId);
    
    setTimeout(() => {
      mockStorage.setActiveTheme(themeId);
      if (applyToLive) {
        mockStorage.setLiveTheme(themeId);
        mockStorage.setSiteMode('live');
      } else {
        mockStorage.setSiteMode('draft');
      }
      setActiveThemeId(themeId);
      setSwitchingToTheme(null);
      setShowUndoToast(true);
      setTimeout(() => setShowUndoToast(false), 6000);
    }, 700);
  };

  const handleUndo = () => {
    if (lastSwitchedFrom) {
      mockStorage.setActiveTheme(lastSwitchedFrom);
      setActiveThemeId(lastSwitchedFrom);
      setShowUndoToast(false);
    }
  };

  const filteredThemes = THEME_MANIFESTS.filter(m => {
    const matchCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchCap = selectedCapability === 'All' || m.capabilities.includes(selectedCapability as any);
    return matchCat && matchCap;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-[#222222] font-sans pb-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ad314d]/10 text-[#ad314d] font-bold uppercase border border-[#ad314d]/20">
              STAGE ARCHITECTURE ENGINE · STRICT COMPONENT ISOLATION
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight flex items-center gap-2">
            <Palette className="w-6 h-6 text-[#ad314d]" /> Theme Selector & World Index
          </h1>
          <p className="text-xs text-[#55555e] mt-1">23 structurally distinct interactive architectures. Zero shared visual chrome or page shells.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all ${
              compareMode ? 'bg-[#ad314d] border-[#ad314d] text-white shadow-sm' : 'bg-white/80 border-black/10 text-gray-700 hover:text-black hover:bg-white shadow-sm'
            }`}
          >
            <Columns className="w-4 h-4" /> Compare Mode
          </button>
        </div>
      </div>

      {/* Compare Mode Split-Screen View */}
      {compareMode && (
        <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-2xl p-6 space-y-4 shadow-sm animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-black/8">
            <h3 className="text-sm font-bold text-[#1a1a1a] flex items-center gap-2">
              <Columns className="w-4 h-4 text-[#ad314d]" /> Side-by-Side Theme Structural Comparison
            </h3>
            <button onClick={() => setCompareMode(false)} className="text-[#55555e] hover:text-[#1a1a1a]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Theme A */}
            <div className="space-y-3 bg-white p-4 rounded-xl border border-[#dcdcdc]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-[#55555e]">Theme A:</label>
                <select
                  value={compareThemeA}
                  onChange={e => setCompareThemeA(e.target.value)}
                  className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-lg px-2 py-1 text-xs text-[#1a1a1a]"
                >
                  {THEME_MANIFESTS.map(m => (
                    <option key={m.id} value={m.id}>{m.number} · {m.name}</option>
                  ))}
                </select>
              </div>

              {(() => {
                const mA = THEME_MANIFESTS.find(m => m.id === compareThemeA)!;
                return (
                  <div className="text-xs space-y-2 font-mono text-[#333339]">
                    <p className="font-bold text-[#1a1a1a] text-sm">{mA.name} ({mA.category})</p>
                    <p className="text-[11px] text-[#55555e]">{mA.concept}</p>
                    <div className="pt-2 space-y-1 text-[11px]">
                      <div><span className="text-[#777780]">Layout:</span> {mA.layoutArchitecture}</div>
                      <div><span className="text-[#777780]">Nav:</span> {mA.navigationPattern}</div>
                      <div><span className="text-[#777780]">Grid:</span> {mA.gridSystem}</div>
                      <div><span className="text-[#777780]">Signature:</span> {mA.signatureInteraction}</div>
                      <div><span className="text-[#777780]">Motion:</span> {mA.motionModel}</div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Theme B */}
            <div className="space-y-3 bg-white p-4 rounded-xl border border-[#dcdcdc]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-[#55555e]">Theme B:</label>
                <select
                  value={compareThemeB}
                  onChange={e => setCompareThemeB(e.target.value)}
                  className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-lg px-2 py-1 text-xs text-[#1a1a1a]"
                >
                  {THEME_MANIFESTS.map(m => (
                    <option key={m.id} value={m.id}>{m.number} · {m.name}</option>
                  ))}
                </select>
              </div>

              {(() => {
                const mB = THEME_MANIFESTS.find(m => m.id === compareThemeB)!;
                return (
                  <div className="text-xs space-y-2 font-mono text-[#333339]">
                    <p className="font-bold text-[#1a1a1a] text-sm">{mB.name} ({mB.category})</p>
                    <p className="text-[11px] text-[#55555e]">{mB.concept}</p>
                    <div className="pt-2 space-y-1 text-[11px]">
                      <div><span className="text-[#777780]">Layout:</span> {mB.layoutArchitecture}</div>
                      <div><span className="text-[#777780]">Nav:</span> {mB.navigationPattern}</div>
                      <div><span className="text-[#777780]">Grid:</span> {mB.gridSystem}</div>
                      <div><span className="text-[#777780]">Signature:</span> {mB.signatureInteraction}</div>
                      <div><span className="text-[#777780]">Motion:</span> {mB.motionModel}</div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f4f4f3] p-3 rounded-2xl border border-[#dcdcdc] shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === c ? 'bg-[#1a1a1a] text-white shadow-2xs' : 'text-[#55555e] hover:text-[#1a1a1a] hover:bg-black/5'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#55555e] font-mono">Capability:</span>
          <select
            value={selectedCapability}
            onChange={e => setSelectedCapability(e.target.value)}
            className="bg-white border border-[#dcdcdc] rounded-xl px-3 py-1 text-xs text-[#1a1a1a] focus:outline-none"
          >
            {capabilities.map((cap, i) => (
              <option key={i} value={cap}>{cap}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Live Theme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThemes.map(manifest => {
          const isActive = activeThemeId === manifest.id;
          const isLive = liveThemeId === manifest.id;
          const isFav = favorites.includes(manifest.id);

          return (
            <div
              key={manifest.id}
              className={`rounded-2xl bg-[#f4f4f3] border overflow-hidden flex flex-col justify-between transition-all group ${
                isActive ? 'border-2 border-[#ad314d] shadow-md' : 'border-[#dcdcdc] hover:border-black/30 hover:shadow-sm'
              }`}
            >
              {/* Miniature Interactive Preview Container */}
              <div 
                onClick={() => onPreviewTheme(manifest.id)}
                className="relative h-48 w-full bg-[#eaeaeb] border-b border-[#dcdcdc] cursor-pointer overflow-hidden group/preview"
              >
                {/* Visual Representation of Theme's Unique Layout Style */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between select-none">
                  {/* Miniature Top Chrome / Nav Pattern */}
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold tracking-tighter" style={{ color: manifest.defaultTokens.accent }}>
                      {manifest.number} // {manifest.name.toUpperCase()}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/10 text-[#333339] font-bold">
                      {manifest.navigationPattern.split('+')[0]}
                    </span>
                  </div>

                  {/* Miniature Content Area Mock */}
                  <div className="space-y-2 py-2">
                    <div className="h-3 rounded w-3/4" style={{ backgroundColor: manifest.defaultTokens.accent, opacity: 0.85 }} />
                    <div className="h-2 rounded w-1/2 bg-black/20" />
                    <div className="grid grid-cols-3 gap-1.5 pt-2">
                      <div className="h-10 rounded bg-white border border-black/10" />
                      <div className="h-10 rounded bg-white border border-black/10" />
                      <div className="h-10 rounded bg-white border border-black/10" />
                    </div>
                  </div>

                  {/* Miniature Footer / Signature interaction note */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#55555e]">
                    <span className="truncate max-w-[180px]">{manifest.signatureInteraction}</span>
                    <span className="px-1.5 py-0.5 rounded bg-white border border-black/10 text-[#222228] font-bold">{manifest.performance}</span>
                  </div>
                </div>

                {/* Hover Overlay: "Try It Live" Full Preview */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center gap-2 opacity-0 group-hover/preview:opacity-100 transition-opacity">
                  <span className="px-3.5 py-1.5 rounded-full bg-white text-[#1a1a1a] font-bold text-xs flex items-center gap-1.5 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" /> Try It Live
                  </span>
                </div>

                {/* Badges & Favorite button */}
                <button
                  onClick={(e) => toggleFavorite(manifest.id, e)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/80 hover:bg-white text-[#1a1a1a] transition-colors z-10 border border-black/10 shadow-2xs"
                >
                  <Star className={`w-3.5 h-3.5 ${isFav ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}`} />
                </button>
              </div>

              {/* Card Metadata & Actions */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-[#1a1a1a] flex items-center gap-2">
                      {manifest.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {isActive && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ad314d]/10 text-[#ad314d] border border-[#ad314d]/20 font-bold">
                          ACTIVE
                        </span>
                      )}
                      {isLive && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-800 border border-emerald-500/20 font-bold">
                          LIVE
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#55555e] leading-relaxed line-clamp-2">{manifest.concept}</p>

                  {/* Capability badges */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {manifest.capabilities.map((cap, cIdx) => (
                      <span key={cIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#333339] border border-[#dcdcdc]">
                        {cap}
                      </span>
                    ))}
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      manifest.performance === 'Light' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                      manifest.performance === 'Moderate' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                      'bg-purple-50 text-purple-800 border-purple-200'
                    }`}>
                      {manifest.performance} Load
                    </span>
                  </div>
                </div>

                {/* Apply Flow Buttons */}
                <div className="pt-3 border-t border-black/8 flex items-center gap-2">
                  <button
                    onClick={() => handleApplyTheme(manifest.id, false)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      isActive 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default font-bold'
                        : 'bg-[#1a1a1a] hover:bg-[#333333] text-white'
                    }`}
                  >
                    {isActive ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : null}
                    {isActive ? 'Active (Draft)' : 'Set Active'}
                  </button>

                  <button
                    onClick={() => handleApplyTheme(manifest.id, true)}
                    title="Publish directly to Live"
                    className="px-3 py-2 bg-white hover:bg-[#f4f4f3] border border-[#dcdcdc] text-[#1a1a1a] rounded-xl text-xs font-semibold"
                  >
                    Make Live
                  </button>

                  <button
                    onClick={() => {
                      setCustomizingManifest(manifest);
                      setCustomAccent(manifest.defaultTokens.accent);
                    }}
                    title="Quick Customize Tokens"
                    className="p-2 bg-white hover:bg-[#f4f4f3] text-[#55555e] hover:text-[#1a1a1a] rounded-xl border border-[#dcdcdc]"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Undo Toast Float */}
      {showUndoToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a1a1a] border border-black/20 p-4 rounded-2xl shadow-2xl flex items-center gap-4 text-white animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium">Theme applied successfully!</span>
          </div>
          <button
            onClick={handleUndo}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
          >
            <Undo2 className="w-3.5 h-3.5" /> Undo
          </button>
        </div>
      )}

      {/* Quick Customize Modal */}
      {customizingManifest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#dcdcdc] rounded-2xl w-full max-w-md p-6 text-[#1a1a1a] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-black/8">
              <h3 className="text-sm font-bold text-[#1a1a1a]">Quick Customize: {customizingManifest.name}</h3>
              <button onClick={() => setCustomizingManifest(null)} className="text-[#55555e] hover:text-[#1a1a1a]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-xs font-mono text-[#55555e] block mb-2">Accent Color Token</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customAccent}
                  onChange={e => setCustomAccent(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-[#dcdcdc]"
                />
                <input
                  type="text"
                  value={customAccent}
                  onChange={e => setCustomAccent(e.target.value)}
                  className="flex-1 bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl px-3 py-2 text-xs font-mono text-[#1a1a1a] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setCustomizingManifest(null)}
                className="px-4 py-2 bg-[#f4f4f3] hover:bg-[#eaeaeb] border border-[#dcdcdc] rounded-xl text-xs text-[#1a1a1a]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Token override for ${customizingManifest.name} saved!`);
                  setCustomizingManifest(null);
                }}
                className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#333333] text-white rounded-xl text-xs font-semibold"
              >
                Save Overrides
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Theme Switch Loader Interstitial */}
      {switchingToTheme && (
        <ThemeSwitchLoader
          themeId={switchingToTheme}
          onComplete={() => setSwitchingToTheme(null)}
        />
      )}
    </div>
  );
};
