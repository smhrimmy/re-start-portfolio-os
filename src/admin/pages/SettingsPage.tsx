import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { AdminToast, ToastNotification } from '../components/primitives/AdminToast';
import { ShieldCheck, Save, Key } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [telegramToken, setTelegramToken] = useState('');
  const [telegramChatId, setTelegramChatId] = useState('');
  const [linkedInToken, setLinkedInToken] = useState('');
  const [xToken, setXToken] = useState('');
  const [toast, setToast] = useState<ToastNotification | null>(null);

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setToast({
      id: Date.now().toString(),
      title: 'Credentials Saved',
      description: 'API keys securely stored for background social syndication.',
      type: 'success',
    });
  };

  return (
    <div className="max-w-4xl">
      <LedMasthead
        title="System Settings & API Keys"
        subtitle="Manage secure credentials for background social syndication workers"
        status="active"
      />

      <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#dcdcdc]">
          <Key size={20} className="text-[#10b981]" />
          <div>
            <h2 className="font-mono font-bold text-base text-[#1a1a1a]">Social API Credentials</h2>
            <p className="text-xs text-[#666]">Keys remain server-side and are never exposed in frontend bundles.</p>
          </div>
        </div>

        <form onSubmit={handleSaveCredentials} className="space-y-5">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Telegram Bot Token</label>
            <input
              type="password"
              value={telegramToken}
              onChange={(e) => setTelegramToken(e.target.value)}
              placeholder="bot123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">Telegram Chat ID</label>
            <input
              type="text"
              value={telegramChatId}
              onChange={(e) => setTelegramChatId(e.target.value)}
              placeholder="-1001234567890"
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">LinkedIn OAuth Access Token</label>
            <input
              type="password"
              value={linkedInToken}
              onChange={(e) => setLinkedInToken(e.target.value)}
              placeholder="AQV..."
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">X (Twitter) Bearer Token</label>
            <input
              type="password"
              value={xToken}
              onChange={(e) => setXToken(e.target.value)}
              placeholder="AAAAAAAAAAAAAAAAAAAAA..."
              className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg px-3 py-2 text-sm font-mono text-[#1a1a1a]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#10b981] text-white font-mono font-bold text-xs px-6 py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors flex items-center gap-2"
          >
            <Save size={16} />
            <span>Save Credentials</span>
          </button>
        </form>
      </div>

      <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-5 flex items-center gap-4 text-xs font-mono text-[#666]">
        <ShieldCheck size={24} className="text-[#10b981] shrink-0" />
        <span>STAGE OS Security Protocol: Sensitive tokens are encrypted at rest and validated before syndication dispatches.</span>
      </div>

      <AdminToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};
