import React, { useState } from 'react';
import { SocialPost } from '../types/admin-types';
import { AdminDialog } from './primitives/AdminDialog';
import { Send, ShieldAlert } from 'lucide-react';

interface TelegramApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: SocialPost | null;
  onApproveDispatch: (post: SocialPost, isSimulated: boolean) => void;
}

export const TelegramApprovalModal: React.FC<TelegramApprovalModalProps> = ({
  isOpen,
  onClose,
  post,
  onApproveDispatch,
}) => {
  const [editedContent, setEditedContent] = useState('');

  if (!post) return null;

  const handleApprove = async () => {
    try {
      const res = await fetch('/api/social/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: post.platform,
          content: editedContent || post.content,
          scheduledAt: post.scheduledAt,
        }),
      });

      if (res.ok) {
        onApproveDispatch(post, false);
      } else {
        onApproveDispatch(post, true);
      }
    } catch {
      onApproveDispatch(post, true);
    }
    onClose();
  };

  return (
    <AdminDialog
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title="Social Queue — Approval & Syndication"
      description={`Review payload for ${post.platform.toUpperCase()} syndication`}
    >
      <div className="space-y-4 font-mono text-xs">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-900 flex items-start gap-2">
          <ShieldAlert size={16} className="shrink-0 text-amber-600 mt-0.5" />
          <span>
            If server backend API credentials are not configured, approval will transition post status to <strong>SIMULATED</strong> with an explicit UI tag.
          </span>
        </div>

        <div>
          <label className="block uppercase font-bold text-[#666] mb-1">Payload Content</label>
          <textarea
            value={editedContent || post.content}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={4}
            className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-3 text-sm text-[#1a1a1a] font-sans"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#dcdcdc]">
          <span className="text-[#888]">Scheduled: {new Date(post.scheduledAt).toLocaleString()}</span>
          <button
            onClick={handleApprove}
            className="bg-[#10b981] hover:bg-[#0d9668] text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Send size={14} /> Approve & Broadcast
          </button>
        </div>
      </div>
    </AdminDialog>
  );
};
