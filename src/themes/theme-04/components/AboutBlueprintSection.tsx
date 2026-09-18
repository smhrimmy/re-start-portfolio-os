import React from 'react';
import { PortfolioIdentity, SkillCategory } from '@/types/portfolio';
import { Code2, Globe, Database, Cpu, Wrench, RefreshCw, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundSynth } from '../soundSynth';

interface AboutBlueprintSectionProps {
  identity: PortfolioIdentity;
  skills: SkillCategory[];
}

export const AboutBlueprintSection: React.FC<AboutBlueprintSectionProps> = ({ identity, skills }) => {
  return (
    <section id="about" className="w-full space-y-8">
      <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono-jetbrains text-xs text-[#00f0ff] uppercase tracking-wider block mb-1">
            CHAPTER 02 // BIOGRAPHY & BLUEPRINT
          </span>
          <h2 className="font-space-grotesk text-3xl sm:text-5xl font-bold text-white">
            About & System Architecture
          </h2>
        </div>
        <p className="font-mono-jetbrains text-xs text-[#9ca3af] max-w-xs">
          Interactive SVG blueprint matrix with live telemetry scan line.
        </p>
      </div>

      {/* Main SVG Blueprint Container Frame */}
      <div className="relative w-full bg-[#0d1017]/90 border border-[#00f0ff]/30 rounded-2xl p-6 sm:p-10 backdrop-blur-md overflow-hidden shadow-2xl space-y-10">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* TOP PROFILE HEADER BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Avatar Box with Scanline */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-44 h-52 bg-[#111622] border-2 border-[#00f0ff] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.25)] group">
              <img
                src={identity.avatarUrl || "https://avatars.githubusercontent.com/u/244284914?v=4"}
                alt={identity.name}
                className="w-full h-full object-cover filter brightness-105 contrast-110 group-hover:scale-105 transition-transform duration-500"
              />
              {/* Scanline Animation Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f0ff]/30 to-transparent h-12 w-full animate-[bounce_3s_infinite_ease-in-out] pointer-events-none border-b border-[#00f0ff]" />
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-xs rounded text-[10px] font-mono-jetbrains text-[#00f0ff] text-center font-bold">
                SYSTEM OPERATOR // ID-24428
              </div>
            </div>
          </div>

          {/* Profile Details Matrix */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/40 rounded-full font-mono-jetbrains text-xs text-[#00f0ff]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FULL STACK DEVELOPER & WEB ADVISOR</span>
            </div>

            <h3 className="font-space-grotesk text-3xl font-bold text-white">
              {identity.name || 'Prajwal DL'}
            </h3>

            <p className="font-sans text-sm text-[#9ca3af] leading-relaxed max-w-2xl">
              {identity.bio || 'Dedicated Web Advisor and Full Stack Developer specializing in React.js, TypeScript, WordPress support, DNS management, and cloud hosting infrastructure.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono-jetbrains text-xs">
              <div className="p-3 bg-[#111319] rounded-lg border border-white/10">
                <span className="text-[#9ca3af] block text-[10px]">LOCATION</span>
                <strong className="text-white text-xs block mt-0.5">{identity.location || 'Mangalore, India'}</strong>
              </div>
              <div className="p-3 bg-[#111319] rounded-lg border border-white/10">
                <span className="text-[#9ca3af] block text-[10px]">SPECIALIZATION</span>
                <strong className="text-[#f59e0b] text-xs block mt-0.5">Full Stack & DNS</strong>
              </div>
              <div className="p-3 bg-[#111319] rounded-lg border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-[#9ca3af] block text-[10px]">CLIENT RATING</span>
                <strong className="text-[#10b981] text-xs block mt-0.5">5.0 / 5.0 Star</strong>
              </div>
            </div>
          </div>
        </div>

        {/* BLUEPRINT SKILLS MATRIX */}
        <div className="relative z-10 pt-6 border-t border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-mono-jetbrains text-sm font-bold text-[#f59e0b] tracking-wider uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#f59e0b]" />
              <span>TECHNICAL BLUEPRINT MATRIX</span>
            </h4>
            <span className="font-mono-jetbrains text-[11px] text-[#9ca3af]">28 CATEGORIZED CAPABILITIES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category 1: Frontend Systems */}
            <div
              onMouseEnter={() => soundSynth.playHover()}
              className="p-5 bg-[#111622] border border-[#00f0ff]/30 rounded-xl space-y-3 hover:border-[#00f0ff] transition-colors"
            >
              <div className="flex items-center gap-2 text-[#00f0ff] font-mono-jetbrains text-xs font-bold">
                <Code2 className="w-4 h-4" />
                <span>FRONTEND SYSTEMS</span>
              </div>
              <ul className="space-y-2 font-mono-jetbrains text-xs text-neutral-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" /> React.js & TypeScript</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" /> Tailwind CSS & Modern UI</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" /> HTML5 & CSS3 Standards</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" /> WebGL & 3D Canvas</li>
              </ul>
            </div>

            {/* Category 2: Hosting & DNS Infrastructure */}
            <div
              onMouseEnter={() => soundSynth.playHover()}
              className="p-5 bg-[#111622] border border-[#f59e0b]/30 rounded-xl space-y-3 hover:border-[#f59e0b] transition-colors"
            >
              <div className="flex items-center gap-2 text-[#f59e0b] font-mono-jetbrains text-xs font-bold">
                <Globe className="w-4 h-4" />
                <span>HOSTING & DNS INFRASTRUCTURE</span>
              </div>
              <ul className="space-y-2 font-mono-jetbrains text-xs text-neutral-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#f59e0b]" /> DNS Record Management</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#f59e0b]" /> Zero-Downtime Migrations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#f59e0b]" /> WordPress & CMS Support</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#f59e0b]" /> SSL & Email Handshakes</li>
              </ul>
            </div>

            {/* Category 3: APIs & Tooling */}
            <div
              onMouseEnter={() => soundSynth.playHover()}
              className="p-5 bg-[#111622] border border-[#10b981]/30 rounded-xl space-y-3 hover:border-[#10b981] transition-colors"
            >
              <div className="flex items-center gap-2 text-[#10b981] font-mono-jetbrains text-xs font-bold">
                <Wrench className="w-4 h-4" />
                <span>APIS & DIAGNOSTICS</span>
              </div>
              <ul className="space-y-2 font-mono-jetbrains text-xs text-neutral-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" /> REST API Integration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" /> Domain Diagnostic Suite</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" /> Technical Troubleshooting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" /> AI Customer Support OS</li>
              </ul>
            </div>
          </div>
        </div>

        {/* THREE RETRO BADGE HIGHLIGHT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-sans text-xs">
          <div className="p-4 bg-[#111319] rounded-xl border border-white/10 flex items-start gap-3">
            <div className="p-2 bg-[#00f0ff]/10 text-[#00f0ff] rounded-lg shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white font-bold block mb-0.5">FULL STACK MASTERY</strong>
              <p className="text-[#9ca3af] text-[11px] leading-relaxed">
                Building responsive frontends and scalable APIs with clean maintainable code.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#111319] rounded-xl border border-white/10 flex items-start gap-3">
            <div className="p-2 bg-[#f59e0b]/10 text-[#f59e0b] rounded-lg shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white font-bold block mb-0.5">SYSTEM RELIABILITY</strong>
              <p className="text-[#9ca3af] text-[11px] leading-relaxed">
                Resolving hosting, SSL, and server DNS challenges with technical precision.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#111319] rounded-xl border border-white/10 flex items-start gap-3">
            <div className="p-2 bg-[#10b981]/10 text-[#10b981] rounded-lg shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white font-bold block mb-0.5">CONTINUOUS ENHANCEMENT</strong>
              <p className="text-[#9ca3af] text-[11px] leading-relaxed">
                Quick learner adapting to modern AI workflows and high-performance WebGL frameworks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
