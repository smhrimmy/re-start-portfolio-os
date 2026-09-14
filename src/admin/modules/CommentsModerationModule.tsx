import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { loadAdminStore, saveAdminStore } from '../store/adminStore';
import { CommentItem } from '../types/admin-types';
import { Check, ShieldAlert, Trash2 } from 'lucide-react';

export const CommentsModerationModule: React.FC = () => {
  const [store, setStore] = useState(() => loadAdminStore());
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Spam'>('All');

  const filteredComments = store.comments.filter((c) => (filter === 'All' ? true : c.status === filter));

  const updateStatus = (id: string, newStatus: CommentItem['status']) => {
    store.comments = store.comments.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    saveAdminStore(store);
    setStore({ ...store });
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Comments & Content Moderation Queue"
        subtitle="Approve blog reader comments, mark spam, and filter community interactions"
        status="active"
      />

      {/* Filter Header */}
      <div className="flex items-center gap-2 mb-6 bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-3 font-mono text-xs shadow-sm">
        <span className="font-bold text-[#666] uppercase mr-2">Status Filter:</span>
        {['All', 'Pending', 'Approved', 'Spam'].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st as typeof filter)}
            className={`px-3 py-1.5 rounded transition-colors ${
              filter === st ? 'bg-[#10b981] text-white font-bold' : 'bg-[#e0e0df] text-[#1a1a1a] hover:bg-[#d5d5d4]'
            }`}
          >
            {st} ({st === 'All' ? store.comments.length : store.comments.filter((c) => c.status === st).length})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredComments.map((com) => (
          <div key={com.id} className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-5 shadow-sm font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-[#dcdcdc]">
              <div>
                <span className="font-bold text-[#1a1a1a] text-sm">{com.authorName}</span>
                <span className="text-[#666] text-xs ml-2">({com.authorEmail})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#888]">{new Date(com.createdAt).toLocaleString()}</span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    com.status === 'Approved'
                      ? 'bg-green-100 text-green-800'
                      : com.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {com.status}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-[#888] mb-2">On Article: <span className="text-[#1a1a1a] font-bold">{com.articleTitle}</span></div>
            <p className="text-sm font-sans text-[#1a1a1a] mb-4 bg-[#eaeaea] p-3 rounded border border-[#dcdcdc]">{com.content}</p>

            <div className="flex items-center justify-end gap-2">
              {com.status !== 'Approved' && (
                <button
                  onClick={() => updateStatus(com.id, 'Approved')}
                  className="bg-[#10b981] text-white font-bold text-xs px-3 py-1.5 rounded flex items-center gap-1 hover:bg-[#0d9668]"
                >
                  <Check size={14} /> Approve
                </button>
              )}
              {com.status !== 'Spam' && (
                <button
                  onClick={() => updateStatus(com.id, 'Spam')}
                  className="bg-amber-600 text-white font-bold text-xs px-3 py-1.5 rounded flex items-center gap-1 hover:bg-amber-700"
                >
                  <ShieldAlert size={14} /> Mark Spam
                </button>
              )}
              <button
                onClick={() => updateStatus(com.id, 'Trash')}
                className="bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded flex items-center gap-1 hover:bg-red-700"
              >
                <Trash2 size={14} /> Trash
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
