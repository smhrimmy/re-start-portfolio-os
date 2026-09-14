import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Folder, FileText } from 'lucide-react';
import { getTheme02StoreData, Theme02Project, Theme02Article } from '../utils/theme02DataAdapter';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [adminData] = useState(() => getTheme02StoreData());

  useEffect(() => {
    setSearchParams(query ? { q: query } : {});
  }, [query, setSearchParams]);

  const projects = useMemo(() => {
    if (!query) return adminData.projects;
    return adminData.projects.filter(
      (p: Theme02Project) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tech.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
    );
  }, [adminData.projects, query]);

  const articles = useMemo(() => {
    if (!query) return adminData.articles;
    return adminData.articles.filter(
      (a: Theme02Article) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
    );
  }, [adminData.articles, query]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0D10] text-[#C9D1D9] font-mono py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Header Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363D] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-bold mb-1">
            <Search className="w-4 h-4" />
            <span>[SEARCH_ARCHIVE_ENGINE]</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            DEEP <span className="text-[#00F0FF]">SYSTEM</span> ARCHIVE SEARCH
          </h1>
        </div>
      </div>

      {/* Main Query Bar */}
      <div className="relative max-w-2xl">
        <Search className="w-4 h-4 text-[#00F0FF] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH PROJECTS, ARTICLES, TECH STACK, KEYWORDS..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#161B22] border border-[#00F0FF]/40 focus:border-[#00F0FF] text-sm text-[#C9D1D9] placeholder-[#8B949E] rounded-sm focus:outline-none"
        />
      </div>

      {/* Results Telemetry */}
      <div className="text-xs text-[#8B949E] border-b border-[#30363D] pb-2">
        QUERY PARAMETERS: "{query || 'ALL'}" — FOUND {projects.length} UNITS, {articles.length} DISPATCHES
      </div>

      {/* Projects Results */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5">
          <Folder className="w-4 h-4" />
          <span>PROJECT UNITS ({projects.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p: Theme02Project) => (
            <Link
              key={p.id}
              to={`/projects/${p.slug}`}
              className="p-4 bg-[#161B22] border border-[#30363D] hover:border-[#00F0FF]/50 rounded-sm transition-all group space-y-2"
            >
              <div className="flex items-center justify-between text-[10px] text-[#8B949E]">
                <span>ID: {p.id}</span>
                <span className="text-[#00F0FF]">{p.category}</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-[#8B949E] line-clamp-2">{p.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Articles Results */}
      <div className="space-y-3 pt-4">
        <h2 className="text-xs font-bold text-[#FF9F1C] uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-4 h-4" />
          <span>INTELLIGENCE DISPATCHES ({articles.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((a: Theme02Article) => (
            <Link
              key={a.id}
              to={`/blog/${a.slug}`}
              className="p-4 bg-[#161B22] border border-[#30363D] hover:border-[#FF9F1C]/50 rounded-sm transition-all group space-y-2"
            >
              <div className="flex items-center justify-between text-[10px] text-[#8B949E]">
                <span>{a.date}</span>
                <span className="text-[#FF9F1C]">{a.readTime}</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#FF9F1C] transition-colors">
                {a.title}
              </h3>
              <p className="text-xs text-[#8B949E] line-clamp-2">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
