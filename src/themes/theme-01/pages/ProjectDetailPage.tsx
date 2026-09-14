import React, { useState } from 'react';
import { loadAdminStore } from '../../../admin/store/adminStore';
import { EditorialLightbox } from '../components/EditorialLightbox';
import { EditorialImageLoader } from '../loaders/EditorialImageLoader';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (tab: string, slug?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug, onNavigate }) => {
  const store = loadAdminStore();
  const project = store.projects.find((p) => p.slug === slug) || store.projects[0];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const sampleGallery = [
    { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', caption: 'System telemetry dashboard and real-time event pipeline stream' },
    { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', caption: 'Automated ticket classification and sentiment analysis matrix' },
    { src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800', caption: 'Cloud infrastructure topology and database migration map' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('projects')}
        className="font-mono text-xs font-bold text-[#666666] hover:text-[#111111] flex items-center gap-2 mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> RETURN TO PROJECTS ARCHIVE
      </button>

      {/* Case Study Header */}
      <div className="border-b border-[#111111] pb-8 mb-12">
        <div className="font-mono text-xs text-[#8B0000] tracking-widest uppercase mb-2">
          CASE STUDY // {project.title}
        </div>
        <h1 className="theme-01-display text-4xl sm:text-6xl font-bold text-[#111111] mb-4">
          {project.title}
        </h1>
        <p className="text-base sm:text-lg text-[#555555] font-light max-w-3xl leading-relaxed mb-6">
          {project.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs pt-4 border-t border-[#E2E0D8]">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="bg-[#F2F0EB] text-[#111111] px-2.5 py-1 border border-[#E2E0D8]">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 font-bold">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#111111] hover:text-[#8B0000]">
                <Github size={14} /> REPOSITORY →
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#111111] hover:text-[#8B0000]">
                <ExternalLink size={14} /> LIVE DEMO →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Chapters Breakdown */}
      <div className="space-y-16">
        {/* Chapter 01: Overview */}
        <section className="border-b border-[#E2E0D8] pb-12">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-mono text-sm font-bold text-[#8B0000]">01 /</span>
            <h2 className="theme-01-display text-2xl font-bold">SYSTEM OVERVIEW</h2>
          </div>
          <p className="text-sm text-[#333333] leading-relaxed max-w-3xl font-light">
            {project.description.replace(/^# .*\n?/, '') || project.tagline}
          </p>
        </section>

        {/* Chapter 02: Problem & Architecture Requirements */}
        <section className="border-b border-[#E2E0D8] pb-12">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-mono text-sm font-bold text-[#8B0000]">02 /</span>
            <h2 className="theme-01-display text-2xl font-bold">THE CHALLENGE</h2>
          </div>
          <p className="text-sm text-[#333333] leading-relaxed max-w-3xl font-light">
            Modern web applications require zero-downtime execution, low-latency UI rendering, and immediate feedback loops. Legacy customer workflows struggled with high ticket volume, unindexed queries, and lack of visual telemetry.
          </p>
        </section>

        {/* Chapter 03: Approach & Technical Solution */}
        <section className="border-b border-[#E2E0D8] pb-12">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="font-mono text-sm font-bold text-[#8B0000]">03 /</span>
            <h2 className="theme-01-display text-2xl font-bold">TECHNICAL APPROACH</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <div className="bg-[#F2F0EB] p-4 border border-[#E2E0D8]">
              <h4 className="font-mono text-xs font-bold text-[#111111] mb-2">REACT & TYPESCRIPT FRONTEND</h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                Strict type safety with custom state hooks and component isolation.
              </p>
            </div>
            <div className="bg-[#F2F0EB] p-4 border border-[#E2E0D8]">
              <h4 className="font-mono text-xs font-bold text-[#111111] mb-2">INTELLIGENT DATA ROUTING</h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                Asynchronous event dispatching and real-time state synchronization.
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 04: Visual Plates & Gallery */}
        <section className="border-b border-[#E2E0D8] pb-12">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono text-sm font-bold text-[#8B0000]">04 /</span>
            <h2 className="theme-01-display text-2xl font-bold">VISUAL PLATES & SYSTEM SCREENS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleGallery.map((img, idx) => (
              <EditorialImageLoader
                key={idx}
                src={img.src}
                alt={img.caption}
                category="CASE STUDY"
                indexNumber={`0${idx + 1}`}
                onClick={() => setLightboxIndex(idx)}
                className="h-48"
              />
            ))}
          </div>
        </section>

        {/* Chapter 05: Measurable Results */}
        <section className="pb-12">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-mono text-sm font-bold text-[#8B0000]">05 /</span>
            <h2 className="theme-01-display text-2xl font-bold">MEASURABLE OUTCOMES</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="bg-white p-4 border border-[#E2E0D8] text-center">
              <span className="text-2xl font-bold text-[#8B0000] block">{project.starsCount}</span>
              <span className="text-[#666666] text-[10px]">GITHUB STARS</span>
            </div>
            <div className="bg-white p-4 border border-[#E2E0D8] text-center">
              <span className="text-2xl font-bold text-[#111111] block">{project.viewsCount}</span>
              <span className="text-[#666666] text-[10px]">TOTAL VIEWS</span>
            </div>
            <div className="bg-white p-4 border border-[#E2E0D8] text-center">
              <span className="text-2xl font-bold text-[#111111] block">99.9%</span>
              <span className="text-[#666666] text-[10px]">UPTIME RATE</span>
            </div>
            <div className="bg-white p-4 border border-[#E2E0D8] text-center">
              <span className="text-2xl font-bold text-[#111111] block">&lt; 100ms</span>
              <span className="text-[#666666] text-[10px]">LATENCY</span>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      <EditorialLightbox
        isOpen={lightboxIndex !== null}
        images={sampleGallery}
        currentIndex={lightboxIndex || 0}
        projectName={project.title}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : sampleGallery.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev !== null && prev < sampleGallery.length - 1 ? prev + 1 : 0))}
      />
    </div>
  );
};
