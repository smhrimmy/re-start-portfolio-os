import React, { useState } from 'react';
import { loadAdminStore } from '../../../admin/store/adminStore';
import { ProjectCheckingPopup } from '../loaders/ProjectCheckingPopup';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (tab: string, slug?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const store = loadAdminStore();
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [checkingProject, setCheckingProject] = useState<{
    isOpen: boolean;
    number: string;
    title: string;
    slug: string;
  }>({ isOpen: false, number: '01', title: '', slug: '' });

  const allTags = ['ALL', ...Array.from(new Set(store.projects.flatMap((p) => p.tags)))];

  const filteredProjects = selectedTag === 'ALL'
    ? store.projects
    : store.projects.filter((p) => p.tags.includes(selectedTag));

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
      {/* Header */}
      <div className="border-b border-[#111111] pb-6 mb-10">
        <span className="font-mono text-xs text-[#8B0000] tracking-widest uppercase mb-2 block">
          CHAPTER 02 // PUBLICATION ARCHIVE
        </span>
        <h1 className="theme-01-display text-4xl sm:text-5xl font-bold tracking-tight text-[#111111]">
          Selected Works & Systems
        </h1>
        <p className="text-sm text-[#666666] mt-2 font-light max-w-xl">
          Comprehensive production engineering case studies, full stack platforms, and interactive applications.
        </p>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mt-6 font-mono text-xs">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 border transition-colors ${
                selectedTag === tag
                  ? 'bg-[#111111] text-[#F9F8F6] border-[#111111] font-bold'
                  : 'bg-white text-[#111111] border-[#E2E0D8] hover:border-[#111111]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="group bg-white border border-[#E2E0D8] hover:border-[#111111] p-6 sm:p-8 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center font-mono text-xs text-[#8B0000] mb-4">
                <span>PROJECT // 0{idx + 1}</span>
                <span className="text-[#666666] font-normal">{project.starsCount} STARS</span>
              </div>

              <h3
                onClick={() => handleOpenProject(project.slug, idx, project.title)}
                className="theme-01-display text-2xl font-bold text-[#111111] group-hover:text-[#8B0000] cursor-pointer transition-colors mb-3"
              >
                {project.title}
              </h3>

              <p className="text-xs text-[#555555] font-light leading-relaxed mb-6">
                {project.tagline}
              </p>

              <div className="flex flex-wrap gap-1.5 font-mono text-[10px] mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="bg-[#F2F0EB] text-[#444444] px-2 py-0.5 border border-[#E2E0D8]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E0D8] flex items-center justify-between font-mono text-xs">
              <button
                onClick={() => handleOpenProject(project.slug, idx, project.title)}
                className="font-bold text-[#111111] hover:text-[#8B0000] flex items-center gap-1.5 transition-colors"
              >
                CASE STUDY →
              </button>
              <div className="flex items-center gap-3 text-[#666666]">
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="hover:text-[#111111]">
                    <Github size={15} />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-[#111111]">
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Checking Popup Loader */}
      <ProjectCheckingPopup
        isOpen={checkingProject.isOpen}
        projectNumber={checkingProject.number}
        projectName={checkingProject.title}
        category="ARCHIVAL CASE STUDY"
        year="2026"
        onComplete={() => {
          setCheckingProject((prev) => ({ ...prev, isOpen: false }));
          onNavigate('projects', checkingProject.slug);
        }}
      />
    </div>
  );
};
