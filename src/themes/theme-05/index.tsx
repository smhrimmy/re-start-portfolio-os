import React, { useState, useEffect } from 'react';
import { DeviceTier } from '../../core/device/device-tier';
import { mockStorage } from '@/data/mockStorage';
import { PortfolioIdentity, Project } from '@/types/portfolio';

import { Theme05Preloader } from './components/Theme05Preloader';
import { Theme05Navbar } from './components/Theme05Navbar';
import { Theme05Hero } from './components/Theme05Hero';
import { Theme05About } from './components/Theme05About';
import { Theme05Expertise } from './components/Theme05Expertise';
import { Theme05Work } from './components/Theme05Work';
import { Theme05Contact } from './components/Theme05Contact';
import { CaseStudyModal } from '../theme-03/components/CaseStudyModal';

import './styles/theme05.css';

interface Theme05Props {
  tier: DeviceTier;
}

export const Theme05Component: React.FC<Theme05Props> = () => {
  const [identity, setIdentity] = useState<PortfolioIdentity>(mockStorage.getIdentity());
  const [projects, setProjects] = useState<Project[]>(mockStorage.getProjects());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIdentity(mockStorage.getIdentity());
    setProjects(mockStorage.getProjects());

    const unsubscribe = mockStorage.subscribe(() => {
      setIdentity(mockStorage.getIdentity());
      setProjects(mockStorage.getProjects());
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="theme-05-root min-h-screen text-white selection:bg-[#C9A876]/30 selection:text-[#C9A876]">
      {/* 1. Preloader */}
      <Theme05Preloader onComplete={() => setIsLoaded(true)} />

      {/* Main Page Layout (Visible when preloader finishes) */}
      <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* 2. Navbar */}
        <Theme05Navbar identity={identity} />

        {/* 3. Hero Section (Cream #F0EBE1 Background) */}
        <Theme05Hero identity={identity} />

        {/* 4. About Section (Black #0B0B0C Background) */}
        <Theme05About identity={identity} />

        {/* 5. Expertise Section */}
        <Theme05Expertise />

        {/* 6. Work Section */}
        <Theme05Work projects={projects} onOpenDetail={(p) => setSelectedProject(p)} />

        {/* 7. Contact Section */}
        <Theme05Contact identity={identity} />

        {/* Footer */}
        <footer className="bg-[#0B0B0C] border-t border-white/10 py-8 px-6 text-center font-mono-jetbrains text-xs text-[#999999]">
          <p>© {new Date().getFullYear()} {identity.name || 'Prajwal DL'}. All rights reserved. Creative Developer & Web Advisor.</p>
          <p className="text-[10px] text-[#555555] mt-1">Designed with Cream & Noir Editorial Aesthetics, Liquid SVG Distortion & GSAP Motion.</p>
        </footer>

        {/* Case Study Modal */}
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </div>
  );
};

export default Theme05Component;
