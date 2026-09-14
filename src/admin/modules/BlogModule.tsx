import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { AdminDialog } from '../components/primitives/AdminDialog';
import { loadAdminStore, saveAdminStore, addRevisionCommit } from '../store/adminStore';
import { ArticleItem } from '../types/admin-types';
import { Plus, BookOpen, Clock, FileText } from 'lucide-react';

export const BlogModule: React.FC = () => {
  const [store, setStore] = useState(() => loadAdminStore());
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Editor State
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'Draft' | 'Scheduled' | 'Published' | 'Archived'>('Draft');

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newArticle: ArticleItem = {
      id: `art-${Date.now()}`,
      title,
      slug,
      summary,
      content,
      status,
      tags: ['Engineering', 'Architecture'],
      readingTimeMinutes: readingTime,
      wordCount,
      updatedAt: new Date().toISOString(),
    };

    store.articles.unshift(newArticle);

    // Record ContentRevision
    addRevisionCommit(
      store,
      'blog',
      newArticle.id,
      `Created article draft: ${newArticle.title}`,
      {},
      newArticle as unknown as Record<string, unknown>
    );

    saveAdminStore(store);
    setStore({ ...store });

    setIsEditorOpen(false);
    setTitle('');
    setSummary('');
    setContent('');
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Blog & Article CMS"
        subtitle="Manage technical articles, markdown content, and OpenGraph SEO cards"
        status="active"
      />

      <div className="flex items-center justify-between mb-8">
        <h2 className="font-mono text-base font-bold text-[#1a1a1a]">Articles ({store.articles.length})</h2>
        <button
          onClick={() => setIsEditorOpen(true)}
          className="bg-[#10b981] text-white font-mono font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> New Article Draft
        </button>
      </div>

      <div className="space-y-4">
        {store.articles.map((art) => (
          <div key={art.id} className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    art.status === 'Published'
                      ? 'bg-green-100 text-green-800'
                      : art.status === 'Draft'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  {art.status}
                </span>
                <span className="text-xs font-mono text-[#888]">/{art.slug}</span>
              </div>
              <h3 className="font-mono font-bold text-base text-[#1a1a1a] mb-1">{art.title}</h3>
              <p className="text-xs text-[#666] font-sans max-w-2xl">{art.summary}</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-[#666]">
              <span className="flex items-center gap-1"><Clock size={14} /> {art.readingTimeMinutes} min read</span>
              <span className="flex items-center gap-1"><BookOpen size={14} /> {art.wordCount} words</span>
            </div>
          </div>
        ))}
      </div>

      <AdminDialog isOpen={isEditorOpen} onOpenChange={setIsEditorOpen} title="Markdown Article Editor" description="Write technical content with live reading time metrics.">
        <form onSubmit={handleSaveArticle} className="space-y-4 font-mono">
          <div>
            <label className="block text-xs font-bold uppercase text-[#666] mb-1">Article Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Designing a 27-Theme System"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#666] mb-1">Summary / SEO Description</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief abstract..."
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#666] mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Draft' | 'Scheduled' | 'Published' | 'Archived')}
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
            >
              <option value="Draft">Draft</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#666] mb-1">Markdown Body</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="# Article Heading..."
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-3 text-sm text-[#1a1a1a] font-mono"
            />
          </div>

          {/* OpenGraph Preview Card */}
          <div className="bg-[#e0e0df] border border-[#d2d2d0] rounded-lg p-3 font-sans text-xs">
            <div className="flex items-center gap-2 font-mono text-[10px] text-[#666] uppercase mb-1">
              <FileText size={12} /> OpenGraph SEO Card Preview
            </div>
            <div className="font-bold text-[#1a1a1a]">{title || 'Article Title'}</div>
            <div className="text-[#666] mt-0.5">{summary || 'Summary placeholder...'}</div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#10b981] text-white font-bold text-sm py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors"
          >
            Save Article Draft & Record Revision
          </button>
        </form>
      </AdminDialog>
    </div>
  );
};
