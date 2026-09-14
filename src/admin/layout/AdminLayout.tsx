import React, { useState } from 'react';
import {
  Menu,
  X,
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
  Command as CmdIcon,
} from 'lucide-react';
import { INTELLIGENT_STAGE_TOKENS } from '../design-tokens';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenCmdk: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, onTabChange, onOpenCmdk }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
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

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setIsDrawerOpen(false);
  };

  return (
    <div
      className="min-h-screen font-sans flex text-[#1a1a1a]"
      style={{ backgroundColor: INTELLIGENT_STAGE_TOKENS.colors.bgBase }}
    >
      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 w-64 bg-[#f4f4f3] border-r border-[#dcdcdc] z-50 transform transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col justify-between overflow-y-auto`}
      >
        <div>
          <div className="p-6 border-b border-[#dcdcdc] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#10b981]" />
              <span className="font-mono font-bold tracking-wider text-sm">STAGE OS ADMIN</span>
            </div>
            <button className="lg:hidden p-1 text-[#666]" onClick={() => setIsDrawerOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="p-3">
            <button
              onClick={onOpenCmdk}
              className="w-full bg-[#eaeaea] hover:bg-[#e0e0df] border border-[#dcdcdc] rounded-lg px-3 py-2 text-xs font-mono text-[#666] flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-1.5"><CmdIcon size={14} /> Cmd+K Palette</span>
              <kbd className="bg-[#dcdcdc] px-1.5 py-0.5 rounded text-[10px]">⌘K</kbd>
            </button>
          </div>

          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                    isActive
                      ? 'bg-[#e5e5e4] text-[#1a1a1a] font-bold border border-[#d2d2d0]'
                      : 'text-[#666666] hover:bg-[#eaeaea]'
                  }`}
                >
                  <IconComponent size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#dcdcdc] text-xs font-mono text-[#888888]">
          STAGE_OS v1.0.0 // INTELLIGENT STAGE
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden p-4 bg-[#f4f4f3] border-b border-[#dcdcdc] flex items-center justify-between">
          <button className="p-2 text-[#1a1a1a]" onClick={() => setIsDrawerOpen(true)}>
            <Menu size={24} />
          </button>
          <span className="font-mono text-sm font-bold">INTELLIGENT STAGE ADMIN</span>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
