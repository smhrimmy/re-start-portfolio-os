import React, { useState } from 'react';
import { PortfolioIdentity } from '@/types/portfolio';

interface UplinkTabProps {
  identity: PortfolioIdentity | null;
  accentColor: string;
  onTransmissionSuccess: () => void;
}

export const UplinkTab: React.FC<UplinkTabProps> = ({ identity, accentColor, onTransmissionSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      onTransmissionSuccess();
      setTimeout(() => {
        setSent(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold font-mono text-white">UPLINK // TRANSMISSION CONSOLE</h2>
        <p className="text-xs font-mono text-[#91A0AD]">
          07 // TRANSMIT SIGNAL & DIRECT PORTAL COMMUNICATIONS
        </p>
      </div>

      <div className="pause-panel pause-bevel p-6 sm:p-8 space-y-6 font-mono">
        {sent ? (
          <div className="py-12 text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto text-xl">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white">SIGNAL SENT SUCCESSFULLY!</h3>
            <p className="text-xs text-[#91A0AD]">
              Transmission registered. Progression star unlocked in system HUD.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs text-[#91A0AD]">OPERATOR NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded bg-black/60 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors text-xs font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-[#91A0AD]">SIGNAL FREQUENCY (EMAIL)</label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded bg-black/60 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[#91A0AD]">TRANSMISSION CONTENT</label>
              <textarea
                rows={4}
                required
                placeholder="Enter project inquiry or message details..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded bg-black/60 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors text-xs font-mono resize-none"
              />
            </div>

            <button
              type="submit"
              className="pause-bevel w-full py-4 font-bold text-black tracking-wider text-xs cursor-pointer transition-transform transform hover:-translate-y-0.5"
              style={{ backgroundColor: accentColor }}
            >
              ▸ TRANSMIT SIGNAL
            </button>
          </form>
        )}
      </div>

      {/* Direct Communication Channels */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <a
          href={`mailto:${identity?.socialLinks?.email || 'dlprajwal008@gmail.com'}`}
          className="pause-panel pause-bevel p-4 text-center hover:border-white transition-colors"
        >
          <span className="text-[#91A0AD] block">EMAIL</span>
          <span className="font-bold text-white">Direct Mail</span>
        </a>
        <a
          href={identity?.socialLinks?.linkedin || 'https://linkedin.com'}
          target="_blank"
          rel="noreferrer"
          className="pause-panel pause-bevel p-4 text-center hover:border-white transition-colors"
        >
          <span className="text-[#91A0AD] block">LINKEDIN</span>
          <span className="font-bold text-white">Connect</span>
        </a>
        <a
          href={identity?.socialLinks?.github || 'https://github.com'}
          target="_blank"
          rel="noreferrer"
          className="pause-panel pause-bevel p-4 text-center hover:border-white transition-colors"
        >
          <span className="text-[#91A0AD] block">GITHUB</span>
          <span className="font-bold text-white">Code Hub</span>
        </a>
        <a
          href={identity?.resumeUrl || '/assets/resume.pdf'}
          download
          className="pause-panel pause-bevel p-4 text-center hover:border-white transition-colors"
        >
          <span className="text-[#91A0AD] block">RESUME</span>
          <span className="font-bold text-white">Download</span>
        </a>
      </div>
    </div>
  );
};
