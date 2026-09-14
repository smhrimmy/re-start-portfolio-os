import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { loadAdminStore } from '../store/adminStore';
import { Sparkles, Copy, Check, Send } from 'lucide-react';

export const AIWorkspaceModule: React.FC = () => {
  const [store] = useState(() => loadAdminStore());
  const [inputText, setInputText] = useState('');
  const [generatedResult, setGeneratedResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRunAI = (prompt: string) => {
    setGeneratedResult(`[AI Generated Response for: "${prompt}"]\n\nOptimized Output:\n${inputText || 'High-performance web architecture with hardware capability tiering and 60fps rendering optimization.'}`);
  };

  const handleCopyResult = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="AI Content Assistant & Prompt Tools"
        subtitle="AI-assisted draft expansion, bio optimization, and technical article outlines"
        status="active"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preset Prompts List */}
        <div className="lg:col-span-1 bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm space-y-3 font-mono text-xs">
          <h3 className="font-bold text-sm text-[#1a1a1a] flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-[#10b981]" />
            <span>Preset AI Prompts</span>
          </h3>

          {store.aiPrompts.map((p) => (
            <button
              key={p.id}
              onClick={() => handleRunAI(p.promptText)}
              className="w-full text-left p-3 rounded-lg bg-[#eaeaea] hover:bg-[#e0e0df] border border-[#dcdcdc] transition-colors"
            >
              <div className="font-bold text-[#1a1a1a]">{p.title}</div>
              <div className="text-[10px] text-[#666] line-clamp-2 mt-1">{p.promptText}</div>
            </button>
          ))}
        </div>

        {/* AI Workspace Canvas */}
        <div className="lg:col-span-2 space-y-6 font-mono text-xs">
          <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm space-y-3">
            <label className="block uppercase font-bold text-[#666]">Source Text / Context Input</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
              placeholder="Paste draft text to polish or expand..."
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg p-3 text-sm text-[#1a1a1a] font-sans"
            />

            <button
              onClick={() => handleRunAI('General Polish')}
              className="bg-[#10b981] text-white font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors flex items-center justify-center gap-2 w-full"
            >
              <Send size={14} /> Run AI Optimization
            </button>
          </div>

          {generatedResult && (
            <div className="bg-[#1a1a1a] border border-neutral-700 text-emerald-400 rounded-xl p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase text-xs flex items-center gap-1.5 text-white">
                  <Sparkles size={14} className="text-[#10b981]" /> AI Assistant Output
                </span>
                <button
                  onClick={handleCopyResult}
                  className="bg-neutral-800 text-white px-3 py-1 rounded text-xs hover:bg-neutral-700 flex items-center gap-1"
                >
                  {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>

              <pre className="whitespace-pre-wrap font-mono text-xs text-neutral-200 bg-neutral-900 p-4 rounded-lg border border-neutral-800">
                {generatedResult}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
