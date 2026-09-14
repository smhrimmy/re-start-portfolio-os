import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { loadAdminStore, saveAdminStore, addRevisionCommit } from '../store/adminStore';
import { FileText, Save, Download, Award, GraduationCap } from 'lucide-react';

export const ResumeModule: React.FC = () => {
  const [store, setStore] = useState(() => loadAdminStore());
  const [summary, setSummary] = useState(store.resumeConfig.summary);
  const [skillsInput, setSkillsInput] = useState(store.resumeConfig.skills.join(', '));
  const [pdfUrl, setPdfUrl] = useState(store.resumeConfig.resumePdfUrl || '');

  const handleSaveResume = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedConfig = {
      ...store.resumeConfig,
      summary,
      skills: skillsInput.split(',').map((s) => s.trim()).filter(Boolean),
      resumePdfUrl: pdfUrl,
    };

    const oldConfig = store.resumeConfig;
    store.resumeConfig = updatedConfig;

    addRevisionCommit(
      store,
      'resume',
      'resume-config',
      'Updated Resume summary and skill matrix',
      oldConfig as unknown as Record<string, unknown>,
      updatedConfig as unknown as Record<string, unknown>
    );

    saveAdminStore(store);
    setStore({ ...store });
  };

  return (
    <div className="max-w-4xl">
      <LedMasthead
        title="Resume & Skill Matrix CMS"
        subtitle="Manage professional bio summary, skills matrix, education, and CV download URL"
        status="active"
      />

      <form onSubmit={handleSaveResume} className="space-y-6 font-mono text-xs">
        <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-base text-[#1a1a1a] flex items-center gap-2">
            <FileText size={18} className="text-[#10b981]" />
            <span>Professional Summary & CV Link</span>
          </h2>

          <div>
            <label className="block uppercase font-bold text-[#666] mb-1">Bio Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-3 text-sm font-sans text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-[#666] mb-1">PDF Resume Download URL</label>
            <input
              type="text"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              placeholder="/assets/resume.pdf"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
            />
          </div>
        </div>

        <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-base text-[#1a1a1a]">Core Skills Matrix (Comma-separated)</h2>
          <input
            type="text"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a]"
          />
          <div className="flex flex-wrap gap-2 pt-2">
            {skillsInput.split(',').map((s, idx) => {
              const trimmed = s.trim();
              if (!trimmed) return null;
              return (
                <span key={idx} className="bg-[#e0e0df] text-[#1a1a1a] px-2.5 py-1 rounded text-xs font-bold uppercase">
                  {trimmed}
                </span>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-[#1a1a1a] flex items-center gap-2 mb-3">
              <GraduationCap size={18} className="text-[#10b981]" />
              <span>Education</span>
            </h3>
            {store.resumeConfig.education.map((edu, i) => (
              <div key={i} className="text-xs space-y-1">
                <div className="font-bold text-[#1a1a1a]">{edu.degree}</div>
                <div className="text-[#666]">{edu.institution} ({edu.year})</div>
              </div>
            ))}
          </div>

          <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-[#1a1a1a] flex items-center gap-2 mb-3">
              <Award size={18} className="text-[#10b981]" />
              <span>Certifications</span>
            </h3>
            {store.resumeConfig.certifications.map((cert, i) => (
              <div key={i} className="text-xs space-y-1">
                <div className="font-bold text-[#1a1a1a]">{cert.title}</div>
                <div className="text-[#666]">{cert.issuer} ({cert.date})</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {pdfUrl && (
            <a href={pdfUrl} target="_blank" rel="noreferrer" className="text-xs text-[#666] flex items-center gap-1 hover:text-[#1a1a1a]">
              <Download size={14} /> Preview Resume PDF
            </a>
          )}
          <button
            type="submit"
            className="bg-[#10b981] hover:bg-[#0d9668] text-white font-bold text-xs px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors ml-auto"
          >
            <Save size={16} /> Save Resume Config & Log Revision
          </button>
        </div>
      </form>
    </div>
  );
};
