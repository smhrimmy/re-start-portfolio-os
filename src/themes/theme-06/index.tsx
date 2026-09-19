import React, { useState, useEffect } from 'react';
import { DeviceTier } from '../../core/device/device-tier';
import { mockStorage } from '@/data/mockStorage';
import { PortfolioIdentity, Project, Experience, SkillCategory, BlogPost } from '@/types/portfolio';

import { Canvas3D } from './components/Canvas3D';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsVisualization } from './components/SkillsVisualization';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Navigation } from './components/Navigation';
import { CaseStudyModal } from '../theme-03/components/CaseStudyModal';

import './styles/theme-glassmorphism.css';
import './styles/animations.css';
import './styles/glassmorphism.css';

interface Theme06Props {
  tier: DeviceTier;
}

export const Theme06Component: React.FC<Theme06Props> = ({ tier }) => {
  const [identity, setIdentity] = useState<PortfolioIdentity>(mockStorage.getIdentity());
  const [projects, setProjects] = useState<Project[]>(mockStorage.getProjects());
  const [experience, setExperience] = useState<Experience[]>(mockStorage.getExperience());
  const [skills, setSkills] = useState<SkillCategory[]>(mockStorage.getSkills());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockStorage.getPosts());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setIdentity(mockStorage.getIdentity());
    setProjects(mockStorage.getProjects());
    setExperience(mockStorage.getExperience());
    setSkills(mockStorage.getSkills());
    setBlogPosts(mockStorage.getPosts());

    const unsubscribe = mockStorage.subscribe(() => {
      setIdentity(mockStorage.getIdentity());
      setProjects(mockStorage.getProjects());
      setExperience(mockStorage.getExperience());
      setSkills(mockStorage.getSkills());
      setBlogPosts(mockStorage.getPosts());
    });

    return () => unsubscribe();
  }, []);

  // Shared Quiet Entrance Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.quiet-entrance');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [projects, experience, skills, blogPosts]);

  return (
    <div className="theme-06-root w-full min-h-screen bg-[#FAFAF8] text-[#1A1A1A] overflow-x-hidden selection:bg-[#0066FF]/20 selection:text-[#0066FF]">
      {/* 3D Background Canvas */}
      <Canvas3D tier={tier} />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero identity={identity} />
        <ProjectShowcase projects={projects} tier={tier} onSelectProject={(p) => setSelectedProject(p)} />
        <ExperienceTimeline experiences={experience} />
        <SkillsVisualization skills={skills} />
        <BlogSection posts={blogPosts} />
        <ContactSection identity={identity} />
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-[#F5F3F0] border-t border-black/5 py-8 px-6 text-center font-sans-satoshi text-xs text-[#A0A0A0]">
        <p>© {new Date().getFullYear()} {identity.name || 'Prajwal DL'}. All rights reserved.</p>
        <p className="text-[10px] text-neutral-400 mt-1">Ethereal // 3D — Glassmorphism & Light Minimal Architecture.</p>
      </footer>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Theme06Component;
