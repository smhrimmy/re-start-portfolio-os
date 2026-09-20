import React, { useState, useEffect } from 'react';
import { MotionProvider, useMotion } from './core/motion/MotionProvider';
import Theme01Component from './themes/theme-01';
import Theme02Component from './themes/theme-02';
import Theme03Component from './themes/theme-03';
import Theme04Component from './themes/theme-04';
import Theme05Component from './themes/theme-05';
import Theme06Component from './themes/theme-06';
import Theme07Component from './themes/theme-07';
import Theme08Component from './themes/theme-08';
import Theme09Component from './themes/theme-09';


// protfoliov2 Admin Shell & 28 Admin Module Pages
import { AdminShell } from '@/components/admin/AdminShell';
import { Dashboard } from '@/pages/admin/Dashboard';
import { ProjectsList } from '@/pages/admin/ProjectsList';
import { ProjectEditor } from '@/pages/admin/ProjectEditor';
import { BlogList } from '@/pages/admin/BlogList';
import { BlogEditor } from '@/pages/admin/BlogEditor';
import { VisualSiteEditor } from '@/pages/admin/VisualSiteEditor';
import { ThemeSelectorPage } from '@/pages/admin/ThemeSelectorPage';
import { MotionLabPage } from '@/pages/admin/MotionLabPage';
import { MediaLibrary } from '@/pages/admin/MediaLibrary';
import { AutomationsPage } from '@/pages/admin/AutomationsPage';
import { DesignSystemPage } from '@/pages/admin/DesignSystemPage';
import { SEOSuite } from '@/pages/admin/SEOSuite';
import { AnalyticsPage } from '@/pages/admin/AnalyticsPage';
import { GitHubHub } from '@/pages/admin/GitHubHub';
import { AIWorkspace } from '@/pages/admin/AIWorkspace';
import { SiteHealthPage } from '@/pages/admin/SiteHealthPage';
import { RecruiterModePage } from '@/pages/admin/RecruiterModePage';
import { EducationManagerPage } from '@/pages/admin/EducationManagerPage';
import { CertificationsManagerPage } from '@/pages/admin/CertificationsManagerPage';
import { TestimonialsManagerPage } from '@/pages/admin/TestimonialsManagerPage';
import { PagesCMSPage } from '@/pages/admin/PagesCMSPage';
import { ResumeManagerPage } from '@/pages/admin/ResumeManagerPage';
import { NotificationsCenterPage } from '@/pages/admin/NotificationsCenterPage';
import { BackupExportPage } from '@/pages/admin/BackupExportPage';
import { CommentsModerationPage } from '@/pages/admin/CommentsModerationPage';
import { OwnerProfilePage } from '@/pages/admin/OwnerProfilePage';
import { 
  ExperienceManager, 
  SkillsManager, 
  CredentialsManager, 
  ActivityLog, 
  ProfileSettings 
} from '@/pages/admin/CMSManagerPages';
import { SettingsPage } from '@/pages/admin/SettingsPage';
import { AuthGuardModal } from './admin/components/AuthGuardModal';

