import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { AdminDialog } from '../components/primitives/AdminDialog';
import { loadAdminStore, saveAdminStore, addRevisionCommit } from '../store/adminStore';
import { MediaAsset } from '../types/admin-types';
import { Image, Plus, Trash2, Copy, Check } from 'lucide-react';

export const MediaLibraryModule: React.FC = () => {
  const [store, setStore] = useState(() => loadAdminStore());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [assetName, setAssetName] = useState('');
  const [assetUrl, setAssetUrl] = useState('');
  const [assetType, setAssetType] = useState('image/webp');

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName.trim() || !assetUrl.trim()) return;

    const newAsset: MediaAsset = {
      id: `media-${Date.now()}`,
      name: assetName,
      url: assetUrl,
      type: assetType,
      sizeBytes: 150000,
      uploadedAt: new Date().toISOString(),
    };

    store.mediaAssets.unshift(newAsset);

    addRevisionCommit(
      store,
      'media',
      newAsset.id,
      `Added media asset: ${newAsset.name}`,
      {},
      newAsset as unknown as Record<string, unknown>
    );

    saveAdminStore(store);
    setStore({ ...store });

    setIsModalOpen(false);
    setAssetName('');
    setAssetUrl('');
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteMedia = (id: string) => {
    store.mediaAssets = store.mediaAssets.filter((m) => m.id !== id);
    saveAdminStore(store);
    setStore({ ...store });
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Media Library & Asset CMS"
        subtitle="Upload, store, and copy media asset URLs for project covers and blog images"
        status="active"
      />

      <div className="flex items-center justify-between mb-8">
        <h2 className="font-mono text-base font-bold text-[#1a1a1a]">Media Assets ({store.mediaAssets.length})</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#10b981] text-white font-mono font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Register Asset URL
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-mono text-xs">
        {store.mediaAssets.map((media) => (
          <div key={media.id} className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-full h-32 bg-[#eaeaea] rounded-lg mb-3 flex items-center justify-center text-[#888] overflow-hidden border border-[#dcdcdc]">
                {media.url.startsWith('http') || media.url.startsWith('/') ? (
                  <img src={media.url} alt={media.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                ) : (
                  <Image size={32} />
                )}
              </div>
              <div className="font-bold text-[#1a1a1a] truncate mb-1">{media.name}</div>
              <div className="text-[10px] text-[#666]">{media.type} • {(media.sizeBytes / 1024).toFixed(1)} KB</div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#dcdcdc] mt-3">
              <button
                onClick={() => handleCopyUrl(media.url, media.id)}
                className="bg-[#e0e0df] hover:bg-[#d5d5d4] text-[#1a1a1a] px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 border border-[#d2d2d0]"
              >
                {copiedId === media.id ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                <span>{copiedId === media.id ? 'Copied!' : 'Copy URL'}</span>
              </button>

              <button
                onClick={() => handleDeleteMedia(media.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AdminDialog isOpen={isModalOpen} onOpenChange={setIsModalOpen} title="Register Media Asset" description="Add a new image or asset URL to your Media Library.">
        <form onSubmit={handleAddMedia} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block font-bold uppercase text-[#666] mb-1">Asset Name</label>
            <input
              type="text"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              placeholder="hero-banner.webp"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#666] mb-1">Asset URL</label>
            <input
              type="text"
              value={assetUrl}
              onChange={(e) => setAssetUrl(e.target.value)}
              placeholder="/assets/hero-banner.webp or https://..."
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#666] mb-1">MIME Type</label>
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
            >
              <option value="image/webp">image/webp</option>
              <option value="image/png">image/png</option>
              <option value="image/jpeg">image/jpeg</option>
              <option value="application/pdf">application/pdf</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#10b981] text-white font-bold text-sm py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors"
          >
            Register Asset & Log Revision
          </button>
        </form>
      </AdminDialog>
    </div>
  );
};
