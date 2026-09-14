import React, { useState } from 'react';
import { Lock, ShieldAlert, KeyRound } from 'lucide-react';
import { INTELLIGENT_STAGE_TOKENS } from '../design-tokens';

interface AuthGuardModalProps {
  isOpen: boolean;
  onAuthenticate: (passcode: string) => boolean;
}

export const AuthGuardModal: React.FC<AuthGuardModalProps> = ({ isOpen, onAuthenticate }) => {
  const [passcode, setPasscode] = useState('');
  const [hasError, setHasError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAuthenticate(passcode);
    if (!success) {
      setHasError(true);
      return;
    }
    setHasError(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-[#f4f4f3] border border-[#dcdcdc] rounded-2xl p-6 shadow-2xl space-y-6"
        style={{ backgroundColor: INTELLIGENT_STAGE_TOKENS.colors.surfaceCard }}
      >
        <div className="flex items-center gap-3 pb-4 border-b border-[#dcdcdc]">
          <div className="w-10 h-10 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="font-mono font-bold text-lg text-[#1a1a1a] uppercase tracking-wider">
              Admin OS Entry
            </h2>
            <p className="text-xs text-[#666] font-mono">Passcode Protection Layer</p>
          </div>
        </div>

        {/* Security Boundary Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs font-mono text-amber-800 flex items-start gap-2.5">
          <ShieldAlert size={16} className="shrink-0 text-amber-600 mt-0.5" />
          <div>
            <strong className="block font-bold">UX Privacy Gate Only:</strong>
            <span>
              This passcode hides the admin interface from casual visitors. Server-side session authentication is enforced at the API/Nginx layer.
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#666] mb-1">
              Passcode (Default: 1234)
            </label>
            <div className="relative">
              <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setHasError(false);
                }}
                placeholder="Enter passcode..."
                className="w-full bg-[#eaeaea] border border-[#dcdcdc] rounded-lg pl-10 pr-3 py-2.5 text-sm font-mono text-[#1a1a1a] focus:outline-none focus:border-[#10b981]"
                autoFocus
              />
            </div>
            {hasError && (
              <p className="text-xs font-mono text-red-600 mt-1">Invalid passcode. Please try again.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#10b981] text-white font-mono font-bold text-sm py-2.5 rounded-lg hover:bg-[#0d9668] transition-colors"
          >
            Unlock Admin Console
          </button>
        </form>
      </div>
    </div>
  );
};
