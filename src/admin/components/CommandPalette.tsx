import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Briefcase,
  FileUser,
  Image,
  BarChart3,
  Globe,
  MessageSquareQuote,
  MessageSquare,
  Award,
  Sparkles,
  GitCommit,
  Share2,
  Palette,
  ShieldCheck,
  X,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelectTab }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectTab('dashboard');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onSelectTab]);

  if (!isOpen) return null;

  const actions = [
    { id: 'dashboard', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects Showcase CMS', icon: FolderKanban },
    { id: 'blog', label: 'Blog & Article CMS', icon: FileText },
    { id: 'experience', label: 'Work Experience CMS', icon: Briefcase },
    { id: 'resume', label: 'Resume & Skill Matrix', icon: FileUser },
    { id: 'media', label: 'Media Library & Assets', icon: Image },
    { id: 'analytics', label: 'Analytics Suite', icon: BarChart3 },
    { id: 'seo', label: 'SEO Suite & Meta Audit', icon: Globe },
    { id: 'testimonials', label: 'Testimonials Manager', icon: MessageSquareQuote },
    { id: 'comments', label: 'Comments Moderation', icon: MessageSquare },
    { id: 'recruiter', label: 'Recruiter Mode', icon: Award },
    { id: 'ai', label: 'AI Workspace', icon: Sparkles },
    { id: 'revisions', label: 'Git Revision Engine', icon: GitCommit },
    { id: 'social', label: 'Social Syndication Hub', icon: Share2 },
    { id: 'themes', label: 'Theme OS Registry', icon: Palette },
    { id: 'audit', label: 'Audit Log & Utilities', icon: ShieldCheck },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-24 p-4 animate-fadeIn">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl shadow-2xl z-50 overflow-hidden font-mono">
        <div className="flex items-center justify-between border-b border-[#dcdcdc] px-4 py-2">
          <span className="text-xs uppercase font-bold text-[#666]">Admin OS Command Palette (Cmd+K)</span>
          <button onClick={onClose} className="text-[#888] hover:text-[#1a1a1a] p-1">
            <X size={16} />
          </button>
        </div>

        <Command className="p-2">
          <Command.Input
            placeholder="Type a command or module name..."
            className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm text-[#1a1a1a] focus:outline-none mb-2"
            autoFocus
          />
          <Command.List className="max-h-64 overflow-y-auto space-y-1">
            <Command.Empty className="p-4 text-center text-xs text-[#888]">No matching admin command found.</Command.Empty>
            {actions.map((act) => {
              const Icon = act.icon;
              return (
                <Command.Item
                  key={act.id}
                  onSelect={() => {
                    onSelectTab(act.id);
                    onClose();
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#1a1a1a] hover:bg-[#e0e0df] cursor-pointer transition-colors"
                >
                  <Icon size={18} className="text-[#10b981]" />
                  <span>{act.label}</span>
                </Command.Item>
              );
            })}
          </Command.List>
        </Command>
      </div>
    </div>
  );
};
