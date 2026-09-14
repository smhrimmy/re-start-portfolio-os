import React, { useState, useEffect } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { Send, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface SocialPost {
  id: string;
  platform: 'linkedin' | 'x' | 'telegram';
  content: string;
  scheduledAt: string;
  status: 'queued' | 'processing' | 'published' | 'failed';
  errorMessage?: string;
}

export const SocialQueuePage: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [platform, setPlatform] = useState<'linkedin' | 'x' | 'telegram'>('telegram');
  const [content, setContent] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');

  const fetchSocialQueue = async () => {
    try {
      const response = await fetch('/api/social/queue');
      if (!response.ok) return;

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch social queue from backend:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialQueue();
    const intervalId = setInterval(fetchSocialQueue, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSchedulePost = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!content.trim()) return;

    try {
      const targetTime = scheduledAt ? new Date(scheduledAt).toISOString() : new Date().toISOString();
      const response = await fetch('/api/social/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          content,
          scheduledAt: targetTime,
        }),
      });

      if (!response.ok) return;

      setContent('');
      setScheduledAt('');
      fetchSocialQueue();
    } catch (error) {
      console.error('Failed to schedule social post:', error);
    }
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Social Automation Hub"
        subtitle="Real server-side background syndication queue for LinkedIn, X, and Telegram"
        status="active"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Post Schedule Form */}
        <div className="lg:col-span-1 bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm">
          <h2 className="font-mono text-lg font-bold mb-4 flex items-center gap-2">
            <Send size={18} className="text-[#10b981]" />
            <span>Schedule Post</span>
          </h2>

          <form onSubmit={handleSchedulePost} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as 'linkedin' | 'x' | 'telegram')}
                className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
              >
                <option value="telegram">Telegram Channel</option>
                <option value="linkedin">LinkedIn</option>
                <option value="x">X (Twitter)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write update message..."
                rows={4}
                className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-3 text-sm font-sans text-[#1a1a1a]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Schedule Time (Optional)</label>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#10b981] text-white font-mono font-bold text-sm py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors flex items-center justify-center gap-2"
            >
              <span>Queue Post to Server</span>
            </button>
          </form>
        </div>

        {/* Live Queue Display */}
        <div className="lg:col-span-2 bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm">
          <h2 className="font-mono text-lg font-bold mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock size={18} className="text-[#666]" />
              <span>Syndication Queue Status</span>
            </span>
            <span className="text-xs font-mono text-[#888]">{posts.length} Items</span>
          </h2>

          {isLoading ? (
            <p className="text-sm font-mono text-[#888]">Loading queue state...</p>
          ) : posts.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-[#ccc] rounded-lg">
              <p className="text-sm text-[#666] font-mono">No social posts currently queued.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#dcdcdc]">
                      {post.platform}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-mono">
                      {post.status === 'published' && <CheckCircle2 size={14} className="text-green-600" />}
                      {post.status === 'failed' && <AlertCircle size={14} className="text-red-600" />}
                      {post.status === 'queued' && <Clock size={14} className="text-amber-600" />}
                      <span className="capitalize">{post.status}</span>
                    </span>
                  </div>
                  <p className="text-sm text-[#1a1a1a]">{post.content}</p>
                  <div className="text-xs text-[#888] font-mono">Scheduled: {new Date(post.scheduledAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
