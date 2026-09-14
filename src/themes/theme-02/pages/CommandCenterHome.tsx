import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Layers,
  ArrowRight,
  Terminal,
  Cpu,
  Rss,
  Mail,
} from 'lucide-react';
import { HeroControlCore } from '../three/HeroControlCore';
import { ControlDeckButton } from '../components/ControlDeckButton';
import { SystemVerificationPopup } from '../loaders/SystemVerificationPopup';
import { getTheme02StoreData, Theme02Project, Theme02Article } from '../utils/theme02DataAdapter';

export const CommandCenterHome: React.FC = () => {
  const navigate = useNavigate();
  const [adminData] = useState(() => getTheme02StoreData());
  const [selectedProject, setSelectedProject] = useState<Theme02Project | null>(null);

  const featuredProjects = adminData.projects.slice(0, 3);
  const latestArticles = adminData.articles.slice(0, 2);

  const handleLaunchProject = (project: Theme02Project) => {
    setSelectedProject(project);
  };

  const handleConfirmLaunch = () => {
    if (selectedProject) {
      navigate(`/projects/${selectedProject.slug}`);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-[#0A0D10] text-[#C9D1D9] font-mono py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Background Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none" />

      {/* SECTION 1: HERO CONTROL CORE (1 Viewport Height Desktop) */}
      <section className="relative bg-[#161B22] border border-[#30363D] rounded-sm p-4 sm:p-6 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Telemetry Briefing */}
          <div className="lg:col-span-7 space-y-4 z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#00F0FF]/10 border border-[#00F0FF]/40 rounded-sm text-xs text-[#00F0FF]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span>CONTROL_DECK // OPERATIONAL</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                ENGINEERING <span className="text-[#00F0FF]">COMMAND</span> DECK
              </h1>
              <p className="text-xs sm:text-sm text-[#8B949E] leading-relaxed max-w-xl">
                High-performance fullstack systems, distributed cloud architecture, and AI-driven workflow engines designed with hardware-grade precision.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 max-w-md pt-1">
              <div className="p-2 bg-[#0A0D10] border border-[#30363D] rounded-sm">
                <div className="text-[10px] text-[#8B949E]">ACTIVE PROJECTS</div>
                <div className="text-lg font-bold text-[#00F0FF]">{adminData.projects.length} UNITS</div>
              </div>
              <div className="p-2 bg-[#0A0D10] border border-[#30363D] rounded-sm">
                <div className="text-[10px] text-[#8B949E]">SYSTEM UPTIME</div>
                <div className="text-lg font-bold text-[#FF9F1C]">99.98%</div>
              </div>
              <div className="p-2 bg-[#0A0D10] border border-[#30363D] rounded-sm">
                <div className="text-[10px] text-[#8B949E]">CORE STACK</div>
                <div className="text-lg font-bold text-white">TS / GO / PY</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ControlDeckButton
                variant="primary"
                size="md"
                icon={<Layers className="w-4 h-4" />}
                onClick={() => navigate('/projects')}
              >
                OPEN PROJECT DECK
              </ControlDeckButton>
              <ControlDeckButton
                variant="secondary"
                size="md"
                icon={<Mail className="w-4 h-4" />}
                onClick={() => navigate('/contact')}
              >
                TRANSMIT MESSAGE
              </ControlDeckButton>
            </div>
          </div>

          {/* Right Interactive 3D Control Core */}
          <div className="lg:col-span-5 relative h-64 sm:h-80 bg-[#0A0D10] border border-[#30363D] rounded-sm overflow-hidden flex items-center justify-center">
            <HeroControlCore />
          </div>
        </div>
      </section>

      {/* SECTION 2: TOP FEATURED PROJECT UNITS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#30363D] pb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#00F0FF]" />
            <h2 className="text-xs sm:text-sm font-bold uppercase text-[#00F0FF] tracking-wider">
              [PRIORITY_SYSTEM_DECK]
            </h2>
          </div>
          <Link
            to="/projects"
            className="text-xs text-[#8B949E] hover:text-[#00F0FF] flex items-center gap-1"
          >
            <span>VIEW ALL ({adminData.projects.length})</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProjects.map((project: Theme02Project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -3 }}
              className="bg-[#161B22] border border-[#30363D] hover:border-[#00F0FF]/50 p-4 rounded-sm flex flex-col justify-between space-y-3 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-[#8B949E] mb-1">
                  <span>ID: {project.id}</span>
                  <span className="text-[#00F0FF]">VERIFIED</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#00F0FF] transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-[#8B949E] line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tech.slice(0, 3).map((t: string, i: number) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 text-[10px] bg-[#0A0D10] border border-[#30363D] text-[#8B949E]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <ControlDeckButton
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => handleLaunchProject(project)}
                >
                  INSPECT UNIT
                </ControlDeckButton>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: INTELLIGENCE TICKER & QUICK PROFILE TELEMETRY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Intelligence Ticker */}
        <div className="lg:col-span-8 bg-[#161B22] border border-[#30363D] p-4 rounded-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#30363D] pb-2 text-xs">
            <div className="flex items-center gap-2">
              <Rss className="w-4 h-4 text-[#FF9F1C]" />
              <span className="font-bold text-[#FF9F1C]">[LIVE_INTELLIGENCE_FEED]</span>
            </div>
            <Link to="/blog" className="text-[#8B949E] hover:text-white">
              ALL ARTICLES
            </Link>
          </div>

          <div className="space-y-2">
            {latestArticles.map((article: Theme02Article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="block p-2.5 bg-[#0A0D10] border border-[#30363D] hover:border-[#FF9F1C]/40 rounded-sm transition-all group"
              >
                <div className="flex items-center justify-between text-[10px] text-[#8B949E] mb-1">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <div className="text-xs font-bold text-white group-hover:text-[#FF9F1C] transition-colors">
                  {article.title}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Profile Telemetry */}
        <div className="lg:col-span-4 bg-[#161B22] border border-[#30363D] p-4 rounded-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-[#30363D] pb-2 text-xs text-[#00F0FF] font-bold">
            <Terminal className="w-4 h-4" />
            <span>[OPERATOR_TELEMETRY]</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#8B949E]">ROLE:</span>
              <span className="text-white font-bold">STAFF SYSTEM ARCHITECT</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8B949E]">LOCATION:</span>
              <span className="text-white">MANGALORE, KARNATAKA, INDIA</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8B949E]">SECURITY:</span>
              <span className="text-[#00F0FF]">ENCRYPTED PROTOCOL</span>
            </div>
          </div>

          <Link to="/about" className="block pt-2">
            <ControlDeckButton variant="secondary" size="sm" className="w-full">
              VIEW PROFILE CONSOLE
            </ControlDeckButton>
          </Link>
        </div>
      </div>

      {/* System Verification Modal */}
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
