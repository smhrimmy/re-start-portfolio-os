import React, { useState, useEffect } from 'react';
import { DeviceTier } from '../../core/device/device-tier';
import { mockStorage } from '@/data/mockStorage';
import { PortfolioIdentity, Project } from '@/types/portfolio';

import { ArchiveNavbar } from './components/ArchiveNavbar';
import { ProjectPillsList } from './components/ProjectPillsList';
import { ArchiveBox } from './components/ArchiveBox';
import { DesignProcessSection } from './components/DesignProcessSection';
import { ContactSection } from './components/ContactSection';
import { CaseStudyModal } from './components/CaseStudyModal';

import './styles/theme03.css';

interface Theme03Props {
  tier: DeviceTier;
}

export const Theme03Component: React.FC<Theme03Props> = () => {
  const [identity, setIdentity] = useState<PortfolioIdentity>(mockStorage.getIdentity());
  const [projects, setProjects] = useState<Project[]>(mockStorage.getProjects());
  const [activeHoverSlug, setActiveHoverSlug] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  useEffect(() => {
    setIdentity(mockStorage.getIdentity());
    setProjects(mockStorage.getProjects());

    const unsubscribe = mockStorage.subscribe(() => {
      setIdentity(mockStorage.getIdentity());
      setProjects(mockStorage.getProjects());
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
  }, [projects]);

  return (
    <div className="theme-03-root w-full min-h-screen bg-white text-[#18203A]">
      {/* Sticky Navbar */}
      <ArchiveNavbar brandName="prajwal" />

      {/* Main Container */}
      <main className="w-full max-w-[1440px] mx-auto px-[5%] pt-3 pb-8 flex flex-col gap-12">
        {/* Header Section */}
        <header id="work" className="mt-14 mb-[22px] quiet-entrance stagger-1">
          <h1 className="font-serif-instrument text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-[#18203A] leading-[1.1] tracking-[-0.8px] mb-[12px]">
            Projects I’ve worked on
          </h1>
          <p className="font-sans-satoshi text-[0.95rem] text-[#536083] leading-[1.5] max-w-[600px] m-0">
            A collection of thoughtful work, problem-solving, and details made to last.
          </p>
        </header>

        {/* Collection Section (Pills Left, Archive Box Right) */}
        <section className="section-collection w-full pt-[22px] quiet-entrance stagger-2">
          <div className="project-collection-grid grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] gap-8 lg:gap-[64px] items-start">
            {/* Left Column: Project Pills */}
            <div className="content flex flex-col justify-start">
              <ProjectPillsList
                projects={projects}
                activeHoverSlug={activeHoverSlug}
                onHoverProject={(slug) => setActiveHoverSlug(slug)}
                onSelectProject={(proj) => setSelectedCaseStudy(proj)}
              />
            </div>

            {/* Right Column: 3D Archive Box Stage */}
            <div className="archive flex justify-center lg:justify-end">
              <ArchiveBox
                projects={projects}
                activeHoverSlug={activeHoverSlug}
                onHoverProject={(slug) => setActiveHoverSlug(slug)}
                onSelectProject={(proj) => setSelectedCaseStudy(proj)}
              />
            </div>
          </div>
        </section>

        {/* Design Process Section */}
        <div className="quiet-entrance stagger-3">
          <DesignProcessSection />
        </div>

        {/* Contact Section */}
        <div className="quiet-entrance stagger-4">
          <ContactSection identity={identity} />
        </div>
      </main>

      {/* Case Study Modal Dialog */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </div>
  );
};

export default Theme03Component;
