import React, { useState, useEffect } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import { DeviceTier } from '../../core/device/device-tier';
import { mockStorage } from '@/data/mockStorage';
import { PortfolioIdentity, Project, SkillCategory } from '@/types/portfolio';

import { Scroll3DCanvas } from './components/Scroll3DCanvas';
import { Scroll3DHeader } from './components/Scroll3DHeader';
import { AboutBlueprintSection } from './components/AboutBlueprintSection';
import { ProjectDeckSlider } from './components/ProjectDeckSlider';
import { ContactInteractiveSection } from './components/ContactInteractiveSection';
import { CaseStudyModal } from '../theme-03/components/CaseStudyModal';
import { ArrowDown, Terminal, Sparkles, Code2 } from 'lucide-react';
import { soundSynth } from './soundSynth';

import './styles/theme04.css';

interface Theme04Props {
  tier: DeviceTier;
}

export const Theme04Component: React.FC<Theme04Props> = () => {
  const [identity, setIdentity] = useState<PortfolioIdentity>(mockStorage.getIdentity());
  const [projects, setProjects] = useState<Project[]>(mockStorage.getProjects());
  const [skills, setSkills] = useState<SkillCategory[]>(mockStorage.getSkills());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    setSkills(mockStorage.getSkills());

    const unsubscribeStore = mockStorage.subscribe(() => {
      setIdentity(mockStorage.getIdentity());
      setProjects(mockStorage.getProjects());
      setSkills(mockStorage.getSkills());
    });

    const unsubscribeScroll = smoothScrollProgress.on('change', (v) => {
      setRawScrollVal(v);
    });

    return () => {
      unsubscribeStore();
      unsubscribeScroll();
    };
  }, [smoothScrollProgress]);

  const handleScrollTo = (id: string) => {
    soundSynth.playClick(650);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
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
        {/* HERO / LANDING SECTION */}
        <section id="hero" className="min-h-[88vh] flex flex-col justify-center pt-6 relative">
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f59e0b]/10 border border-[#f59e0b]/40 rounded-full font-mono-jetbrains text-xs text-[#f59e0b]">
              <Terminal className="w-3.5 h-3.5" />
              <span>FULL STACK WEB DEVELOPER & WEB ADVISOR</span>
            </div>

            {/* Cyber SVG Typography Headline */}
            <div className="space-y-2 font-space-grotesk font-bold tracking-tight">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.05]">
                Hi, my name is <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] via-[#00f0ff] to-[#3054de]">
                  {identity.name || 'Prajwal DL'}.
                </span>
              </h1>
              <p className="font-sans text-lg sm:text-xl text-[#9ca3af] leading-relaxed max-w-2xl pt-2">
                I love creating beautiful, high-performance user experiences, full-stack web applications, and reliable DNS & cloud hosting infrastructure.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 font-mono-jetbrains">
              <button
                onClick={() => handleScrollTo('work')}
                className="amber-glow-pill px-7 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2.5 min-h-[44px]"
              >
                <span>Get In Touch / View Work</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                onClick={() => handleScrollTo('about')}
                className="px-6 py-3.5 bg-[#111319] hover:bg-white/10 border border-white/15 text-white rounded-xl font-bold text-sm inline-flex items-center gap-2 transition-colors min-h-[44px]"
              >
                <Code2 className="w-4 h-4 text-[#00f0ff]" />
                <span>Explore Architecture Blueprint</span>
              </button>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 font-mono-jetbrains text-xs">
              <div>
                <span className="text-[#9ca3af] block text-[10px]">LOCATION</span>
                <span className="text-white font-bold block mt-1">MANGALORE, INDIA</span>
              </div>
              <div>
                <span className="text-[#9ca3af] block text-[10px]">SHIPPED PROJECTS</span>
                <span className="text-[#f59e0b] font-bold block mt-1">36+ SYSTEMS</span>
              </div>
              <div>
                <span className="text-[#9ca3af] block text-[10px]">CLIENT RATING</span>
                <span className="text-[#00f0ff] font-bold block mt-1">5.0 / 5.0 RATING</span>
              </div>
              <div>
                <span className="text-[#9ca3af] block text-[10px]">AVAILABILITY</span>
                <span className="text-[#10b981] font-bold block mt-1">OPEN FOR ROLES</span>
              </div>
            </div>
          </div>

          {/* Floating Scroll Mouse Wheel Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none opacity-60">
            <div className="w-5 h-8 rounded-full border-2 border-white/40 flex justify-center p-1">
              <div className="w-1 h-2 bg-[#f59e0b] rounded-full animate-bounce" />
            </div>
            <span className="font-mono-jetbrains text-[9px] text-[#9ca3af] tracking-widest uppercase">
              SCROLL DOWN
            </span>
          </div>
        </section>

        {/* 3D PHILOSOPHY SECTION */}
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

        {/* ABOUT & BIOGRAPHY BLUEPRINT SECTION */}
        <AboutBlueprintSection identity={identity} skills={skills} />

        {/* WORK / PORTFOLIO SHOWCASE DECK */}
        <ProjectDeckSlider projects={projects} onOpenDetail={(p) => setSelectedProject(p)} />

        {/* INTERACTIVE CONTACT SECTION */}
        <ContactInteractiveSection identity={identity} />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#07080b] py-8 text-center font-mono-jetbrains text-xs text-[#9ca3af] relative z-10">
        <p>© {new Date().getFullYear()} Prajwal DL. All rights reserved. Full Stack Web Developer & Web Advisor.</p>
        <p className="text-[10px] text-neutral-500 mt-1">Built with Three.js WebGL & GSAP 3D Scrollytelling Architecture.</p>
      </footer>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Theme04Component;
