import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Cpu,
  Layers,
  Activity,
  CheckCircle,
  Maximize2,
  FileCode,
} from 'lucide-react';
import { ControlDeckButton } from '../components/ControlDeckButton';
import { ControlDeckLightbox } from '../components/ControlDeckLightbox';
import { getTheme02StoreData, Theme02Project } from '../utils/theme02DataAdapter';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [adminData] = useState(() => getTheme02StoreData());
  const [activeChapter, setActiveChapter] = useState<string>('01 OVERVIEW');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const project = adminData.projects.find((p: Theme02Project) => p.slug === slug || p.id === slug);

  if (!project) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 text-center font-mono bg-[#0A0D10] text-[#C9D1D9]">
        <div className="text-[#FF4D4D] text-lg font-bold mb-2">[PROJECT_NOT_FOUND]</div>
        <p className="text-xs text-[#8B949E] mb-4">
          NO SPECIFIED UNIT EXISTS WITH IDENTIFIER "{slug}".
        </p>
        <Link to="/projects">
          <ControlDeckButton variant="primary" size="sm">
            RETURN TO PROJECT DECK
          </ControlDeckButton>
        </Link>
      </div>
    );
  }

  const chapters = [
    '01 OVERVIEW',
    '02 ARCHITECTURE',
    '03 METRICS',
    '04 GALLERY',
    '05 RESULT',
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0D10] text-[#C9D1D9] font-mono py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Top Telemetry & Navigation */}
      <div className="flex items-center justify-between border-b border-[#30363D] pb-3 text-xs">
        <Link
          to="/projects"
          className="flex items-center gap-1.5 text-[#8B949E] hover:text-[#00F0FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO DECK</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
          <span className="text-[#00F0FF] font-bold">UNIT_INSPECTION // {project.slug}</span>
        </div>
      </div>

      {/* Main Project Specification Header */}
      <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363D] pb-4">
          <div>
            <div className="text-[10px] text-[#00F0FF] font-bold uppercase tracking-wider mb-1">
              CATEGORY: {project.category}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">{project.title}</h1>
            <p className="text-xs sm:text-sm text-[#8B949E] mt-1 max-w-2xl">{project.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ControlDeckButton
                  variant="primary"
                  size="sm"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  LIVE SYSTEM
                </ControlDeckButton>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <ControlDeckButton
                  variant="secondary"
                  size="sm"
                  icon={<Github className="w-3.5 h-3.5" />}
                >
                  SOURCE CODE
                </ControlDeckButton>
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack Telemetry Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-[#8B949E] mr-2">TECH_STACK:</span>
          {project.tech.map((t: string, i: number) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs bg-[#0A0D10] border border-[#30363D] text-[#00F0FF]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Chapter Viewport Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-[#30363D] pb-2">
        {chapters.map((ch) => (
          <button
            key={ch}
            onClick={() => setActiveChapter(ch)}
            className={`px-4 py-2 text-xs rounded-sm whitespace-nowrap transition-all border ${
              activeChapter === ch
                ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] font-bold'
                : 'bg-[#161B22] border-[#30363D] text-[#8B949E] hover:text-white'
            }`}
          >
            [{ch}]
          </button>
        ))}
      </div>

      {/* Chapter Content Viewport */}
      <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-sm min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeChapter === '01 OVERVIEW' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-xs sm:text-sm text-[#C9D1D9] leading-relaxed"
            >
              <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#00F0FF]" />
                [SYSTEM_DESCRIPTION]
              </h3>
              <p>{project.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#30363D]">
                <div className="p-4 bg-[#0A0D10] border border-[#30363D] rounded-sm space-y-2">
                  <div className="text-xs font-bold text-[#FF9F1C]">[THE_CHALLENGE]</div>
                  <p className="text-xs text-[#8B949E]">{project.problem}</p>
                </div>
                <div className="p-4 bg-[#0A0D10] border border-[#30363D] rounded-sm space-y-2">
                  <div className="text-xs font-bold text-[#00F0FF]">[THE_SOLUTION]</div>
                  <p className="text-xs text-[#8B949E]">{project.solution}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeChapter === '02 ARCHITECTURE' && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-xs sm:text-sm text-[#C9D1D9]"
            >
              <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00F0FF]" />
                [ARCHITECTURAL_BLUEPRINT]
              </h3>
              <p className="text-xs text-[#8B949E]">{project.architecture}</p>

              {/* Highlights */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-[#00F0FF]">CORE HIGHLIGHTS:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.highlights?.map((h: string, i: number) => (
                    <div
                      key={i}
                      className="p-3 bg-[#0A0D10] border border-[#30363D] flex items-start gap-2 text-xs"
                    >
                      <CheckCircle className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeChapter === '03 METRICS' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#FF9F1C]" />
                [PERFORMANCE_TELEMETRY_METRICS]
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {project.metrics?.map((m: { key: string; val: string }, i: number) => (
                  <div
                    key={i}
                    className="p-4 bg-[#0A0D10] border border-[#30363D] rounded-sm text-center space-y-1"
                  >
                    <div className="text-xs text-[#8B949E] uppercase">{m.key}</div>
                    <div className="text-2xl font-extrabold text-[#00F0FF]">{m.val}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeChapter === '04 GALLERY' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00F0FF]" />
                [VISUAL_ASSETS_GALLERY]
              </h3>

              {project.screenshots && project.screenshots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.screenshots.map((img: string, i: number) => (
                    <div
                      key={i}
                      onClick={() => setLightboxImage(img)}
                      className="group relative border border-[#30363D] bg-[#0A0D10] overflow-hidden rounded-sm cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={`Screenshot ${i + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-[#0A0D10]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-xs text-[#00F0FF] font-bold gap-2">
                        <Maximize2 className="w-4 h-4" />
                        <span>INSPECT ASSET</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 border border-[#30363D] bg-[#0A0D10] text-center text-xs text-[#8B949E]">
                  NO ADDITIONAL VISUAL ASSETS CAPTURED FOR THIS UNIT.
                </div>
              )}
            </motion.div>
          )}

          {activeChapter === '05 RESULT' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-xs sm:text-sm text-[#C9D1D9]"
            >
              <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#00F0FF]" />
                [SYSTEM_OUTCOME_&_BUSINESS_IMPACT]
              </h3>
              <p className="text-xs text-[#8B949E] leading-relaxed">{project.outcome}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <ControlDeckLightbox
        isOpen={!!lightboxImage}
        imageUrl={lightboxImage}
        caption={`ASSET INSPECTION: ${project.title}`}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
};
