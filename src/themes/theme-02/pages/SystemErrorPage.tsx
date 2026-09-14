import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { ControlDeckButton } from '../components/ControlDeckButton';

export const SystemErrorPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 text-center font-mono bg-[#0A0D10] text-[#C9D1D9] space-y-6">
      <div className="relative p-8 bg-[#161B22] border border-[#FF4D4D]/50 rounded-sm max-w-lg w-full space-y-4 shadow-2xl">
        <div className="flex items-center justify-center w-12 h-12 bg-[#FF4D4D]/10 border border-[#FF4D4D]/40 text-[#FF4D4D] rounded-full mx-auto">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
        </div>

        <div>
          <div className="text-xs text-[#FF4D4D] font-bold tracking-wider uppercase mb-1">
            [SYS_ERR // 404_ROUTE_NOT_FOUND]
          </div>
          <h1 className="text-2xl font-extrabold text-white">SYSTEM TELEMETRY FAULT</h1>
          <p className="text-xs text-[#8B949E] mt-2 leading-relaxed">
            The target system route does not resolve to an active telemetry node in Theme 02 Digital Control Deck.
          </p>
        </div>

        <div className="p-3 bg-[#0A0D10] border border-[#30363D] text-[11px] text-[#8B949E] text-left space-y-1">
          <div>&gt; DIAGNOSTIC: INVALID ROUTE ENTRY</div>
          <div>&gt; RECOMMENDATION: RETURN TO COMMAND CENTER</div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link to="/">
            <ControlDeckButton variant="primary" size="sm" icon={<Home className="w-3.5 h-3.5" />}>
              COMMAND CENTER
            </ControlDeckButton>
          </Link>
          <Link to="/projects">
            <ControlDeckButton variant="secondary" size="sm" icon={<ArrowLeft className="w-3.5 h-3.5" />}>
              PROJECT DECK
            </ControlDeckButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
