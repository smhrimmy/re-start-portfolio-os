import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceTier } from '../../core/device/device-tier';
import { EditorialMasthead } from './components/EditorialMasthead';
import { EditorialMobileNav } from './components/EditorialMobileNav';
import { EditorialSearch } from './components/EditorialSearch';
import { EditorialToast } from './components/EditorialToast';
import { EditorialInitialLoader } from './loaders/EditorialInitialLoader';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SkillsPage } from './pages/SkillsPage';
import { ResumePage } from './pages/ResumePage';
import { BlogPage } from './pages/BlogPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactPage } from './pages/ContactPage';
import { SearchPage } from './pages/SearchPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { pageIssueTransition } from './animations/editorialAnimations';
import './styles/theme01.css';

interface Theme01Props {
  tier: DeviceTier;
}

export const Theme01Component: React.FC<Theme01Props> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeSlug, setActiveSlug] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K & / for Search)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleNavigate = (tab: string, slug?: string) => {
    setCurrentTab(tab);
    if (slug) {
      setActiveSlug(slug);
    } else {
      setActiveSlug('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="theme-01-root flex flex-col min-h-screen overflow-x-hidden min-w-0 w-full">
      {/* Initial Skimmable Loader */}
      <AnimatePresence>
        {isLoading && (
          <EditorialInitialLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Publication Header / Masthead */}
      <EditorialMasthead
        currentTab={currentTab}
        onTabChange={(tab) => handleNavigate(tab)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
      />

      {/* Main Body View Switching with Editorial Transitions */}
      <main className="flex-1 pb-fixed-nav-safe sm:pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentTab}-${activeSlug}`}
            variants={pageIssueTransition}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {currentTab === 'home' && <HomePage onNavigate={handleNavigate} />}
            {currentTab === 'projects' && !activeSlug && <ProjectsPage onNavigate={handleNavigate} />}
            {currentTab === 'projects' && activeSlug && (
              <ProjectDetailPage slug={activeSlug} onNavigate={handleNavigate} />
            )}
            {currentTab === 'experience' && <ExperiencePage onNavigate={handleNavigate} />}
            {currentTab === 'skills' && <SkillsPage />}
            {currentTab === 'resume' && <ResumePage />}
            {currentTab === 'blog' && !activeSlug && <BlogPage onNavigate={handleNavigate} />}
            {currentTab === 'blog' && activeSlug && (
              <ArticleDetailPage slug={activeSlug} onNavigate={handleNavigate} />
            )}
            {currentTab === 'search' && <SearchPage onNavigate={handleNavigate} />}
            {currentTab === 'contact' && <ContactPage onShowToast={showToast} />}
            {currentTab === '404' && <NotFoundPage onNavigate={handleNavigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Publication Footer */}
      <footer className="w-full bg-[#F2F0EB] border-t border-[#E2E0D8] py-8 mt-16 text-[#666666]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div>
            <span className="font-bold text-[#111111]">PRAJWAL DL</span> // PORTFOLIO OS v2.4 · EDITION 2026
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNavigate('home')} className="hover:text-[#111111]">
              INDEX
            </button>
            <button onClick={() => handleNavigate('projects')} className="hover:text-[#111111]">
              WORKS
            </button>
            <button onClick={() => handleNavigate('search')} className="hover:text-[#111111]">
              SEARCH
            </button>
            <button onClick={() => handleNavigate('contact')} className="hover:text-[#111111]">
              CONTACT
            </button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-bold text-[#8B0000]">
              TOP ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Chapter Navigation Drawer */}
      <EditorialMobileNav
        isOpen={isMobileMenuOpen}
        currentTab={currentTab}
        onTabChange={(tab) => handleNavigate(tab)}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Search Archive Overlay */}
      <EditorialSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProject={(slug) => handleNavigate('projects', slug)}
        onSelectArticle={(slug) => handleNavigate('blog', slug)}
      />

      {/* Publication Toast Banner */}
      <EditorialToast
        isVisible={toastMessage !== null}
        message={toastMessage || ''}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};

export default Theme01Component;
