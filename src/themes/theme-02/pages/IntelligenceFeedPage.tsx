import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Rss, Search, Tag, Clock, ArrowRight } from 'lucide-react';
import { getTheme02StoreData, Theme02Article } from '../utils/theme02DataAdapter';

export const IntelligenceFeedPage: React.FC = () => {
  const [adminData] = useState(() => getTheme02StoreData());
  const [activeTag, setActiveTag] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allTags = useMemo(() => {
    const set = new Set<string>();
    adminData.articles.forEach((a: Theme02Article) => a.tags.forEach((t: string) => set.add(t)));
    return ['ALL', ...Array.from(set)];
  }, [adminData.articles]);

  const filteredArticles = useMemo(() => {
    return adminData.articles.filter((a: Theme02Article) => {
      const matchTag = activeTag === 'ALL' || a.tags.includes(activeTag);
      const matchSearch =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTag && matchSearch;
    });
  }, [adminData.articles, activeTag, searchQuery]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0D10] text-[#C9D1D9] font-mono py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Header Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363D] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#FF9F1C] text-xs font-bold mb-1">
            <Rss className="w-4 h-4" />
            <span>[INTELLIGENCE_STREAM]</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            TECHNICAL <span className="text-[#FF9F1C]">INTELLIGENCE</span> FEED
          </h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#8B949E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH DISPATCHES..."
            className="pl-8 pr-3 py-1.5 bg-[#161B22] border border-[#30363D] focus:border-[#FF9F1C] text-xs text-[#C9D1D9] placeholder-[#8B949E] rounded-sm focus:outline-none w-56"
          />
        </div>
      </div>

      {/* Tag Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1.5 text-xs rounded-sm whitespace-nowrap transition-all border ${
              activeTag === tag
                ? 'bg-[#FF9F1C]/15 border-[#FF9F1C] text-[#FF9F1C] font-bold'
                : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:text-white'
            }`}
          >
            [{tag}]
          </button>
        ))}
      </div>

      {/* Article List Ticker Stream */}
      <div className="space-y-3">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 border border-[#30363D] bg-[#161B22] text-[#8B949E] text-xs">
            NO DISPATCHES MATCHED THE SEARCH FILTER.
          </div>
        ) : (
          filteredArticles.map((article: Theme02Article) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              className="block p-5 bg-[#161B22] border border-[#30363D] hover:border-[#FF9F1C]/50 rounded-sm transition-all group space-y-2"
            >
              <div className="flex items-center justify-between text-[10px] text-[#8B949E]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F1C]" />
                  <span>DISPATCH #{article.id}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1 text-[#C9D1D9]">
                  <Clock className="w-3 h-3 text-[#FF9F1C]" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-white group-hover:text-[#FF9F1C] transition-colors">
                {article.title}
              </h2>

              <p className="text-xs text-[#8B949E] line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#30363D]/60 text-xs">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-[#8B949E]" />
                  {article.tags.map((t: string, i: number) => (
                    <span key={i} className="text-[10px] text-[#8B949E] bg-[#0A0D10] px-1.5 py-0.5 border border-[#30363D]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-[#FF9F1C] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>READ DISPATCH</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
