import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { AdminDialog } from '../components/primitives/AdminDialog';
import { AdminFormError } from '../components/ui/AdminFormError';
import { loadAdminStore, saveAdminStore, addRevisionCommit } from '../store/adminStore';
import { ProjectItem } from '../types/admin-types';
import { Plus, Search, ExternalLink, Github, Eye, Star } from 'lucide-react';

export const ProjectsModule: React.FC = () => {
  const [store, setStore] = useState(() => loadAdminStore());
  const [search, setSearch] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [formError, setFormError] = useState('');

  const filteredProjects = store.projects.filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Project title is required.');
      return;
    }
    if (!slug.trim()) {
      setFormError('Project slug is required.');
      return;
    }

    // Duplicate slug validation
    const duplicate = store.projects.find((p) => p.slug === slug);
    if (duplicate) {
      setFormError(`Duplicate slug '${slug}' already exists. Slugs must be unique.`);
      return;
    }

    setFormError('');

    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title,
      slug,
      tagline,
      description,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      repoUrl,
      liveUrl,
      starsCount: 0,
      viewsCount: 0,
      updatedAt: new Date().toISOString(),
    };

    const updatedProjects = [newProject, ...store.projects];
    store.projects = updatedProjects;

    // Log ContentRevision
    addRevisionCommit(
      store,
      'project',
      newProject.id,
      `Created project: ${newProject.title}`,
      {},
      newProject as unknown as Record<string, unknown>
    );

    saveAdminStore(store);
    setStore({ ...store });

    setIsEditorOpen(false);
    setTitle('');
    setSlug('');
    setTagline('');
    setDescription('');
    setTagsInput('');
    setRepoUrl('');
    setLiveUrl('');
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Projects & Showcase CMS"
        subtitle="Manage portfolio project entries, live URLs, and tech stack tags"
        status="active"
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-4 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg pl-9 pr-3 py-2 text-sm font-mono text-[#1a1a1a]"
          />
        </div>

        <button
          onClick={() => setIsEditorOpen(true)}
          className="w-full sm:w-auto bg-[#10b981] text-white font-mono font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} /> New Project Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-mono font-bold text-lg text-[#1a1a1a]">{proj.title}</h3>
                <span className="text-[10px] font-mono text-[#888]">/{proj.slug}</span>
              </div>
              <p className="text-xs font-mono text-[#10b981] mb-2">{proj.tagline}</p>
              <p className="text-sm text-[#666] font-sans mb-4">{proj.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono uppercase bg-[#e0e0df] px-2 py-0.5 rounded text-[#1a1a1a]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#dcdcdc] text-xs font-mono text-[#666]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Star size={14} className="text-amber-500" /> {proj.starsCount || 0}</span>
                <span className="flex items-center gap-1"><Eye size={14} className="text-blue-500" /> {proj.viewsCount || 0}</span>
              </div>

              <div className="flex items-center gap-3">
                {proj.repoUrl && (
                  <a href={proj.repoUrl} target="_blank" rel="noreferrer" className="hover:text-[#1a1a1a]">
                    <Github size={16} />
                  </a>
                )}
                {proj.liveUrl && (
                  <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-[#1a1a1a]">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminDialog isOpen={isEditorOpen} onOpenChange={setIsEditorOpen} title="Create Project Entry" description="Add a new project to your Portfolio OS CMS showcase.">
        <form onSubmit={handleSaveProject} className="space-y-4">
          <AdminFormError message={formError} />

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Portfolio OS"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Slug (Validated Unique)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="portfolio-os"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Autonomous multi-theme portfolio OS"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Markdown Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="# Project details..."
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-3 text-sm font-sans text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Tech Stack Tags (Comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="React, Three.js, TypeScript"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#10b981] text-white font-mono font-bold text-sm py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors"
          >
            Save Project & Record Revision
          </button>
        </form>
      </AdminDialog>
    </div>
  );
};
