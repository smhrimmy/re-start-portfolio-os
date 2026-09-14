import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  Search,
  Grid,
  Box,
} from 'lucide-react';
import { ControlDeckButton } from '../components/ControlDeckButton';
import { SystemVerificationPopup } from '../loaders/SystemVerificationPopup';
import { deckCardPerspectiveVariants } from '../animations/controlDeckAnimations';
import { getTheme02StoreData, Theme02Project } from '../utils/theme02DataAdapter';

export const ProjectControlPage: React.FC = () => {
  const navigate = useNavigate();
  const [adminData] = useState(() => getTheme02StoreData());
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck');
  const [selectedProject, setSelectedProject] = useState<Theme02Project | null>(null);

  const categories = ['ALL', 'FULLSTACK', 'AI_ML', 'FINTECH', 'ENTERPRISE'];

  const filteredProjects = useMemo(() => {
    return adminData.projects.filter((p: Theme02Project) => {
      const matchCat =
        activeCategory === 'ALL' ||
        p.category.toUpperCase().includes(activeCategory) ||
        p.tech.some((t: string) => t.toUpperCase().includes(activeCategory));

      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [adminData.projects, activeCategory, searchQuery]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % Math.max(1, filteredProjects.length));
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? Math.max(0, filteredProjects.length - 1) : prev - 1
    );
  };

  const currentProject = filteredProjects[activeIndex] || filteredProjects[0];

  const handleConfirmLaunch = () => {
    if (selectedProject) {
      navigate(`/projects/${selectedProject.slug}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0D10] text-[#C9D1D9] font-mono py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Header Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363D] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-bold mb-1">
            <Layers className="w-4 h-4" />
            <span>[PROJECT_CONTROL_DECK]</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            SYSTEM <span className="text-[#00F0FF]">UNITS</span> CATALOG
          </h1>
        </div>

        {/* View Mode & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8B949E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveIndex(0);
              }}
              placeholder="FILTER UNITS..."
              className="pl-8 pr-3 py-1.5 bg-[#161B22] border border-[#30363D] focus:border-[#00F0FF] text-xs text-[#C9D1D9] placeholder-[#8B949E] rounded-sm focus:outline-none w-48"
            />
          </div>

          <div className="flex items-center bg-[#161B22] border border-[#30363D] p-0.5 rounded-sm">
            <button
              onClick={() => setViewMode('deck')}
              className={`p-1.5 text-xs flex items-center gap-1 ${
                viewMode === 'deck' ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-bold' : 'text-[#8B949E]'
              }`}
              title="3D Perspective Deck"
            >
              <Box className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D DECK</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 text-xs flex items-center gap-1 ${
                viewMode === 'grid' ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-bold' : 'text-[#8B949E]'
              }`}
              title="Grid Telemetry View"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GRID</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setActiveIndex(0);
            }}
            className={`px-3 py-1.5 text-xs rounded-sm whitespace-nowrap transition-all border ${
              activeCategory === cat
                ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] font-bold'
                : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:text-white'
            }`}
          >
            [{cat}]
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 border border-[#30363D] bg-[#161B22] text-[#8B949E] text-xs">
          NO SYSTEM UNITS MATCHED THE FILTER PARAMETERS.
        </div>
      ) : viewMode === 'deck' ? (
        /* 3D PERSPECTIVE CAROUSEL DECK */
        <div className="space-y-6">
          <div className="relative min-h-[420px] bg-[#161B22] border border-[#30363D] rounded-sm p-6 flex flex-col justify-between overflow-hidden">
            {/* Perspective Viewport Carousel */}
            <div className="relative h-64 flex items-center justify-center perspective-[1000px]">
              {filteredProjects.map((project: Theme02Project, index: number) => {
                const diff = index - activeIndex;
                let status: 'active' | 'left' | 'right' | 'hidden' = 'hidden';

                if (diff === 0) status = 'active';
                else if (diff === -1 || (diff === filteredProjects.length - 1 && activeIndex === 0))
                  status = 'left';
                else if (diff === 1 || (diff === -(filteredProjects.length - 1) && activeIndex === filteredProjects.length - 1))
                  status = 'right';

                if (status === 'hidden') return null;

                return (
                  <motion.div
                    key={project.id}
                    variants={deckCardPerspectiveVariants}
                    animate={status}
                    transition={{ duration: 0.4 }}
                    onClick={() => setActiveIndex(index)}
                    className={`absolute w-full max-w-lg p-5 bg-[#0A0D10] border rounded-sm shadow-2xl cursor-pointer ${
                      status === 'active'
                        ? 'border-[#00F0FF] z-20 shadow-[0_0_25px_rgba(0,240,255,0.2)]'
                        : 'border-[#30363D] opacity-60 z-10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#8B949E] mb-2 border-b border-[#30363D] pb-1">
                      <span>SYSTEM_UNIT // 0{index + 1}</span>
                      <span className="text-[#00F0FF]">{project.category.toUpperCase()}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#C9D1D9] mb-2">{project.title}</h3>
                    <p className="text-xs text-[#8B949E] line-clamp-3 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.map((t: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] bg-[#161B22] border border-[#30363D] text-[#8B949E]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {status === 'active' && (
                      <ControlDeckButton
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                      >
                        INSPECT UNIT SYSTEM ({project.slug})
                      </ControlDeckButton>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Deck Controls & Carousel Counters */}
            <div className="flex items-center justify-between border-t border-[#30363D] pt-4 z-30">
              <div className="flex items-center gap-2 text-xs text-[#8B949E]">
                <span>UNIT: {activeIndex + 1} OF {filteredProjects.length}</span>
                <span className="text-[#30363D]">|</span>
                <span className="text-[#00F0FF]">
                  {currentProject?.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 bg-[#0A0D10] border border-[#30363D] hover:border-[#00F0FF] text-[#C9D1D9] rounded-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 bg-[#0A0D10] border border-[#30363D] hover:border-[#00F0FF] text-[#C9D1D9] rounded-sm transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* GRID TELEMETRY VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project: Theme02Project) => (
            <div
              key={project.id}
              className="bg-[#161B22] border border-[#30363D] hover:border-[#00F0FF]/50 p-5 rounded-sm flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-[#8B949E] mb-2 border-b border-[#30363D] pb-1">
                  <span>ID: {project.id}</span>
                  <span className="text-[#00F0FF]">{project.category}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-xs text-[#8B949E] leading-relaxed mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((t: string, i: number) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 text-[10px] bg-[#0A0D10] border border-[#30363D] text-[#8B949E]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <ControlDeckButton
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => setSelectedProject(project)}
              >
                INSPECT UNIT
              </ControlDeckButton>
            </div>
          ))}
        </div>
      )}

      {/* System Verification Popup */}
      {selectedProject && (
        <SystemVerificationPopup
          isOpen={!!selectedProject}
          projectTitle={selectedProject.title}
          projectSlug={selectedProject.slug}
          techStack={selectedProject.tech}
          metrics={selectedProject.metrics?.map((m: { key: string; val: string }) => ({ label: m.key, value: m.val }))}
          onConfirm={handleConfirmLaunch}
          onCancel={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};