const MainShell: React.FC = () => {
  const { tier } = useMotion();
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [activeTheme, setActiveTheme] = useState<'theme-01' | 'theme-02' | 'theme-03' | 'theme-04' | 'theme-05' | 'theme-06' | 'theme-07' | 'theme-08' | 'theme-09'>('theme-09');

  const [currentRoute, setCurrentRoute] = useState<string>(window.location.pathname || '/admin/dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) {
      setView('admin');
      setCurrentRoute(window.location.pathname);
    }
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
    if (path.startsWith('/admin')) {
      setView('admin');
    } else {
      setView('public');
    }
  };

  const renderAdminContent = () => {
    if (currentRoute === '/admin' || currentRoute === '/admin/dashboard') {
      return <Dashboard onNavigate={navigate} />;
    } else if (currentRoute === '/admin/projects') {
      return <ProjectsList onNavigate={navigate} />;
    } else if (currentRoute === '/admin/projects/new') {
      return <ProjectEditor projectId="new" onNavigate={navigate} />;
    } else if (currentRoute.startsWith('/admin/projects/')) {
      const pId = currentRoute.replace('/admin/projects/', '');
      return <ProjectEditor projectId={pId} onNavigate={navigate} />;
    } else if (currentRoute === '/admin/blog') {
      return <BlogList onNavigate={navigate} />;
    } else if (currentRoute === '/admin/blog/new') {
      return <BlogEditor postId="new" onNavigate={navigate} />;
    } else if (currentRoute.startsWith('/admin/blog/')) {
      const bId = currentRoute.replace('/admin/blog/', '');
      return <BlogEditor postId={bId} onNavigate={navigate} />;
    } else if (currentRoute === '/admin/visual-editor') {
      return <VisualSiteEditor onNavigate={navigate} />;
    } else if (currentRoute === '/admin/themes') {
      return <ThemeSelectorPage onNavigate={navigate} onPreviewTheme={() => {}} />;
    } else if (currentRoute === '/admin/motion-lab') {
      return <MotionLabPage onNavigate={navigate} />;
    } else if (currentRoute === '/admin/media') {
      return <MediaLibrary />;
    } else if (currentRoute === '/admin/automations') {
      return <AutomationsPage />;
    } else if (currentRoute === '/admin/design-system') {
      return <DesignSystemPage />;
    } else if (currentRoute === '/admin/seo') {
      return <SEOSuite />;
    } else if (currentRoute === '/admin/analytics') {
      return <AnalyticsPage />;
    } else if (currentRoute === '/admin/github') {
      return <GitHubHub />;
    } else if (currentRoute === '/admin/ai' || currentRoute === '/admin/ai-workspace') {
      return <AIWorkspace />;
    } else if (currentRoute === '/admin/site-health') {
      return <SiteHealthPage />;
    } else if (currentRoute === '/admin/recruiter') {
      return <RecruiterModePage onNavigate={navigate} />;
    } else if (currentRoute === '/admin/education') {
      return <EducationManagerPage />;
    } else if (currentRoute === '/admin/certifications') {
      return <CertificationsManagerPage />;
    } else if (currentRoute === '/admin/testimonials') {
      return <TestimonialsManagerPage />;
    } else if (currentRoute === '/admin/pages') {
      return <PagesCMSPage onNavigate={navigate} />;
    } else if (currentRoute === '/admin/resume') {
      return <ResumeManagerPage onNavigate={navigate} />;
    } else if (currentRoute === '/admin/notifications') {
      return <NotificationsCenterPage />;
    } else if (currentRoute === '/admin/backup') {
      return <BackupExportPage />;
    } else if (currentRoute === '/admin/comments') {
      return <CommentsModerationPage />;
    } else if (currentRoute === '/admin/profile') {
      return <OwnerProfilePage />;
    } else if (currentRoute === '/admin/experience') {
      return <ExperienceManager />;
    } else if (currentRoute === '/admin/skills') {
      return <SkillsManager />;
    } else if (currentRoute === '/admin/credentials') {
      return <CredentialsManager />;
    } else if (currentRoute === '/admin/activity') {
      return <ActivityLog />;
    } else if (currentRoute === '/admin/settings') {
      return <SettingsPage />;
    } else {
      return <Dashboard onNavigate={navigate} />;
    }
  };

  const handleAuthenticate = (passcode: string): boolean => {
    if (passcode === '1234') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <div>
      {/* Top Bar Switcher */}
      <div className="bg-[#1a1a1a] text-white px-4 sm:px-6 py-2 flex items-center justify-between text-xs font-mono border-b border-neutral-800 z-50 relative">
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
              <button
                onClick={() => setActiveTheme('theme-03')}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  activeTheme === 'theme-03' ? 'bg-[#3054DE] text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Theme 03 Archive Desk
              </button>
              <button
                onClick={() => setActiveTheme('theme-04')}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  activeTheme === 'theme-04' ? 'bg-[#f59e0b] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Theme 04 3D Scrolly
              </button>
              <button
                onClick={() => setActiveTheme('theme-05')}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  activeTheme === 'theme-05' ? 'bg-[#C9A876] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Theme 05 Creative Editorial
              </button>
              <button
                onClick={() => setActiveTheme('theme-06')}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  activeTheme === 'theme-06' ? 'bg-[#0066FF] text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Theme 06 Ethereal 3D
              </button>
              <button
                onClick={() => setActiveTheme('theme-07')}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  activeTheme === 'theme-07' ? 'bg-[#249BFF] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Theme 07 Digital Architect
              </button>
              <button
                onClick={() => setActiveTheme('theme-08')}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  activeTheme === 'theme-08' ? 'bg-[#E8B44A] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Theme 08 Pause Menu OS
              </button>
              <button
                onClick={() => setActiveTheme('theme-09')}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  activeTheme === 'theme-09' ? 'bg-[#FF6600] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Theme 09 ERA Select OS
              </button>
            </div>
          )}
          <button
            onClick={() => navigate('/')}
            className={`px-2.5 py-1 rounded transition-colors ${
              view === 'public' ? 'bg-blue-600 font-bold' : 'hover:bg-neutral-800 text-neutral-300'
            }`}
          >
            Public Theme
          </button>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className={`px-2.5 py-1 rounded transition-colors ${
              view === 'admin' ? 'bg-emerald-600 font-bold' : 'hover:bg-neutral-800 text-neutral-300'
            }`}
          >
            Admin OS (28 Modules)
          </button>
        </div>
      </div>

      {view === 'public' ? (
        activeTheme === 'theme-01' ? (
          <Theme01Component tier={tier} />
        ) : activeTheme === 'theme-02' ? (
          <Theme02Component tier={tier} />
        ) : activeTheme === 'theme-03' ? (
          <Theme03Component tier={tier} />
        ) : activeTheme === 'theme-04' ? (
          <Theme04Component tier={tier} />
        ) : activeTheme === 'theme-05' ? (
          <Theme05Component tier={tier} />
        ) : activeTheme === 'theme-06' ? (
          <Theme06Component tier={tier} />
        ) : activeTheme === 'theme-07' ? (
          <Theme07Component tier={tier} />
        ) : activeTheme === 'theme-08' ? (
          <Theme08Component tier={tier} />
        ) : (
          <Theme09Component tier={tier} />
        )
      ) : !isAuthenticated ? (
        <AuthGuardModal isOpen={!isAuthenticated} onAuthenticate={handleAuthenticate} />
      ) : (
        <AdminShell currentRoute={currentRoute} onNavigate={navigate}>
          {renderAdminContent()}
        </AdminShell>
      )}
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
