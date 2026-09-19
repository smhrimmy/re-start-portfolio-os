import React, { useState } from 'react';
import { PortfolioIdentity } from '@/types/portfolio';
import { Send, CheckCircle2, AlertCircle, Mail, Github, Linkedin, MapPin } from 'lucide-react';

interface ContactSectionProps {
  identity: PortfolioIdentity;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ identity }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 3500);
  };

  const emailAddr = identity.socialLinks?.email || 'pdlkpt@gmail.com';
  const github = identity.socialLinks?.github || 'https://github.com/smhrimmy';
  const linkedin = identity.socialLinks?.linkedin || 'https://linkedin.com/in/prajwal-d-l-118198370/';
  const location = identity.location || 'Mangalore, India';

  return (
    <section id="contact" className="contact-section quiet-entrance relative z-10 py-24 px-6 sm:px-12 bg-[#F5F3F0]">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF] block font-sans-satoshi">
            05 // INITIATE CONTACT
          </span>
          <h2 className="section-title text-4xl sm:text-6xl font-serif-instrument font-bold text-[#1A1A1A] mb-2">
            Let's Connect & Build
          </h2>
          <p className="text-base sm:text-lg text-[#5C5C5C] font-sans-satoshi max-w-xl mx-auto">
            Have a project in mind, contract opportunity, or technical inquiry? Drop a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Cards */}
          <div className="lg:col-span-5 space-y-4 font-sans-satoshi">
            <a
              href={`mailto:${emailAddr}`}
              className="glass-card p-5 rounded-xl flex items-center gap-4 hover:border-[#0066FF]/40 transition-all group"
            >
              <div className="p-3 bg-[#0066FF]/10 text-[#0066FF] rounded-lg group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-[#A0A0A0] block font-bold uppercase">Email Me</span>
                <strong className="text-sm text-[#1A1A1A] group-hover:text-[#0066FF] transition-colors">
                  {emailAddr}
                </strong>
              </div>
            </a>

            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="glass-card p-5 rounded-xl flex items-center gap-4 hover:border-[#0066FF]/40 transition-all group"
            >
              <div className="p-3 bg-black/5 text-[#1A1A1A] rounded-lg group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-[#A0A0A0] block font-bold uppercase">GitHub</span>
                <strong className="text-sm text-[#1A1A1A] group-hover:text-[#0066FF] transition-colors">
                  github.com/smhrimmy
                </strong>
              </div>
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass-card p-5 rounded-xl flex items-center gap-4 hover:border-[#0066FF]/40 transition-all group"
            >
              <div className="p-3 bg-[#0066FF]/10 text-[#0066FF] rounded-lg group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-[#A0A0A0] block font-bold uppercase">LinkedIn</span>
                <strong className="text-sm text-[#1A1A1A] group-hover:text-[#0066FF] transition-colors">
                  Prajwal DL
                </strong>
              </div>
            </a>

            <div className="glass-card p-5 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-black/5 text-[#5C5C5C] rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-[#A0A0A0] block font-bold uppercase">Based In</span>
                <strong className="text-sm text-[#1A1A1A]">{location}</strong>
              </div>
            </div>
          </div>

          {/* Right Form Block */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-2xl">
            {submitted ? (
              <div className="min-h-[280px] flex flex-col items-center justify-center space-y-4 text-center font-sans-satoshi">
                <CheckCircle2 className="w-12 h-12 text-[#10B981] animate-bounce" />
                <h3 className="text-2xl font-serif-instrument font-bold text-[#1A1A1A]">Message Received!</h3>
                <p className="text-sm text-[#5C5C5C]">
                  Thank you! Your message has been sent to Prajwal DL.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans-satoshi">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#5C5C5C] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Prajwal DL"
                    required
                    className="glass-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#5C5C5C] mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="pdlkpt@gmail.com"
                    required
                    className="glass-input w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#5C5C5C] mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project or opportunity..."
                    required
                    className="glass-input w-full resize-none"
                  />
                </div>

                {error && (
                  <div className="text-xs text-[#EF4444] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
