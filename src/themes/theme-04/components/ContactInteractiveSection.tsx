import React, { useState } from 'react';
import { PortfolioIdentity } from '@/types/portfolio';
import { Send, CheckCircle2, AlertCircle, Github, Linkedin, Mail, Twitter, MapPin } from 'lucide-react';
import { soundSynth } from '../soundSynth';

interface ContactInteractiveSectionProps {
  identity: PortfolioIdentity;
}

export const ContactInteractiveSection: React.FC<ContactInteractiveSectionProps> = ({ identity }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'delivering' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundSynth.playClick(700);

    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) newErrors.name = 'Please enter your name.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Please enter a valid email address.';
    if (!message.trim()) newErrors.message = 'Please enter your message.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('delivering');

    setTimeout(() => {
      setStatus('success');
      soundSynth.playSuccess();
    }, 1200);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setStatus('idle');
  };

  return (
    <section id="contact" className="w-full space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <span className="font-mono-jetbrains text-xs text-[#f59e0b] uppercase tracking-wider block mb-1">
          SAY HELLO 👋 // INITIATE CONTACT
        </span>
        <h2 className="font-space-grotesk text-3xl sm:text-5xl font-bold text-white">
          Contact Me
        </h2>
      </div>

      <div className="spatial-card p-6 sm:p-10 border-[#f59e0b]/40 relative overflow-hidden">
        {status === 'delivering' ? (
          <div className="min-h-[360px] flex flex-col items-center justify-center space-y-4 font-mono-jetbrains">
            <div className="w-12 h-12 border-4 border-[#f59e0b] border-t-transparent rounded-full animate-spin" />
            <h3 className="text-xl font-bold text-white">Delivering...</h3>
            <p className="text-xs text-[#9ca3af]">Encrypting payload and transmitting telemetry to Prajwal DL.</p>
          </div>
        ) : status === 'success' ? (
          <div className="min-h-[360px] flex flex-col items-center justify-center space-y-6 font-mono-jetbrains text-center">
            <div className="w-16 h-16 bg-[#10b981]/20 border-2 border-[#10b981] rounded-full flex items-center justify-center text-[#10b981]">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Message Transmitted!</h3>
              <p className="text-xs text-[#9ca3af] max-w-md leading-relaxed">
                Thank you, {name}! Your message has been received. I will respond to {email} shortly.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="amber-glow-pill px-6 py-3 rounded-xl text-xs font-bold"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2 font-mono-jetbrains">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="contact-name" className="text-neutral-300 font-bold">
                    Name :
                  </label>
                  {errors.name && (
                    <span className="text-[#ef4444] text-[11px] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </span>
                  )}
                </div>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Prajwal DL"
                  className="w-full bg-[#111319] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#f59e0b] transition-colors"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2 font-mono-jetbrains">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="contact-email" className="text-neutral-300 font-bold">
                    Email :
                  </label>
                  {errors.email && (
                    <span className="text-[#ef4444] text-[11px] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </span>
                  )}
                </div>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pdlkpt@gmail.com"
                  className="w-full bg-[#111319] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#f59e0b] transition-colors"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2 font-mono-jetbrains">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="contact-message" className="text-neutral-300 font-bold">
                  Message :
                </label>
                {errors.message && (
                  <span className="text-[#ef4444] text-[11px] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </span>
                )}
              </div>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let's build something awesome together..."
                className="w-full bg-[#111319] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#f59e0b] transition-colors"
              />
            </div>

            {/* Social Links & Submit Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-white/10 font-mono-jetbrains">
              {/* Direct Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href={identity.socialLinks?.github || 'https://github.com/smhrimmy'}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundSynth.playHover()}
                  className="p-2.5 bg-[#111319] hover:bg-white/10 border border-white/15 text-[#9ca3af] hover:text-[#f59e0b] rounded-xl transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${identity.socialLinks?.email || 'pdlkpt@gmail.com'}`}
                  onMouseEnter={() => soundSynth.playHover()}
                  className="p-2.5 bg-[#111319] hover:bg-white/10 border border-white/15 text-[#9ca3af] hover:text-[#00f0ff] rounded-xl transition-colors"
                  title="Send Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>

                <a
                  href={identity.socialLinks?.linkedin || 'https://linkedin.com/in/prajwal-d-l-118198370/'}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundSynth.playHover()}
                  className="p-2.5 bg-[#111319] hover:bg-white/10 border border-white/15 text-[#9ca3af] hover:text-[#00f0ff] rounded-xl transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                {identity.socialLinks?.twitter && (
                  <a
                    href={identity.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundSynth.playHover()}
                    className="p-2.5 bg-[#111319] hover:bg-white/10 border border-white/15 text-[#9ca3af] hover:text-[#f59e0b] rounded-xl transition-colors"
                    title="Twitter / X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onMouseEnter={() => soundSynth.playHover()}
                className="amber-glow-pill px-8 py-3.5 rounded-xl font-bold text-xs inline-flex items-center gap-2 min-h-[44px] w-full sm:w-auto justify-center"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
