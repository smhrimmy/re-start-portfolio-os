import React, { useState } from 'react';
import { MotionProvider, useMotion } from './core/motion/MotionProvider';
import Theme01Component from './themes/theme-01';
import Theme02Component from './themes/theme-02';
import { AdminLayout } from './admin/layout/AdminLayout';
import { AuthGuardModal } from './admin/components/AuthGuardModal';
import { CommandPalette } from './admin/components/CommandPalette';
import { OverviewModule } from './admin/modules/OverviewModule';
import { ProjectsModule } from './admin/modules/ProjectsModule';
import { BlogModule } from './admin/modules/BlogModule';
import { ExperienceModule } from './admin/modules/ExperienceModule';
import { ResumeModule } from './admin/modules/ResumeModule';
import { MediaLibraryModule } from './admin/modules/MediaLibraryModule';
import { AnalyticsSuiteModule } from './admin/modules/AnalyticsSuiteModule';
import { SEOSuiteModule } from './admin/modules/SEOSuiteModule';
import { TestimonialsModule } from './admin/modules/TestimonialsModule';
import { CommentsModerationModule } from './admin/modules/CommentsModerationModule';
import { RecruiterModeModule } from './admin/modules/RecruiterModeModule';
import { AIWorkspaceModule } from './admin/modules/AIWorkspaceModule';
import { RevisionDiffModule } from './admin/modules/RevisionDiffModule';
import { SocialQueueModule } from './admin/modules/SocialQueueModule';
import { ThemeCustomizerModule } from './admin/modules/ThemeCustomizerModule';
import { AuditLogModule } from './admin/modules/AuditLogModule';

const MainShell: React.FC = () => {
  const { tier } = useMotion();
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [activeTheme, setActiveTheme] = useState<'theme-01' | 'theme-02'>('theme-02');
  const [adminTab, setAdminTab] = useState<string>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCmdkOpen, setIsCmdkOpen] = useState<boolean>(false);

  const handleAuthenticate = (passcode: string): boolean => {
    if (passcode === '1234') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <div>
      {/* Top View & Theme Switcher Bar */}
      <div className="bg-[#1a1a1a] text-white px-4 sm:px-6 py-2 flex items-center justify-between text-xs font-mono border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="hidden sm:inline">PORTFOLIO OS // TIER: {tier}</span>
          <span className="sm:hidden">{tier}</span>
        </div>
        <div className="flex items-center gap-3">
          {view === 'public' && (
            <div className="flex items-center bg-neutral-900 border border-neutral-700 rounded p-0.5">
              <button
                onClick={() => setActiveTheme('theme-01')}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  activeTheme === 'theme-01' ? 'bg-[#8B0000] text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Theme 01 Editorial
              </button>
              <button
                onClick={() => setActiveTheme('theme-02')}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  activeTheme === 'theme-02' ? 'bg-[#00F0FF] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Theme 02 Control Deck
              </button>
            </div>
          )}
          <button
            onClick={() => setView('public')}
            className={`px-2.5 py-1 rounded transition-colors ${
              view === 'public' ? 'bg-blue-600 font-bold' : 'hover:bg-neutral-800'
            }`}
          >
            Public Theme
          </button>
          <button
            onClick={() => setView('admin')}
            className={`px-2.5 py-1 rounded transition-colors ${
              view === 'admin' ? 'bg-emerald-600 font-bold' : 'hover:bg-neutral-800'
            }`}
          >
            Admin OS
          </button>
        </div>
      </div>

      {view === 'public' ? (
        activeTheme === 'theme-01' ? (
          <Theme01Component tier={tier} />
        ) : (
          <Theme02Component tier={tier} />
        )
      ) : !isAuthenticated ? (
        <AuthGuardModal isOpen={!isAuthenticated} onAuthenticate={handleAuthenticate} />
      ) : (
        <AdminLayout activeTab={adminTab} onTabChange={setAdminTab} onOpenCmdk={() => setIsCmdkOpen(true)}>
          {adminTab === 'dashboard' && <OverviewModule onNavigate={setAdminTab} />}
          {adminTab === 'projects' && <ProjectsModule />}
          {adminTab === 'blog' && <BlogModule />}
          {adminTab === 'experience' && <ExperienceModule />}
          {adminTab === 'resume' && <ResumeModule />}
          {adminTab === 'media' && <MediaLibraryModule />}
          {adminTab === 'analytics' && <AnalyticsSuiteModule />}
          {adminTab === 'seo' && <SEOSuiteModule />}
          {adminTab === 'testimonials' && <TestimonialsModule />}
          {adminTab === 'comments' && <CommentsModerationModule />}
          {adminTab === 'recruiter' && <RecruiterModeModule />}
          {adminTab === 'ai' && <AIWorkspaceModule />}
          {adminTab === 'revisions' && <RevisionDiffModule />}
          {adminTab === 'social' && <SocialQueueModule />}
          {adminTab === 'themes' && <ThemeCustomizerModule />}
          {adminTab === 'audit' && <AuditLogModule />}
        </AdminLayout>
      )}

      <CommandPalette
        isOpen={isCmdkOpen}
        onClose={() => setIsCmdkOpen(false)}
        onSelectTab={(tabId) => {
          setView('admin');
          setAdminTab(tabId);
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <MotionProvider>
      <MainShell />
    </MotionProvider>
  );
};

export default App;
