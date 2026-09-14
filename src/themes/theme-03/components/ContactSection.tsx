import React, { useState } from 'react';
import { PortfolioIdentity } from '@/types/portfolio';
import { Mail, Github, Linkedin, MapPin, Send, Check } from 'lucide-react';

interface ContactSectionProps {
  identity?: PortfolioIdentity;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ identity }) => {
  const [copied, setCopied] = useState(false);
  const email = identity?.socialLinks?.email || "pdlkpt@gmail.com";
  const location = identity?.location || "Mangalore, Karnataka, India";
  const github = identity?.socialLinks?.github || "https://github.com/smhrimmy";
  const linkedin = identity?.socialLinks?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full mt-12 mb-8">
      <div className="bg-[#F1EDFF] rounded-[24px] p-8 sm:p-10 text-[#18203A] border border-[#3054DE]/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Left Text Column */}
          <div className="flex flex-col gap-3 max-w-[500px]">
            <h2 className="font-serif-instrument text-[2.8rem] sm:text-[3.5rem] font-normal leading-none text-[#18203A]">
              Work with me
            </h2>
            <p className="font-sans-satoshi text-[1.05rem] text-[#536083] m-0">
              Have a project in mind? Let’s talk.
            </p>
            <div className="flex items-center gap-2 text-xs font-sans-satoshi font-medium text-[#536083] mt-2">
              <MapPin className="w-4 h-4 text-[#3054DE]" />
              <span>{location}</span>
            </div>
          </div>

          {/* Right Action Column */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="glossy-navy-pill px-6 py-3 text.sm font-medium font-sans-satoshi inline-flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send an Email
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-5 py-3 bg-white text-[#18203A] hover:bg-white/80 border border-[#18203A]/15 rounded-full text-sm font-medium font-sans-satoshi inline-flex items-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Mail className="w-4 h-4 text-[#3054DE]" />}
                {copied ? 'Copied Email!' : 'Copy Email Address'}
              </button>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-sans-satoshi font-medium text-[#536083] hover:text-[#3054DE] transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-sans-satoshi font-medium text-[#536083] hover:text-[#3054DE] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
