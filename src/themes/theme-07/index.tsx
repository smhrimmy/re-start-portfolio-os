import React, { useState, useEffect } from 'react';
import { DeviceTier } from '../../core/device/device-tier';
import { mockStorage } from '@/data/mockStorage';
import { PortfolioIdentity, Project, Experience, SkillCategory } from '@/types/portfolio';

import { DigitalArchitectScene } from './components/DigitalArchitectScene';
import { Preloader } from './components/Preloader';
import { HeroSection } from './components/HeroSection';
import { AboutChamber } from './components/AboutChamber';
import { SkillsOrbit } from './components/SkillsOrbit';
import { ProjectPortals } from './components/ProjectPortals';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactPortal } from './components/ContactPortal';
import { CaseStudyModal } from '../theme-03/components/CaseStudyModal';

import './styles/theme07.css';

interface Theme07Props {
  tier: DeviceTier;
}

export const Theme07Component: React.FC<Theme07Props> = ({ tier }) => {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [identity, setIdentity] = useState<PortfolioIdentity>(mockStorage.getIdentity());
  const [projects, setProjects] = useState<Project[]>(mockStorage.getProjects());
  const [experience, setExperience] = useState<Experience[]>(mockStorage.getExperience());
  const [skills, setSkills] = useState<SkillCategory[]>(mockStorage.getSkills());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setIdentity(mockStorage.getIdentity());
    setProjects(mockStorage.getProjects());
    setExperience(mockStorage.getExperience());
    setSkills(mockStorage.getSkills());

    const unsubscribe = mockStorage.subscribe(() => {
      setIdentity(mockStorage.getIdentity());
      setProjects(mockStorage.getProjects());
      setExperience(mockStorage.getExperience());
      setSkills(mockStorage.getSkills());
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Convert skill categories to flat list for orbit component
  const flatSkills = skills.flatMap((cat) => cat.skills || []);

  return (
    <div className="architect-root selection:bg-[#249BFF] selection:text-white">
      {/* Boot Preloader Sequence */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 3D WebGL Background Scene */}
      <DigitalArchitectScene tier={tier} scrollProgress={scrollProgress} />

      {/* Glass Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 backdrop-blur-md bg-[#07090D]/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Signature */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#249BFF] to-[#D8955D] flex items-center justify-center font-bold text-black font-serif">
              P
            </div>
            <span className="font-serif font-bold text-lg text-white group-hover:text-[#69D9FF] transition-colors">
              PRAJWAL DL
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-wider text-[#91A0AD]">
            <button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors">
              HERO
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">
              ABOUT
            </button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-white transition-colors">
              SKILLS
            </button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors">
              PORTALS
            </button>
            <button onClick={() => scrollToSection('timeline')} className="hover:text-white transition-colors">
              TIMELINE
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">
              CONTACT
            </button>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2 text-xs font-mono text-[#69D9FF] px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">ONLINE</span>
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <main className="relative z-10">
        <div id="hero">
          <HeroSection
            identity={identity}
            onExploreClick={() => scrollToSection('projects')}
            onContactClick={() => scrollToSection('contact')}
          />
        </div>

        <div id="about">
          <AboutChamber identity={identity} />
        </div>

        <div id="skills">
          <SkillsOrbit skills={flatSkills} />
        </div>

        <div id="projects">
          <ProjectPortals projects={projects} onSelectProject={setSelectedProject} />
        </div>

        <div id="timeline">
          <ExperienceTimeline experiences={experience} />
        </div>

        <div id="contact">
          <ContactPortal identity={identity} />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/10 text-center text-xs font-mono text-[#91A0AD]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 PRAJWAL DL — THE DIGITAL ARCHITECT</span>
          <span>BUILT WITH REACT • THREE.JS • TYPESCRIPT</span>
        </div>
      </footer>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Theme07Component;
