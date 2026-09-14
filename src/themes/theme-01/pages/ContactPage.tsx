import React, { useState } from 'react';
import { EditorialButton } from '../components/EditorialButton';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactPageProps {
  onShowToast: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('PLEASE COMPLETE ALL MANDATORY FORM FIELDS BEFORE SUBMITTING.');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      onShowToast('CONTACT INQUIRY SUBMITTED TO EDITION ARCHIVE');
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Editorial Final Page CTA Header */}
      <div className="border-b border-[#111111] pb-10 mb-16">
        <span className="font-mono text-xs text-[#8B0000] tracking-widest uppercase mb-3 block">
          CHAPTER 07 // FINAL ISSUE PAGE
        </span>
        <h1 className="theme-01-display text-5xl sm:text-7xl font-bold tracking-tight text-[#111111] leading-none mb-6">
          LET’S TALK.
        </h1>
        <p className="text-base text-[#555555] font-light max-w-xl leading-relaxed">
          Available for technical web advisory, systems architecture consulting, and high-performance React/Node project development.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-white border border-[#E2E0D8] p-8 space-y-6">
          <span className="font-mono text-xs font-bold text-[#8B0000] tracking-widest uppercase block border-b border-[#E2E0D8] pb-2">
            DIRECT INQUIRY CHANNELS
          </span>

          <div className="space-y-4 font-mono text-xs text-[#111111]">
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-[#8B0000] mt-0.5" />
              <div>
                <span className="text-[#999999] text-[10px] block">MOBILE PHONE</span>
                <span className="font-bold">+91 8105561638</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={16} className="text-[#8B0000] mt-0.5" />
              <div>
                <span className="text-[#999999] text-[10px] block">EMAIL ADDRESS</span>
                <span className="font-bold">pdlkpt@gmail.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-[#8B0000] mt-0.5" />
              <div>
                <span className="text-[#999999] text-[10px] block">LOCATION</span>
                <span className="font-bold">Mangalore, Karnataka, India</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E2E0D8] pt-4 font-mono text-[10px] text-[#666666]">
            AVAILABILITY: OPEN FOR Q3/Q4 CONSULTING & DEVELOPMENT CONTRACTS
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#F9F8F6] border border-[#111111] p-8">
          <h3 className="theme-01-display text-2xl font-bold mb-6">Send Publication Message</h3>

          {status === 'success' ? (
            <div className="bg-white border border-[#15803D] p-6 text-center space-y-3">
              <CheckCircle size={32} className="text-[#15803D] mx-auto" />
              <h4 className="theme-01-display text-xl font-bold text-[#111111]">Inquiry Transmitted</h4>
              <p className="text-xs text-[#666666] font-mono">
                Thank you. Your inquiry has been registered. You will receive a response within 24 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="font-mono text-xs text-[#8B0000] font-bold underline"
              >
                SEND ANOTHER MESSAGE →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="bg-red-50 border border-[#B91C1C] p-3 text-[#B91C1C] font-mono text-xs flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="font-mono text-xs font-bold text-[#111111] block mb-2">
                  01 / YOUR NAME *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-white border border-[#E2E0D8] focus:border-[#111111] px-4 py-3 font-mono text-xs text-[#111111] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="font-mono text-xs font-bold text-[#111111] block mb-2">
                  02 / EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. eleanor@publication.org"
                  className="w-full bg-white border border-[#E2E0D8] focus:border-[#111111] px-4 py-3 font-mono text-xs text-[#111111] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="font-mono text-xs font-bold text-[#111111] block mb-2">
                  03 / PROJECT DETAILS & INQUIRY *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe project scope, timeline, or technical consultation needs..."
                  className="w-full bg-white border border-[#E2E0D8] focus:border-[#111111] px-4 py-3 font-mono text-xs text-[#111111] outline-none transition-colors resize-none"
                />
              </div>

              <EditorialButton
                type="submit"
                variant="primary"
                size="lg"
                isLoading={status === 'submitting'}
                className="w-full"
              >
                TRANSMIT INQUIRY →
              </EditorialButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
