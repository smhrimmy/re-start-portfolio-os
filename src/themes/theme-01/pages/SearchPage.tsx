import React, { useState } from 'react';
import { loadAdminStore } from '../../../admin/store/adminStore';
import { Search, ArrowRight } from 'lucide-react';

interface SearchPageProps {
  onNavigate: (tab: string, slug?: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const store = loadAdminStore();

  const filteredProjects = store.projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tagline.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredArticles = store.articles.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.summary.toLowerCase().includes(query.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="border-b border-[#111111] pb-6 mb-10">
        <span className="font-mono text-xs text-[#8B0000] tracking-widest uppercase mb-2 block">
          SEARCH ARCHIVE // DEDICATED SEARCH SURFACE
        </span>
        <h1 className="theme-01-display text-4xl sm:text-5xl font-bold tracking-tight text-[#111111] mb-6">
          Publication Search Index
        </h1>

        <div className="flex items-center gap-3 bg-white border border-[#111111] p-4 shadow-sm">
          <Search size={20} className="text-[#8B0000]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type keywords to filter case studies, articles, and competencies..."
            className="w-full bg-transparent font-mono text-sm text-[#111111] outline-none placeholder:text-[#999999]"
          />
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-10">
        <div className="font-mono text-xs text-[#666666] tracking-widest border-b border-[#E2E0D8] pb-2">
          QUERY RESULTS // {filteredProjects.length + filteredArticles.length} ENTRIES MATCHED
        </div>

        {/* Projects Section */}
        {filteredProjects.length > 0 && (
          <div>
            <span className="font-mono text-xs font-bold text-[#8B0000] tracking-wider block mb-4">
              CASE STUDIES ({filteredProjects.length})
            </span>
            <div className="space-y-3">
              {filteredProjects.map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => onNavigate('projects', proj.slug)}
                  className="group cursor-pointer p-5 bg-white border border-[#E2E0D8] hover:border-[#111111] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-[#8B0000]">0{idx + 1}</span>
                    <div>
                      <h4 className="theme-01-display text-xl font-bold group-hover:text-[#8B0000] transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-[#666666]">{proj.tagline}</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articles Section */}
        {filteredArticles.length > 0 && (
          <div>
            <span className="font-mono text-xs font-bold text-[#8B0000] tracking-wider block mb-4">
              ESSAYS & ARTICLES ({filteredArticles.length})
            </span>
            <div className="space-y-3">
              {filteredArticles.map((art, idx) => (
                <div
                  key={art.id}
                  onClick={() => onNavigate('blog', art.slug)}
                  className="group cursor-pointer p-5 bg-white border border-[#E2E0D8] hover:border-[#111111] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-[#666666]">ARTICLE 0{idx + 1}</span>
                    <div>
                      <h4 className="theme-01-display text-xl font-bold group-hover:text-[#8B0000] transition-colors">
                        {art.title}
                      </h4>
                      <p className="text-xs text-[#666666]">{art.summary}</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
