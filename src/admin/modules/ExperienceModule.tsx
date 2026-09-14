import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { AdminDialog } from '../components/primitives/AdminDialog';
import { loadAdminStore, saveAdminStore, addRevisionCommit } from '../store/adminStore';
import { ExperienceItem } from '../types/admin-types';
import { Plus, Briefcase, Calendar, MapPin } from 'lucide-react';

export const ExperienceModule: React.FC = () => {
  const [store, setStore] = useState(() => loadAdminStore());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [period, setPeriod] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [techInput, setTechInput] = useState('');

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || !company.trim()) return;

    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role,
      company,
      period: period || '2024 - Present',
      location,
      description,
      technologies: techInput.split(',').map((t) => t.trim()).filter(Boolean),
    };

    store.experiences.unshift(newExp);

    addRevisionCommit(
      store,
      'experience',
      newExp.id,
      `Added experience role: ${newExp.role} at ${newExp.company}`,
      {},
      newExp as unknown as Record<string, unknown>
    );

    saveAdminStore(store);
    setStore({ ...store });

    setIsModalOpen(false);
    setRole('');
    setCompany('');
    setPeriod('');
    setLocation('');
    setDescription('');
    setTechInput('');
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Work Experience CMS"
        subtitle="Manage professional career history, roles, and tech stack tags"
        status="active"
      />

      <div className="flex items-center justify-between mb-8">
        <h2 className="font-mono text-base font-bold text-[#1a1a1a]">Career History ({store.experiences.length})</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#10b981] text-white font-mono font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Add Position
        </button>
      </div>

      <div className="space-y-4 font-sans">
        {store.experiences.map((exp) => (
          <div key={exp.id} className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-[#10b981]" />
                <h3 className="font-mono font-bold text-lg text-[#1a1a1a]">{exp.role}</h3>
                <span className="font-mono text-sm text-[#666]">@ {exp.company}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-[#888]">
                <span className="flex items-center gap-1"><Calendar size={14} /> {exp.period}</span>
                {exp.location && <span className="flex items-center gap-1"><MapPin size={14} /> {exp.location}</span>}
              </div>
            </div>

            <p className="text-sm text-[#666] mb-4">{exp.description}</p>

            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              {exp.technologies.map((tech, idx) => (
                <span key={idx} className="bg-[#e0e0df] text-[#1a1a1a] px-2 py-0.5 rounded uppercase font-bold">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AdminDialog isOpen={isModalOpen} onOpenChange={setIsModalOpen} title="Add Experience Entry" description="Add a new work history entry to your Portfolio CMS.">
        <form onSubmit={handleAddExperience} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block font-bold uppercase text-[#666] mb-1">Role Title</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Senior Frontend Architect"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#666] mb-1">Company / Organization</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="TechCorp Solutions"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase text-[#666] mb-1">Period</label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="2023 - Present"
                className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-[#666] mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase text-[#666] mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Responsibilities and achievements..."
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-3 text-sm font-sans text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#666] mb-1">Technologies (Comma-separated)</label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React, TypeScript, Three.js"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#10b981] text-white font-bold text-sm py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors"
          >
            Save Experience & Log Revision
          </button>
        </form>
      </AdminDialog>
    </div>
  );
};
