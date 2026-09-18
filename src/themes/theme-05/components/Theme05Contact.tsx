import React, { useState } from 'react';
import { PortfolioIdentity } from '@/types/portfolio';

interface Theme05ContactProps {
  identity: PortfolioIdentity;
}

export const Theme05Contact: React.FC<Theme05ContactProps> = ({ identity }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const email = identity.socialLinks?.email || 'hello@praxel.space';
  const linkedin = identity.socialLinks?.linkedin || '#';
  const location = identity.location || 'Mangalore, India';

  return (
    <>
      <section id="contact" className="bg-[#0c0c0c] text-white pt-[130px] pb-[70px] relative">
        <div className="max-w-[1240px] mx-auto px-[6vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[70px] items-start">
            {/* Contact Left */}
            <div className="reveal in">
              <h2 className="font-display-anton text-[clamp(30px,5vw,50px)] leading-[1.1]">
                Let's create
                <span className="font-script-caveat text-[#c9a876] font-bold block text-[1.1em]">
                  something
                </span>
                meaningful.
              </h2>
              <p className="my-[20px] mb-[32px] text-[#8c8c8c] text-[14.5px] leading-[1.7] max-w-[400px]">
                Have a project in mind, a question, or simply want to talk about an idea? I'd love to hear from you.
              </p>

              {/* Info Cards */}
              <a
                href={`mailto:${email}`}
                className="info-card flex items-center gap-[16px] p-[18px_20px] rounded-[12px] bg-[#141414] border border-white/10 mb-[12px] transition-colors hover:border-[#c9a876] group"
              >
                <div className="w-[38px] h-[38px] rounded-full bg-white/[0.06] flex items-center justify-center text-[16px] flex-none">
                  ✉
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-semibold">Email me</div>
                  <div className="text-[12.5px] text-[#8c8c8c] mt-[2px]">{email}</div>
                </div>
                <div className="text-[16px] text-[#8c8c8c] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-[#c9a876] transition-all">
                  ↗
                </div>
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="info-card flex items-center gap-[16px] p-[18px_20px] rounded-[12px] bg-[#141414] border border-white/10 mb-[12px] transition-colors hover:border-[#c9a876] group"
              >
                <div className="w-[38px] h-[38px] rounded-full bg-white/[0.06] flex items-center justify-center text-[16px] flex-none">
                  in
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-semibold">Connect</div>
                  <div className="text-[12.5px] text-[#8c8c8c] mt-[2px]">LinkedIn</div>
                </div>
                <div className="text-[16px] text-[#8c8c8c] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-[#c9a876] transition-all">
                  ↗
                </div>
              </a>

              <div className="info-card flex items-center gap-[16px] p-[18px_20px] rounded-[12px] bg-[#141414] border border-white/10 mb-[12px] transition-colors hover:border-[#c9a876] group">
                <div className="w-[38px] h-[38px] rounded-full bg-white/[0.06] flex items-center justify-center text-[16px] flex-none">
                  📍
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-semibold">Based in</div>
                  <div className="text-[12.5px] text-[#8c8c8c] mt-[2px]">{location}</div>
                </div>
                <div className="text-[16px] text-[#8c8c8c] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-[#c9a876] transition-all">
                  ↗
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-[#141414] border border-white/10 rounded-[14px] p-[28px] reveal in"
            >
              <div className="mb-[18px]">
                <label className="block text-[11px] tracking-[0.08em] uppercase text-[#8c8c8c] mb-[8px]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full bg-transparent border-0 border-b border-white/10 text-white font-sans text-[14px] py-[8px] focus:outline-none focus:border-[#c9a876] transition-colors"
                />
              </div>

              <div className="mb-[18px]">
                <label className="block text-[11px] tracking-[0.08em] uppercase text-[#8c8c8c] mb-[8px]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full bg-transparent border-0 border-b border-white/10 text-white font-sans text-[14px] py-[8px] focus:outline-none focus:border-[#c9a876] transition-colors"
                />
              </div>

              <div className="mb-[18px]">
                <label className="block text-[11px] tracking-[0.08em] uppercase text-[#8c8c8c] mb-[8px]">
                  Message
                </label>
                <textarea
                  placeholder="Tell me about your project..."
                  required
                  className="w-full bg-transparent border-0 border-b border-white/10 text-white font-sans text-[14px] py-[8px] min-h-[90px] resize-none focus:outline-none focus:border-[#c9a876] transition-colors"
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: submitted ? '#c9a876' : '#ffffff' }}
                className="w-full text-[#0c0c0c] border-0 py-[15px] rounded-[50px] text-[13px] tracking-[0.05em] font-bold cursor-pointer mt-[6px] transition-colors duration-300 hover:bg-[#c9a876] min-h-[44px]"
              >
                {submitted ? 'Message Sent ✓' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-[30px] px-[6vw] flex justify-between text-[#8c8c8c] text-[11px] tracking-[0.08em] uppercase border-t border-white/10">
        <span>© 2026 {identity.name || 'Prajwal DL'}</span>
        <span>{location}</span>
      </footer>
    </>
  );
};

