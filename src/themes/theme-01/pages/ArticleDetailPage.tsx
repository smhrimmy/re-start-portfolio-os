import React from 'react';
import { loadAdminStore } from '../../../admin/store/adminStore';
import { ArrowLeft } from 'lucide-react';

interface ArticleDetailPageProps {
  slug: string;
  onNavigate: (tab: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ slug, onNavigate }) => {
  const store = loadAdminStore();
  const article = store.articles.find((a) => a.slug === slug) || store.articles[0];
  const category = article.tags[0] || 'ESSAY';
  const pubDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : '2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('blog')}
        className="font-mono text-xs font-bold text-[#666666] hover:text-[#111111] flex items-center gap-2 mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> RETURN TO ESSAYS INDEX
      </button>

      {/* Article Header */}
      <header className="border-b border-[#111111] pb-8 mb-12">
        <div className="flex justify-between items-center font-mono text-xs text-[#8B0000] mb-3">
          <span>ESSAY // {category}</span>
          <span>{article.readingTimeMinutes} MIN READ</span>
        </div>
        <h1 className="theme-01-display text-3xl sm:text-5xl font-bold text-[#111111] leading-tight mb-4">
          {article.title}
        </h1>
        <p className="text-base text-[#555555] font-light leading-relaxed mb-6">
          {article.summary}
        </p>
        <div className="font-mono text-xs text-[#999999] pt-4 border-t border-[#E2E0D8]">
          PUBLISHED BY PRAJWAL DL ON {pubDate}
        </div>
      </header>

      {/* Article Body Content */}
      <main className="prose prose-neutral max-w-none text-[#222222] font-light leading-relaxed space-y-6 text-sm sm:text-base">
        {article.content ? (
          <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
        ) : (
          <>
            <p>
              In modern web applications, high performance and reliable infrastructure are foundational. Managing complex DNS record transitions, managing TTL values, and installing SSL certificates require systematic planning.
            </p>
            <h3 className="theme-01-display text-2xl font-bold text-[#111111] mt-8 mb-4">
              1. Planning the Migration Sequence
            </h3>
            <p>
              Before modifying active A or CNAME records, reduce TTL (Time To Live) to 300 seconds at least 24 hours prior. This ensures cached resolver records expire rapidly when IP updates are broadcast.
            </p>
            <h3 className="theme-01-display text-2xl font-bold text-[#111111] mt-8 mb-4">
              2. Zero-Downtime SSL Verification
            </h3>
            <p>
              Provision SSL certificates on target servers using ACME HTTP-01 challenges or DNS TXT records before cutting over traffic to avoid security warning breaks for active users.
            </p>
          </>
        )}
      </main>

      {/* Article Footer */}
      <footer className="mt-16 border-t border-[#111111] pt-8 flex justify-between items-center font-mono text-xs text-[#666666]">
        <span>PORTFOLIO OS // EDITORIAL EDITION</span>
        <button
          onClick={() => onNavigate('blog')}
          className="font-bold text-[#111111] hover:text-[#8B0000] underline"
        >
          BACK TO ALL ARTICLES →
        </button>
      </footer>
    </div>
  );
};
