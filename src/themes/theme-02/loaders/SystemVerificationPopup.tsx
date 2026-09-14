import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import { ControlDeckButton } from '../components/ControlDeckButton';

interface SystemVerificationPopupProps {
  isOpen: boolean;
  projectTitle: string;
  projectSlug: string;
  techStack: string[];
  metrics?: { label: string; value: string }[];
  onConfirm: () => void;
  onCancel: () => void;
}

export const SystemVerificationPopup: React.FC<SystemVerificationPopupProps> = ({
  isOpen,
  projectTitle,
  projectSlug,
  techStack,
  metrics = [],
  onConfirm,
  onCancel,
}) => {
  const [verifying, setVerifying] = useState(true);
  const [checksumVerified, setChecksumVerified] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVerifying(true);
      setChecksumVerified(false);
      const timer = setTimeout(() => {
        setVerifying(false);
        setChecksumVerified(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0D10]/85 backdrop-blur-md font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#161B22] border border-[#00F0FF]/40 rounded-sm p-6 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#30363D] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#00F0FF] animate-pulse" />
              <span className="text-sm font-bold uppercase text-[#00F0FF] tracking-wider">
                [SYSTEM_VERIFICATION_CHECK]
              </span>
            </div>
            <span className="text-xs text-[#FF9F1C] border border-[#FF9F1C]/30 px-2 py-0.5 rounded">
              TARGET PROTOCOL
            </span>
          </div>

          {/* Project Target */}
          <div className="bg-[#0A0D10] border border-[#30363D] p-4 mb-4 rounded-sm">
            <div className="text-[10px] text-[#8B949E] uppercase tracking-wider mb-1">
              TARGET_SPECIFICATION
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{projectTitle}</h4>
            <div className="text-xs text-[#8B949E] mb-3">
              IDENTIFIER: <span className="text-[#00F0FF]">/projects/{projectSlug}</span>
            </div>

            {/* Verification Checks */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8B949E]">CHECKSUM HASH:</span>
                <span className="text-white font-mono">SHA256: 8f9b...e4a2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8B949E]">DEPENDENCY CHECK:</span>
                <span className="text-[#00F0FF]">PASSED ({techStack.length} MODULES)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8B949E]">SECURITY ATTRIBUTION:</span>
                <span className="text-[#00F0FF]">VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Metrics snippet if available */}
          {metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {metrics.slice(0, 2).map((m, idx) => (
                <div key={idx} className="p-2 bg-[#0A0D10] border border-[#30363D] text-center">
                  <div className="text-[10px] text-[#8B949E] uppercase">{m.label}</div>
                  <div className="text-sm font-bold text-[#FF9F1C]">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Verification state banner */}
          <div className="flex items-center gap-2 text-xs p-2.5 mb-5 bg-[#0A0D10]/50 border border-[#30363D] rounded-sm">
            {verifying ? (
              <>
                <div className="w-2 h-2 rounded-full bg-[#FF9F1C] animate-ping" />
                <span className="text-[#FF9F1C]">VERIFYING ARCHITECTURAL CHECKSUM...</span>
              </>
            ) : checksumVerified ? (
              <>
                <CheckCircle className="w-4 h-4 text-[#00F0FF]" />
                <span className="text-[#00F0FF]">CHECKSUM VALIDATED — READY TO LAUNCH</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-[#FF4D4D]" />
                <span className="text-[#FF4D4D]">WARNING: CHECKSUM MISMATCH DETECTED</span>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#30363D]">
            <ControlDeckButton variant="secondary" size="sm" onClick={onCancel}>
              CANCEL
            </ControlDeckButton>
            <ControlDeckButton
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              disabled={verifying}
              onClick={onConfirm}
            >
              LAUNCH CONSOLE
            </ControlDeckButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
