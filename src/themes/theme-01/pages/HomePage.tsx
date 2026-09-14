import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loadAdminStore } from '../../../admin/store/adminStore';
import { EditorialButton } from '../components/EditorialButton';
import { ProjectCheckingPopup } from '../loaders/ProjectCheckingPopup';
import { chapterSequentialContainer, chapterSequentialItem } from '../animations/editorialAnimations';
import { ArrowUpRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string, slug?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const store = loadAdminStore();
  const [checkingProject, setCheckingProject] = useState<{
    isOpen: boolean;
    number: string;
    title: string;
    slug: string;
  }>({ isOpen: false, number: '01', title: '', slug: '' });

  const handleOpenProject = (slug: string, idx: number, title: string) => {
    setCheckingProject({
      isOpen: true,
      number: `0${idx + 1}`,
      title,
      slug,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Section */}
      <motion.section
        variants={chapterSequentialContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-[#E2E0D8] pb-16 mb-16"
      >
        <motion.div variants={chapterSequentialItem} className="lg:col-span-8">
          <div className="font-mono text-xs text-[#8B0000] tracking-widest uppercase mb-3">
            ISSUE 01 · 2026 EDITION // SELECTED WORK
          </div>
          <h1 className="theme-01-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] leading-[1.08] mb-6">
            Prajwal DL <br />
            <span className="italic font-normal text-[#666666]">Systems Architect</span>
          </h1>
          <p className="text-base sm:text-lg text-[#444444] font-light leading-relaxed max-w-2xl mb-8">
            Specializing in high-performance web applications, cloud hosting migrations, and AI-native customer support orchestration platforms.
          </p>
          <div className="flex flex-wrap gap-4">
            <EditorialButton onClick={() => onNavigate('projects')} variant="primary">
              EXPLORE CASE STUDIES →
            </EditorialButton>
            <EditorialButton onClick={() => onNavigate('contact')} variant="outline">
              INITIATE INQUIRY
            </EditorialButton>
          </div>
        </motion.div>

        {/* Hero Publication Metadata Panel */}
        <motion.div variants={chapterSequentialItem} className="lg:col-span-4 bg-[#F2F0EB] p-6 border border-[#E2E0D8] flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] text-[#999999] tracking-widest block uppercase mb-2">
              PUBLICATION SPECIFICATIONS
            </span>
            <div className="space-y-3 font-mono text-xs text-[#111111] border-t border-[#E2E0D8] pt-3">
              <div className="flex justify-between">
                <span className="text-[#666666]">AUTHOR</span>
                <span className="font-bold">PRAJWAL DL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">LOCATION</span>
                <span className="font-bold">MANGALORE, KA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">TOTAL PROJECTS</span>
                <span className="font-bold">{store.projects.length} CASE STUDIES</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">ESSAYS</span>
                <span className="font-bold">{store.articles.length} ARTICLES</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#E2E0D8] font-mono text-[10px] text-[#666666]">
            CURATED DIGITAL EDITION // ALL SYSTEMS VERIFIED
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Projects Index Section */}
      <section className="mb-20">
        <div className="flex justify-between items-baseline border-b border-[#111111] pb-3 mb-8">
          <div>
            <span className="font-mono text-[10px] text-[#8B0000] tracking-widest uppercase">CHAPTER 01</span>
            <h2 className="theme-01-display text-3xl font-bold">Featured Production Systems</h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="font-mono text-xs font-bold text-[#111111] hover:text-[#8B0000] transition-colors"
          >
            VIEW ALL ({store.projects.length}) →
          </button>
        </div>

        <div className="space-y-4">
          {store.projects.slice(0, 4).map((project, idx) => (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project.slug, idx, project.title)}
              className="group cursor-pointer p-6 bg-white border border-[#E2E0D8] hover:border-[#111111] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-sm font-bold text-[#8B0000]">0{idx + 1}</span>
                <div>
                  <h3 className="theme-01-display text-2xl font-bold text-[#111111] group-hover:text-[#8B0000] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#666666] font-light mt-1 max-w-xl">{project.tagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-[#F2F0EB] text-[#444444] px-2 py-0.5 border border-[#E2E0D8]">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="text-[#111111] group-hover:text-[#8B0000] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Essays & Bio Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-[#E2E0D8] pt-16 mb-20">
        {/* Bio Editorial */}
        <div className="lg:col-span-5">
          <span className="font-mono text-[10px] text-[#8B0000] tracking-widest uppercase mb-2 block">CHAPTER 02</span>
          <h3 className="theme-01-display text-3xl font-bold mb-4">Architectural Philosophy</h3>
          <p className="text-sm text-[#444444] leading-relaxed mb-4">
            Building web systems demands strict performance engineering, resilient data pipelines, and clear typographic hierarchy.
          </p>
          <p className="text-sm text-[#444444] leading-relaxed mb-6">
            From managing high-throughput DNS migrations to orchestrating AI support agent systems, precision is paramount.
          </p>
          <EditorialButton onClick={() => onNavigate('experience')} variant="secondary">
            READ CAREER HISTORY →
          </EditorialButton>
        </div>

        {/* Essays List */}
        <div className="lg:col-span-7">
          <span className="font-mono text-[10px] text-[#8B0000] tracking-widest uppercase mb-2 block">CHAPTER 03</span>
          <h3 className="theme-01-display text-3xl font-bold mb-6">Latest Technical Essays</h3>
          <div className="space-y-6">
            {store.articles.slice(0, 2).map((article, idx) => {
              const category = article.tags[0] || 'ESSAY';
              return (
                <div
                  key={article.id}
                  onClick={() => onNavigate('blog', article.slug)}
                  className="group cursor-pointer p-6 bg-white border border-[#E2E0D8] hover:border-[#111111] transition-all"
                >
                  <div className="flex justify-between items-center font-mono text-[10px] text-[#666666] mb-2">
                    <span>ESSAY 0{idx + 1} // {category}</span>
                    <span>{article.readingTimeMinutes} MIN READ</span>
                  </div>
                  <h4 className="theme-01-display text-xl font-bold group-hover:text-[#8B0000] transition-colors mb-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#666666] line-clamp-2">{article.summary}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Checking Popup Loader */}
      <ProjectCheckingPopup
        isOpen={checkingProject.isOpen}
        projectNumber={checkingProject.number}
        projectName={checkingProject.title}
        category="PRODUCTION SYSTEM"
        year="2026"
        onComplete={() => {
          setCheckingProject((prev) => ({ ...prev, isOpen: false }));
          onNavigate('projects', checkingProject.slug);
        }}
      />
    </div>
  );
};
