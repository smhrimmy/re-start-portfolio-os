import React, { useState, useEffect } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { AdminDialog } from '../components/primitives/AdminDialog';
import { AdminEmptyState } from '../components/ui/AdminEmptyState';
import { AdminFormError } from '../components/ui/AdminFormError';
import { AdminToast, ToastNotification } from '../components/primitives/AdminToast';
import { Plus, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export const ProjectCmsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [formError, setFormError] = useState('');

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Project title is required.');
      return;
    }
    if (!description.trim()) {
      setFormError('Project description is required.');
      return;
    }

    setFormError('');
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, tags, repoUrl, liveUrl }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setTitle('');
        setDescription('');
        setTagsInput('');
        setRepoUrl('');
        setLiveUrl('');
        fetchProjects();
        setToast({ id: Date.now().toString(), title: 'Project Created', description: 'Published to CMS database.', type: 'success' });
      }
    } catch (err) {
      console.error('Failed to save project:', err);
      setToast({ id: Date.now().toString(), title: 'Save Failed', description: 'Could not write project to server.', type: 'error' });
    }
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Project CMS Manager"
        subtitle="Manage portfolio showcase projects and metadata"
        status="active"
      />

      <div className="flex items-center justify-between mb-8">
        <h2 className="font-mono text-[#1a1a1a] font-bold text-lg">Project Inventory ({projects.length})</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#10b981] text-white font-mono font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <AdminEmptyState
          title="No Projects in CMS"
          description="Create your first portfolio project entry to populate showcase layouts across all 27 themes."
          actionLabel="Create Project"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-mono font-bold text-lg text-[#1a1a1a] mb-2">{proj.title}</h3>
                <p className="text-sm text-[#666] font-sans mb-4">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono uppercase bg-[#e0e0df] px-2 py-0.5 rounded text-[#1a1a1a]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-3 border-t border-[#dcdcdc] text-xs font-mono text-[#666]">
                {proj.repoUrl && (
                  <a href={proj.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#1a1a1a]">
                    <Github size={14} /> Code Repo
                  </a>
                )}
                {proj.liveUrl && (
                  <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#1a1a1a]">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Project Dialog */}
      <AdminDialog isOpen={isModalOpen} onOpenChange={setIsModalOpen} title="New Project Entry" description="Add a new project to your Portfolio OS CMS database.">
        <form onSubmit={handleCreateProject} className="space-y-4">
          <AdminFormError message={formError} />

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Portfolio OS"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Multi-theme portfolio system with device capability tiering..."
              rows={3}
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-3 text-sm font-sans text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="React, TypeScript, Three.js"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Repo URL</label>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Live URL</label>
              <input
                type="text"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://app.com"
                className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#10b981] text-white font-mono font-bold text-sm py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors mt-2"
          >
            Save Project to CMS
          </button>
        </form>
      </AdminDialog>

      <AdminToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};
