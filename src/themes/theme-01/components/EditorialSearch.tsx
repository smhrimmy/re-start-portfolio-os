import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { loadAdminStore } from '../../../admin/store/adminStore';

interface EditorialSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (slug: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const EditorialSearch: React.FC<EditorialSearchProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const store = loadAdminStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#F9F8F6] text-[#111111] flex flex-col p-6 sm:p-12 overflow-y-auto"
      >
        {/* Search Bar Header */}
        <div className="max-w-4xl w-full mx-auto flex justify-between items-center border-b border-[#111111] pb-4 mb-8">
          <div className="flex items-center gap-3 flex-1">
            <Search size={24} className="text-[#8B0000]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH PUBLICATION ARCHIVE (PROJECTS, ESSAYS, STACK)..."
              autoFocus
              className="w-full bg-transparent theme-01-display text-2xl sm:text-3xl font-bold border-none outline-none placeholder:text-[#999999]"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[#111111] hover:bg-[#111111] hover:text-[#F9F8F6] transition-colors ml-4"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results Index Surface */}
        <div className="max-w-4xl w-full mx-auto flex-1">
          <div className="font-mono text-xs text-[#666666] tracking-widest border-b border-[#E2E0D8] pb-2 mb-6">
            FOUND {filteredProjects.length + filteredArticles.length} ARCHIVAL ENTRIES
          </div>

          {/* Projects Results */}
          {filteredProjects.length > 0 && (
            <div className="mb-10">
              <span className="font-mono text-xs font-bold text-[#8B0000] tracking-wider block mb-4">
                CASE STUDIES ({filteredProjects.length})
              </span>
              <div className="space-y-3">
                {filteredProjects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      onSelectProject(proj.slug);
                      onClose();
                    }}
                    className="group cursor-pointer p-4 border border-[#E2E0D8] hover:border-[#111111] bg-white transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold text-[#8B0000]">0{idx + 1}</span>
                      <div>
                        <h4 className="theme-01-display text-lg font-bold group-hover:text-[#8B0000] transition-colors">
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

          {/* Articles Results */}
          {filteredArticles.length > 0 && (
            <div className="mb-10">
              <span className="font-mono text-xs font-bold text-[#8B0000] tracking-wider block mb-4">
                ESSAYS & WRITING ({filteredArticles.length})
              </span>
              <div className="space-y-3">
                {filteredArticles.map((art, idx) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art.slug);
                      onClose();
                    }}
                    className="group cursor-pointer p-4 border border-[#E2E0D8] hover:border-[#111111] bg-white transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold text-[#666666]">ARTICLE 0{idx + 1}</span>
                      <div>
                        <h4 className="theme-01-display text-lg font-bold group-hover:text-[#8B0000] transition-colors">
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

          {filteredProjects.length === 0 && filteredArticles.length === 0 && (
            <div className="text-center py-16 border border-dashed border-[#E2E0D8] bg-white p-8">
              <span className="font-mono text-xs text-[#8B0000] block mb-2">NO MATCHES FOUND</span>
              <h3 className="theme-01-display text-2xl font-bold mb-2">No Publication Entries Found</h3>
              <p className="text-xs text-[#666666] max-w-sm mx-auto">
                No archived case studies or essays matched your search query "{query}".
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
