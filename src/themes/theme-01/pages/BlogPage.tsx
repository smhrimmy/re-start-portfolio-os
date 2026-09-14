import React, { useState } from 'react';
import { loadAdminStore } from '../../../admin/store/adminStore';

interface BlogPageProps {
  onNavigate: (tab: string, slug?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const store = loadAdminStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', ...Array.from(new Set(store.articles.flatMap((a) => a.tags)))];

  const filteredArticles = selectedCategory === 'ALL'
    ? store.articles
    : store.articles.filter((a) => a.tags.includes(selectedCategory));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="border-b border-[#111111] pb-6 mb-10">
        <span className="font-mono text-xs text-[#8B0000] tracking-widest uppercase mb-2 block">
          CHAPTER 03 // ESSAYS & TECHNICAL WRITING
        </span>
        <h1 className="theme-01-display text-4xl sm:text-5xl font-bold tracking-tight text-[#111111]">
          Editorial Articles
        </h1>
        <p className="text-sm text-[#666666] mt-2 font-light max-w-xl">
          Deep dives into DNS management, React state architecture, zero-downtime hosting migrations, and performance.
        </p>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 mt-6 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 border transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#111111] text-[#F9F8F6] border-[#111111] font-bold'
                  : 'bg-white text-[#111111] border-[#E2E0D8] hover:border-[#111111]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Index */}
      <div className="space-y-8">
        {filteredArticles.map((article, idx) => {
          const category = article.tags[0] || 'GENERAL';
          const pubDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : '2026';
          return (
            <article
              key={article.id}
              onClick={() => onNavigate('blog', article.slug)}
              className="group cursor-pointer bg-white border border-[#E2E0D8] hover:border-[#111111] p-6 sm:p-8 transition-all"
            >
              <div className="flex justify-between items-center font-mono text-xs text-[#8B0000] mb-3">
                <span>ESSAY // 0{idx + 1} — {category}</span>
                <span className="text-[#666666] font-normal">{article.readingTimeMinutes} MIN READ</span>
              </div>

              <h2 className="theme-01-display text-2xl font-bold text-[#111111] group-hover:text-[#8B0000] transition-colors mb-3">
                {article.title}
              </h2>

              <p className="text-xs text-[#555555] font-light leading-relaxed mb-6">
                {article.summary}
              </p>

              <div className="pt-4 border-t border-[#E2E0D8] flex justify-between items-center font-mono text-xs text-[#111111]">
                <span className="group-hover:text-[#8B0000] font-bold flex items-center gap-1.5 transition-colors">
                  READ ARTICLE →
                </span>
                <span className="text-[#999999]">
                  {pubDate}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
