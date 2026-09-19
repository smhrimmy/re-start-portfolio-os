import React, { useState } from 'react';
import { CharacterAvatar } from './CharacterAvatar';
import { PortfolioIdentity } from '@/types/portfolio';

interface ContactPortalProps {
  identity: PortfolioIdentity | null;
}

export const ContactPortal: React.FC<ContactPortalProps> = ({ identity }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  return (
    <section className="relative py-24 px-6 max-w-7xl mx-auto z-10">
      {/* Section Title */}
      <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-xs font-mono tracking-widest text-[#D8955D] uppercase">
          05 // INITIATE TRANSMISSION
        </h2>
        <h3 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          HAVE AN IDEA WORTH BUILDING?
        </h3>
        <p className="text-[#91A0AD] text-sm">
          Let’s collaborate on next-generation web applications, 3D interfaces, or architectural systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Character Avatar in Builder Mode Pose */}
        <div className="lg:col-span-5 flex justify-center">
          <CharacterAvatar mode="builder" className="w-full max-w-sm" />
        </div>

        {/* Right Column: Contact Form & Social Portals */}
        <div className="lg:col-span-7 space-y-8">
          <div className="architect-glass p-8 sm:p-10 space-y-6">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h4 className="text-2xl font-serif font-bold text-white">Transmission Sent!</h4>
                <p className="text-sm text-[#91A0AD]">
                  Thank you for reaching out. I will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#91A0AD]">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#249BFF] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#91A0AD]">YOUR EMAIL</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#249BFF] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#91A0AD]">PROJECT DETAILS / INQUIRY</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, timeline, and vision..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#249BFF] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#249BFF] via-[#69D9FF] to-[#D8955D] text-[#07090D] font-bold tracking-wider hover:shadow-[0_0_30px_rgba(36,155,255,0.4)] transition-all duration-300"
                >
                  TRANSMIT MESSAGE
                </button>
              </form>
            )}
          </div>

          {/* Direct Social Portals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <a
              href={`mailto:${identity?.socialLinks?.email || 'dlprajwal008@gmail.com'}`}
              className="architect-glass p-4 text-center hover:border-[#249BFF] transition-all"
            >
              <span className="text-xs font-mono text-[#69D9FF] block">EMAIL</span>
              <span className="text-sm font-semibold text-white">Direct Mail</span>
            </a>
            <a
              href={identity?.socialLinks?.linkedin || 'https://linkedin.com'}
              target="_blank"
              rel="noreferrer"
              className="architect-glass p-4 text-center hover:border-[#249BFF] transition-all"
            >
              <span className="text-xs font-mono text-[#69D9FF] block">LINKEDIN</span>
              <span className="text-sm font-semibold text-white">Connect</span>
            </a>
            <a
              href={identity?.socialLinks?.github || 'https://github.com'}
              target="_blank"
              rel="noreferrer"
              className="architect-glass p-4 text-center hover:border-[#249BFF] transition-all"
            >
              <span className="text-xs font-mono text-[#69D9FF] block">GITHUB</span>
              <span className="text-sm font-semibold text-white">Code Hub</span>
            </a>
            <a
              href={identity?.resumeUrl || '/assets/resume.pdf'}
              download
              className="architect-glass p-4 text-center hover:border-[#D8955D] transition-all"
            >
              <span className="text-xs font-mono text-[#D8955D] block">RESUME</span>
              <span className="text-sm font-semibold text-white">Download</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
