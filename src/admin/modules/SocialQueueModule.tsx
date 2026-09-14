import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { TelegramApprovalModal } from '../components/TelegramApprovalModal';
import { loadAdminStore, saveAdminStore } from '../store/adminStore';
import { SocialPost } from '../types/admin-types';
import { Share2, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

export const SocialQueueModule: React.FC = () => {
  const [store, setStore] = useState(() => loadAdminStore());
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

  const handleApproveDispatch = (post: SocialPost, isSimulated: boolean) => {
    const updatedQueue = store.socialQueue.map((item) => {
      if (item.id === post.id) {
        return {
          ...item,
          status: (isSimulated ? 'Simulated' : 'Dispatched') as SocialPost['status'],
        };
      }
      return item;
    });

    store.socialQueue = updatedQueue;
    saveAdminStore(store);
    setStore({ ...store });
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Social Syndication Queue & Approval"
        subtitle="Outbox queue with Telegram approval modal and server-backed broadcast execution"
        status="active"
      />

      <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-base font-bold text-[#1a1a1a] flex items-center gap-2">
            <Share2 size={18} className="text-[#10b981]" />
            <span>Social Outbox Queue ({store.socialQueue.length})</span>
          </h2>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {store.socialQueue.map((post) => (
            <div
              key={post.id}
              className="bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold uppercase px-2 py-0.5 rounded bg-[#dcdcdc] text-[#1a1a1a]">
                    {post.platform}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 ${
                      post.status === 'Dispatched'
                        ? 'bg-green-100 text-green-800'
                        : post.status === 'Simulated'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {post.status === 'Simulated' && <ShieldAlert size={12} />}
                    {post.status === 'Dispatched' && <CheckCircle2 size={12} />}
                    {post.status === 'Pending' && <Clock size={12} />}
                    <span>{post.status === 'Simulated' ? 'SIMULATED DISPATCH' : post.status}</span>
                  </span>
                </div>
                <p className="text-sm text-[#1a1a1a] font-sans">{post.content}</p>
                <div className="text-[#888] mt-1">Scheduled: {new Date(post.scheduledAt).toLocaleString()}</div>
              </div>

              {post.status === 'Pending' && (
                <button
                  onClick={() => setSelectedPost(post)}
                  className="bg-[#10b981] hover:bg-[#0d9668] text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 size={14} /> Review & Approve
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <TelegramApprovalModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        onApproveDispatch={handleApproveDispatch}
      />
    </div>
  );
};
