import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceTier } from '../../core/device/device-tier';
import { ControlDeckHeader } from './components/ControlDeckHeader';
import { ControlDockMobile } from './components/ControlDockMobile';
import { ControlDeckSearch } from './components/ControlDeckSearch';
import { ControlDeckInitialLoader } from './loaders/ControlDeckInitialLoader';

import { CommandCenterHome } from './pages/CommandCenterHome';
import { ProjectControlPage } from './pages/ProjectControlPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { IntelligenceFeedPage } from './pages/IntelligenceFeedPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CareerTimelinePage } from './pages/CareerTimelinePage';
import { CapabilityMatrixPage } from './pages/CapabilityMatrixPage';
import { ProfileConsolePage } from './pages/ProfileConsolePage';
import { MasterResumePage } from './pages/MasterResumePage';
import { ContactConsolePage } from './pages/ContactConsolePage';
import { SearchPage } from './pages/SearchPage';
import { SystemErrorPage } from './pages/SystemErrorPage';

import './styles/theme02.css';

interface Theme02Props {
  tier: DeviceTier;
}

export const Theme02Component: React.FC<Theme02Props> = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Keyboard listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="theme-02-root flex flex-col min-h-screen bg-[#0A0D10] text-[#C9D1D9] font-mono selection:bg-[#00F0FF]/30 selection:text-[#00F0FF]">
      {/* Hardware Boot Sequence Loader */}
      <AnimatePresence>
        {isLoading && (
          <ControlDeckInitialLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Control Deck Header */}
      <ControlDeckHeader onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Page Viewport with Framer Motion Route Transitions */}
      <main className="flex-1 pb-16 lg:pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Routes>
              <Route path="/" element={<CommandCenterHome />} />
              <Route path="/projects" element={<ProjectControlPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/blog" element={<IntelligenceFeedPage />} />
              <Route path="/blog/:slug" element={<ArticleDetailPage />} />
              <Route path="/experience" element={<CareerTimelinePage />} />
              <Route path="/skills" element={<CapabilityMatrixPage />} />
              <Route path="/about" element={<ProfileConsolePage />} />
              <Route path="/resume" element={<MasterResumePage />} />
              <Route path="/contact" element={<ContactConsolePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<SystemErrorPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Tactile Navigation Dock */}
      <ControlDockMobile />

      {/* Command Search Overlay Drawer */}
      <ControlDeckSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Hardware Telemetry Footer */}
      <footer className="hidden lg:block w-full bg-[#0A0D10] border-t border-[#30363D] py-3 text-[11px] text-[#8B949E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            <span>PORTFOLIO OS // THEME 02 DIGITAL CONTROL DECK</span>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <span>LATENCY: 12ms</span>
            <span>•</span>
            <span>BUS: ENCRYPTED</span>
            <span>•</span>
            <span>STATUS: NOMINAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Theme02Component;
