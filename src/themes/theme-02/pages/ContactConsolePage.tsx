import React, { useState } from 'react';
import { Mail, Send, ShieldCheck, Terminal } from 'lucide-react';
import { ControlDeckButton } from '../components/ControlDeckButton';
import { ControlDeckToastContainer, ToastMessage } from '../components/ControlDeckToast';
import { getTheme02StoreData } from '../utils/theme02DataAdapter';

export const ContactConsolePage: React.FC = () => {
  const [adminData] = useState(() => getTheme02StoreData());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [transmitting, setTransmitting] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTransmitting(true);

    setTimeout(() => {
      setTransmitting(false);
      const newToast: ToastMessage = {
        id: Date.now().toString(),
        type: 'success',
        title: 'TRANSMISSION SUCCESSFUL',
        message: 'Message dispatched to operator console. Acknowledgment sent.',
      };
      setToasts((prev) => [...prev, newToast]);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0D10] text-[#C9D1D9] font-mono py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      {/* Toast HUD */}
      <ControlDeckToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Header Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363D] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-bold mb-1">
            <Mail className="w-4 h-4" />
            <span>[COMMS_TRANSMISSION_CONSOLE]</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            LET'S <span className="text-[#00F0FF]">TALK</span> // TRANSMIT PACKET
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#8B949E]">
          <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
          <span>ENCRYPTED ENDPOINT</span>
        </div>
      </div>

      {/* Main Transmission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-8 bg-[#161B22] border border-[#30363D] p-6 rounded-sm space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#30363D] pb-2 text-xs">
            <span className="font-bold text-[#00F0FF]">[PACKET_COMPOSITION]</span>
            <span className="text-[#8B949E]">READY</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-[#8B949E] uppercase">SENDER_NAME *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-3 py-2 bg-[#0A0D10] border border-[#30363D] focus:border-[#00F0FF] text-xs text-[#C9D1D9] rounded-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#8B949E] uppercase">SENDER_EMAIL *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-3 py-2 bg-[#0A0D10] border border-[#30363D] focus:border-[#00F0FF] text-xs text-[#C9D1D9] rounded-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-[#8B949E] uppercase">TRANSMISSION_SUBJECT</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Project Inquiry / Advisory / Partnership"
              className="w-full px-3 py-2 bg-[#0A0D10] border border-[#30363D] focus:border-[#00F0FF] text-xs text-[#C9D1D9] rounded-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-[#8B949E] uppercase">PAYLOAD_BODY *</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="State project requirements, scope parameters, or system architecture details..."
              className="w-full px-3 py-2 bg-[#0A0D10] border border-[#30363D] focus:border-[#00F0FF] text-xs text-[#C9D1D9] rounded-sm focus:outline-none"
            />
          </div>

          <ControlDeckButton
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
            disabled={transmitting}
            icon={<Send className="w-4 h-4" />}
          >
            {transmitting ? 'DISPATCHING TRANSMISSION...' : 'TRANSMIT PACKET NOW'}
          </ControlDeckButton>
        </form>

        {/* Telemetry Contact Details Sidebar */}
        <div className="lg:col-span-4 bg-[#161B22] border border-[#30363D] p-6 rounded-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#30363D] pb-2 text-xs font-bold text-[#00F0FF]">
            <Terminal className="w-4 h-4" />
            <span>[DIRECT_ENDPOINTS]</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#0A0D10] border border-[#30363D] rounded-sm space-y-1">
              <div className="text-[10px] text-[#8B949E]">EMAIL ADVISORY</div>
              <div className="font-bold text-[#00F0FF]">{adminData.ownerProfile.email}</div>
            </div>

            <div className="p-3 bg-[#0A0D10] border border-[#30363D] rounded-sm space-y-1">
              <div className="text-[10px] text-[#8B949E]">GITHUB REPOSITORY</div>
              <div className="font-bold text-white">{adminData.ownerProfile.github}</div>
            </div>

            <div className="p-3 bg-[#0A0D10] border border-[#30363D] rounded-sm space-y-1">
              <div className="text-[10px] text-[#8B949E]">RESPONSE LATENCY</div>
              <div className="font-bold text-[#FF9F1C]">&lt; 12 HOURS AVERAGE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
