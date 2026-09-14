import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Folder, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { getTheme02StoreData, Theme02Project, Theme02Article } from '../utils/theme02DataAdapter';

interface ControlDeckSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ControlDeckSearch: React.FC<ControlDeckSearchProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [storeData, setStoreData] = useState(() => getTheme02StoreData());

  useEffect(() => {
    if (isOpen) {
      setStoreData(getTheme02StoreData());
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const projects = storeData.projects.filter(
    (p: Theme02Project) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tech.some((t: string) => t.toLowerCase().includes(query.toLowerCase())) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  const articles = storeData.articles.filter(
    (a: Theme02Article) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.tags.some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelectProject = (slug: string) => {
    onClose();
    navigate(`/projects/${slug}`);
  };

  const handleSelectArticle = (slug: string) => {
    onClose();
    navigate(`/blog/${slug}`);
  };

  const handleFullArchiveSearch = () => {
    onClose();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#0A0D10]/85 backdrop-blur-md font-mono">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="w-full max-w-xl bg-[#161B22] border border-[#00F0FF]/40 rounded-sm shadow-2xl overflow-hidden"
        >
          {/* Input Bar */}
          <div className="relative flex items-center px-4 py-3 border-b border-[#30363D] bg-[#0A0D10]/80">
            <Search className="w-4 h-4 text-[#00F0FF] mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH TELEMETRY, PROJECTS, ARTICLES..."
              className="w-full bg-transparent text-sm text-[#C9D1D9] placeholder-[#8B949E] focus:outline-none font-mono"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-[#8B949E] hover:text-white mr-2"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2 py-0.5 text-[10px] border border-[#30363D] text-[#8B949E] hover:text-white rounded"
            >
              ESC
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
            {/* Quick Filter Info */}
            <div className="flex items-center justify-between text-[11px] text-[#8B949E] border-b border-[#30363D] pb-2">
              <span>QUERY: "{query || 'ALL'}"</span>
              <span>
                MATCHES: {projects.length} PROJECTS, {articles.length} ARTICLES
              </span>
            </div>

            {/* Projects Section */}
            {projects.length > 0 && (
              <div>
                <div className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5" />
                  <span>PROJECTS ({projects.length})</span>
                </div>
                <div className="space-y-1">
                  {projects.map((p: Theme02Project) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectProject(p.slug)}
                      className="w-full text-left p-2.5 bg-[#0A0D10]/50 hover:bg-[#00F0FF]/10 border border-[#30363D] hover:border-[#00F0FF]/40 rounded-sm transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#C9D1D9] group-hover:text-[#00F0FF]">
                          {p.title}
                        </div>
                        <div className="text-[10px] text-[#8B949E] truncate max-w-md">
                          {p.tagline}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8B949E] group-hover:text-[#00F0FF] transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Articles Section */}
            {articles.length > 0 && (
              <div>
                <div className="text-[10px] font-bold text-[#FF9F1C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>ARTICLES ({articles.length})</span>
                </div>
                <div className="space-y-1">
                  {articles.map((a: Theme02Article) => (
                    <button
                      key={a.id}
                      onClick={() => handleSelectArticle(a.slug)}
                      className="w-full text-left p-2.5 bg-[#0A0D10]/50 hover:bg-[#FF9F1C]/10 border border-[#30363D] hover:border-[#FF9F1C]/40 rounded-sm transition-all flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#C9D1D9] group-hover:text-[#FF9F1C]">
                          {a.title}
                        </div>
                        <div className="text-[10px] text-[#8B949E]">
                          {a.readTime} • {a.tags.join(', ')}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8B949E] group-hover:text-[#FF9F1C] transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {projects.length === 0 && articles.length === 0 && (
              <div className="text-center py-8 text-xs text-[#8B949E]">
                NO SPECIFIED TELEMETRY MATCHED "{query}".
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="p-3 bg-[#0A0D10] border-t border-[#30363D] flex items-center justify-between text-xs">
            <button
              onClick={handleFullArchiveSearch}
              className="flex items-center gap-1.5 text-[#00F0FF] hover:underline text-[11px]"
            >
              <span>OPEN FULL ARCHIVE ENGINE</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
            <span className="text-[10px] text-[#8B949E]">PORTFOLIO_OS SEARCH MODULE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
