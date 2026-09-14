import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Rss, Share2 } from 'lucide-react';
import { ControlDeckButton } from '../components/ControlDeckButton';
import { getTheme02StoreData, Theme02Article } from '../utils/theme02DataAdapter';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [adminData] = useState(() => getTheme02StoreData());

  const article = adminData.articles.find((a: Theme02Article) => a.slug === slug || a.id === slug);

  if (!article) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 text-center font-mono bg-[#0A0D10] text-[#C9D1D9]">
        <div className="text-[#FF4D4D] text-lg font-bold mb-2">[DISPATCH_NOT_FOUND]</div>
        <p className="text-xs text-[#8B949E] mb-4">
          NO SPECIFIED ARTICLE EXISTS WITH IDENTIFIER "{slug}".
        </p>
        <Link to="/blog">
          <ControlDeckButton variant="amber" size="sm">
            RETURN TO INTELLIGENCE FEED
          </ControlDeckButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0D10] text-[#C9D1D9] font-mono py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      {/* Top Telemetry */}
      <div className="flex items-center justify-between border-b border-[#30363D] pb-3 text-xs">
        <Link
          to="/blog"
          className="flex items-center gap-1.5 text-[#8B949E] hover:text-[#FF9F1C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO FEED</span>
        </Link>
        <div className="flex items-center gap-2">
          <Rss className="w-4 h-4 text-[#FF9F1C]" />
          <span className="text-[#FF9F1C] font-bold">DISPATCH // {article.slug}</span>
        </div>
      </div>

      {/* Article Telemetry Header */}
      <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-sm space-y-4">
        <div className="flex items-center justify-between text-xs text-[#8B949E] border-b border-[#30363D] pb-2">
          <span>PUBLISHED: {article.date}</span>
          <div className="flex items-center gap-1 text-[#C9D1D9]">
            <Clock className="w-3.5 h-3.5 text-[#FF9F1C]" />
            <span>EST READ: {article.readTime}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          {article.title}
        </h1>

        <div className="p-3 bg-[#0A0D10] border-l-2 border-[#FF9F1C] text-xs text-[#8B949E] italic">
          "{article.excerpt}"
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Tag className="w-3.5 h-3.5 text-[#8B949E]" />
          {article.tags.map((t: string, i: number) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs bg-[#0A0D10] border border-[#30363D] text-[#FF9F1C]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Article Body */}
      <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-sm space-y-4 text-xs sm:text-sm text-[#C9D1D9] leading-relaxed">
        <div className="whitespace-pre-line space-y-4">{article.content}</div>

        <div className="pt-6 border-t border-[#30363D] flex items-center justify-between text-xs text-[#8B949E]">
          <span>END TRANSMISSION // DISPATCH #{article.id}</span>
          <ControlDeckButton
            variant="ghost"
            size="sm"
            icon={<Share2 className="w-3.5 h-3.5" />}
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('Dispatch URL copied to clipboard');
            }}
          >
            SHARE DISPATCH
          </ControlDeckButton>
        </div>
      </div>
    </div>
  );
};
