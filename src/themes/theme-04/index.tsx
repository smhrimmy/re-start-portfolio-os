import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { DeviceTier } from '../../core/device/device-tier';
import { mockStorage } from '@/data/mockStorage';
import { PortfolioIdentity, Project } from '@/types/portfolio';

import { Scroll3DCanvas } from './components/Scroll3DCanvas';
import { Scroll3DHeader } from './components/Scroll3DHeader';
import { ProjectSpatialCard } from './components/ProjectSpatialCard';
import { SkillOrbitMatrix } from './components/SkillOrbitMatrix';
import { CaseStudyModal } from '../theme-03/components/CaseStudyModal';
import { ArrowDown, Mail, Github, Linkedin, MapPin, Send, Check, Terminal, Sparkles } from 'lucide-react';

import './styles/theme04.css';

interface Theme04Props {
  tier: DeviceTier;
}

export const Theme04Component: React.FC<Theme04Props> = () => {
  const [identity, setIdentity] = useState<PortfolioIdentity>(mockStorage.getIdentity());
  const [projects, setProjects] = useState<Project[]>(mockStorage.getProjects());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);

  // Framer Motion Scroll Progress Binding
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [rawScrollVal, setRawScrollVal] = useState(0);

  useEffect(() => {
    setIdentity(mockStorage.getIdentity());
    setProjects(mockStorage.getProjects());

    const unsubscribeStore = mockStorage.subscribe(() => {
      setIdentity(mockStorage.getIdentity());
      setProjects(mockStorage.getProjects());
    });

    const unsubscribeScroll = smoothScrollProgress.on('change', (v) => {
      setRawScrollVal(v);
    });

    return () => {
      unsubscribeStore();
      unsubscribeScroll();
    };
  }, [smoothScrollProgress]);

  const email = identity?.socialLinks?.email || 'pdlkpt@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="theme-04-root min-h-screen text-[#f3f4f6] selection:bg-[#f59e0b]/30 selection:text-[#f59e0b]">
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-indicator"
        style={{ width: `${Math.round(rawScrollVal * 100)}%` }}
      />

      {/* Fixed Background 3D Canvas Scene */}
      <Scroll3DCanvas scrollProgress={rawScrollVal} />

      {/* Top Telemetry Header */}
      <Scroll3DHeader scrollProgress={rawScrollVal} />

      {/* Main Page Scroll Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12 flex flex-col gap-24 sm:gap-32">
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center pt-8">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f59e0b]/10 border border-[#f59e0b]/40 rounded-full font-mono-jetbrains text-xs text-[#f59e0b]">
              <Terminal className="w-3.5 h-3.5" />
              <span>FULL STACK DEVELOPER & CLOUD ADVISOR</span>
            </div>

            <h1 className="font-space-grotesk text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Building Systems That Work <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#00f0ff] to-[#3054de]">
                As Good As They Look.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#9ca3af] leading-relaxed max-w-2xl">
              Specializing in high-performance web applications, cloud hosting migrations, and AI-native customer support orchestration platforms — engineered with an eye for the details most people skip.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="amber-glow-pill px-6 py-3.5 rounded-xl font-mono-jetbrains font-bold text-sm inline-flex items-center gap-2 min-h-[44px]"
              >
                <span>Explore 3D Work Showcase</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 bg-[#111319] hover:bg-white/10 border border-white/15 text-white rounded-xl font-mono-jetbrains font-bold text-sm inline-flex items-center gap-2 transition-colors min-h-[44px]"
              >
                <span>Initiate Contact</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 font-mono-jetbrains text-xs">
              <div>
                <span className="text-[#9ca3af] block">LOCATION</span>
                <span className="text-white font-bold block mt-1">MANGALORE, INDIA</span>
              </div>
              <div>
                <span className="text-[#9ca3af] block">SHIPPED PROJECTS</span>
                <span className="text-[#f59e0b] font-bold block mt-1">36+ SYSTEMS</span>
              </div>
              <div>
                <span className="text-[#9ca3af] block">CLIENT RATING</span>
                <span className="text-[#00f0ff] font-bold block mt-1">5.0 / 5.0 RATING</span>
              </div>
              <div>
                <span className="text-[#9ca3af] block">AVAILABILITY</span>
                <span className="text-[#10b981] font-bold block mt-1">OPEN FOR ROLES</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3D SCROLL STORY PHILOSOPHY SECTION */}
        <section id="story" className="w-full">
          <div className="spatial-card p-8 sm:p-12 space-y-6 max-w-4xl mx-auto border-[#00f0ff]/30">
            <div className="flex items-center gap-2 font-mono-jetbrains text-xs text-[#00f0ff]">
              <Sparkles className="w-4 h-4" />
              <span>CHAPTER 01 // SYSTEM PHILOSOPHY</span>
            </div>

            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold text-white leading-tight">
              Engineering with discipline, clarity, and zero synthetic fluff.
            </h2>

            <p className="font-sans text-base text-[#9ca3af] leading-relaxed">
              Every interface should feel deliberate, responsive, and predictable. Whether managing DNS transitions, setting up automated AI customer pipelines, or crafting bespoke 3D spatial user experiences, my approach enforces strict alignment, WCAG 2.2 AA accessibility standards, and clean architecture.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono-jetbrains text-xs text-neutral-300">
              <div className="p-3 bg-[#111319] rounded-lg border border-white/10">
                <strong className="text-[#f59e0b] block mb-1">01. ACCESSIBILITY FIRST</strong>
                <span>Strict 8pt grid, tap targets, and WCAG AA contrast.</span>
              </div>
              <div className="p-3 bg-[#111319] rounded-lg border border-white/10">
                <strong className="text-[#00f0ff] block mb-1">02. PERFORMANCE SLOP-FREE</strong>
                <span>Zero bloated dependencies; optimized Three.js canvas.</span>
              </div>
              <div className="p-3 bg-[#111319] rounded-lg border border-white/10">
                <strong className="text-[#10b981] block mb-1">03. ZERO-DOWNTIME DEPLOY</strong>
                <span>Production hosting, SSL, and DNS reliability.</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono-jetbrains text-xs text-[#f59e0b] uppercase tracking-wider block mb-1">
                CHAPTER 02 // SELECTED WORK
              </span>
              <h2 className="font-space-grotesk text-3xl sm:text-5xl font-bold text-white">
                Featured 3D Production Showcase
              </h2>
            </div>
            <p className="font-mono-jetbrains text-xs text-[#9ca3af] max-w-xs">
              Hover over cards to activate 3D perspective tilt and explore live dossier metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj, idx) => (
              <ProjectSpatialCard
                key={proj.id || idx}
                project={proj}
                index={idx}
                onOpenDetail={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        </section>

        {/* CAPABILITIES & SKILLS SECTION */}
        <section id="skills" className="space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="font-mono-jetbrains text-xs text-[#00f0ff] uppercase tracking-wider block mb-1">
              CHAPTER 03 // TECHNICAL MATRIX
            </span>
            <h2 className="font-space-grotesk text-3xl sm:text-5xl font-bold text-white">
              Capabilities & Architectural Stack
            </h2>
          </div>

          <SkillOrbitMatrix />
        </section>

        {/* EXPERIENCE TIMELINE SECTION */}
        <section id="experience" className="space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="font-mono-jetbrains text-xs text-[#10b981] uppercase tracking-wider block mb-1">
              CHAPTER 04 // TIMELINE
            </span>
            <h2 className="font-space-grotesk text-3xl sm:text-5xl font-bold text-white">
              Professional Career Track
            </h2>
          </div>

          <div className="space-y-6">
            <div className="spatial-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="font-mono-jetbrains text-xs text-[#f59e0b] font-bold">JUN 2025 — PRESENT</span>
                <h3 className="font-space-grotesk text-2xl font-bold text-white">Web Advisor</h3>
                <span className="font-mono-jetbrains text-sm text-[#00f0ff] block">Unifycx · Mangalore, KA</span>
                <p className="font-sans text-sm text-[#9ca3af] max-w-2xl leading-relaxed">
                  Managing enterprise website migrations, SSL security installations, email routing configuration, and hosting/DNS troubleshooting.
                </p>
              </div>
              <div className="px-4 py-2 bg-[#111319] border border-white/15 rounded-lg font-mono-jetbrains text-xs text-[#10b981] self-start md:self-center shrink-0">
                ACTIVE ROLE
              </div>
            </div>

            <div className="spatial-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="font-mono-jetbrains text-xs text-[#9ca3af] font-bold">DEC 2024 — JUN 2025</span>
                <h3 className="font-space-grotesk text-2xl font-bold text-white">Freelance Full Stack Developer</h3>
                <span className="font-mono-jetbrains text-sm text-[#00f0ff] block">Independent Contractor</span>
                <p className="font-sans text-sm text-[#9ca3af] max-w-2xl leading-relaxed">
                  Crafting custom full-stack web applications, landing pages, and interactive client platforms with React, TypeScript, and Node.js.
                </p>
              </div>
              <div className="px-4 py-2 bg-[#111319] border border-white/15 rounded-lg font-mono-jetbrains text-xs text-[#9ca3af] self-start md:self-center shrink-0">
                COMPLETED
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full">
          <div className="spatial-card p-8 sm:p-12 space-y-8 border-[#f59e0b]/40">
            <div className="space-y-3">
              <span className="font-mono-jetbrains text-xs text-[#f59e0b] uppercase tracking-wider block">
                CHAPTER 05 // INITIATE CONTACT
              </span>
              <h2 className="font-space-grotesk text-3xl sm:text-5xl font-bold text-white">
                Let’s Build Something Immersive.
              </h2>
              <p className="font-sans text-base text-[#9ca3af] max-w-xl leading-relaxed">
                Have a project, web architecture challenge, or role opportunity? Get in touch.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${email}`}
                className="amber-glow-pill px-6 py-3.5 rounded-xl font-mono-jetbrains text-sm font-bold inline-flex items-center gap-2 min-h-[44px]"
              >
                <Send className="w-4 h-4" />
                <span>Send Direct Email</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-6 py-3.5 bg-[#111319] hover:bg-white/10 border border-white/15 text-white rounded-xl font-mono-jetbrains text-sm font-bold inline-flex items-center gap-2 transition-colors min-h-[44px]"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-[#00f0ff]" />}
                <span>{copied ? 'Copied Email Address!' : 'Copy Email'}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 font-mono-jetbrains text-xs text-[#9ca3af]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#f59e0b]" />
                <span>{identity.location || 'Mangalore, Karnataka, India'}</span>
              </div>

              <div className="flex items-center gap-6">
                <a
                  href={identity.socialLinks?.github || 'https://github.com/smhrimmy'}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#f59e0b] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={identity.socialLinks?.linkedin || 'https://linkedin.com/in/prajwal-d-l-118198370/'}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#00f0ff] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Theme04Component;
