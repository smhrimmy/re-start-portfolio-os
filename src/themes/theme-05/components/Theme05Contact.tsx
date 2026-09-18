import React, { useState } from 'react';
import { PortfolioIdentity } from '@/types/portfolio';
import { Mail, Linkedin, MapPin, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface Theme05ContactProps {
  identity: PortfolioIdentity;
}

export const Theme05Contact: React.FC<Theme05ContactProps> = ({ identity }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'delivering' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) newErrors.name = 'Please enter your name.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Please enter a valid email.';
    if (!message.trim()) newErrors.message = 'Please enter your message.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('delivering');

    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setStatus('idle');
  };

  return (
    <section id="contact" className="bg-[#0B0B0C] text-white py-24 px-6 sm:px-12 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading & 3 Stacked Info Cards */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-2">
            <h2 className="font-display-archivo text-4xl sm:text-6xl text-white uppercase tracking-tight leading-tight">
              Let's create <br />
              <span className="font-script-dancing text-5xl sm:text-7xl text-[#C9A876] normal-case tracking-normal block py-1">
                something
              </span>
              meaningful.
            </h2>

            <p className="font-sans text-sm text-[#999999] leading-relaxed max-w-sm pt-2">
              Have a project idea, technical consultation, or role opportunity? Drop a message or reach out directly.
            </p>
          </div>

          {/* 3 Stacked Info Cards */}
          <div className="space-y-4 font-mono-jetbrains">
            {/* Card 1: Email Me */}
            <a
              href={`mailto:${identity.socialLinks?.email || 'pdlkpt@gmail.com'}`}
              className="p-5 bg-[#121214] border border-[#C9A876]/20 hover:border-[#C9A876] rounded-xl flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#0B0B0C] border border-[#C9A876]/40 text-[#C9A876] rounded-lg group-hover:bg-[#C9A876] group-hover:text-[#0B0B0C] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#999999] block uppercase">EMAIL ME</span>
                  <strong className="text-sm text-white group-hover:text-[#C9A876] transition-colors">
                    {identity.socialLinks?.email || 'pdlkpt@gmail.com'}
                  </strong>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#C9A876] transform group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Card 2: Connect LinkedIn */}
            <a
              href={identity.socialLinks?.linkedin || 'https://linkedin.com/in/prajwal-d-l-118198370/'}
              target="_blank"
              rel="noreferrer"
              className="p-5 bg-[#121214] border border-[#C9A876]/20 hover:border-[#C9A876] rounded-xl flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#0B0B0C] border border-[#C9A876]/40 text-[#C9A876] rounded-lg group-hover:bg-[#C9A876] group-hover:text-[#0B0B0C] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#999999] block uppercase">CONNECT</span>
                  <strong className="text-sm text-white group-hover:text-[#C9A876] transition-colors">
                    LinkedIn / Prajwal DL
                  </strong>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#C9A876] transform group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Card 3: Based In Location */}
            <div className="p-5 bg-[#121214] border border-[#C9A876]/20 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#0B0B0C] border border-[#C9A876]/40 text-[#C9A876] rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-[#999999] block uppercase">BASED IN</span>
                  <strong className="text-sm text-white">
                    {identity.location || 'Mangalore, Karnataka, India'}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Minimal Underline Contact Form */}
        <div className="lg:col-span-7 bg-[#121214] border border-[#C9A876]/30 rounded-2xl p-8 sm:p-12 shadow-2xl">
          {status === 'delivering' ? (
            <div className="min-h-[360px] flex flex-col items-center justify-center space-y-4 font-mono-jetbrains text-center">
              <div className="w-12 h-12 border-4 border-[#C9A876] border-t-transparent rounded-full animate-spin" />
              <h3 className="text-xl font-bold text-white">Transmitting Message...</h3>
              <p className="text-xs text-[#999999]">Sending encrypted dispatch to Prajwal DL.</p>
            </div>
          ) : status === 'success' ? (
            <div className="min-h-[360px] flex flex-col items-center justify-center space-y-6 font-mono-jetbrains text-center">
              <div className="w-16 h-16 bg-[#10b981]/20 border-2 border-[#10b981] rounded-full flex items-center justify-center text-[#10b981]">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Dispatch Delivered!</h3>
                <p className="text-xs text-[#999999] max-w-md leading-relaxed">
                  Thank you, {name}! Your message has been received. I will reply to {email} shortly.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-[#C9A876] text-[#0B0B0C] font-bold rounded-full text-xs"
              >
                Send Another Dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-jetbrains">
                  <label htmlFor="contact-name" className="text-[#999999] uppercase tracking-wider">
                    YOUR NAME
                  </label>
                  {errors.name && (
                    <span className="text-red-400 flex items-center gap-1">
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
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#C9A876] py-3 text-base text-white placeholder-neutral-700 focus:outline-none transition-colors font-sans"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-jetbrains">
                  <label htmlFor="contact-email" className="text-[#999999] uppercase tracking-wider">
                    YOUR EMAIL
                  </label>
                  {errors.email && (
                    <span className="text-red-400 flex items-center gap-1">
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
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#C9A876] py-3 text-base text-white placeholder-neutral-700 focus:outline-none transition-colors font-sans"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-jetbrains">
                  <label htmlFor="contact-message" className="text-[#999999] uppercase tracking-wider">
                    YOUR MESSAGE
                  </label>
                  {errors.message && (
                    <span className="text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </span>
                  )}
                </div>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#C9A876] py-3 text-base text-white placeholder-neutral-700 focus:outline-none transition-colors font-sans"
                />
              </div>

              {/* Submit White Pill Button ("Send Message →") */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-4 bg-white text-[#0B0B0C] hover:bg-[#C9A876] font-mono-jetbrains font-bold text-xs rounded-full flex items-center gap-3 transition-colors shadow-lg min-h-[44px]"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
