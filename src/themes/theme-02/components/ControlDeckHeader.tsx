import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Terminal, Activity, ShieldCheck, Clock } from 'lucide-react';

interface ControlDeckHeaderProps {
  onOpenSearch: () => void;
}

export const ControlDeckHeader: React.FC<ControlDeckHeaderProps> = ({ onOpenSearch }) => {
  const location = useLocation();
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: '[01] CMD_CENTER', path: '/' },
    { label: '[02] DECK', path: '/projects' },
    { label: '[03] FEED', path: '/blog' },
    { label: '[04] TIMELINE', path: '/experience' },
    { label: '[05] MATRIX', path: '/skills' },
    { label: '[06] PROFILE', path: '/about' },
    { label: '[07] RESUME', path: '/resume' },
    { label: '[08] CONTACT', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0D10]/95 backdrop-blur-md border-b border-[#30363D] font-mono text-xs select-none">
      {/* Top Telemetry Line */}
      <div className="hidden md:flex items-center justify-between px-4 py-1 border-b border-[#30363D]/60 bg-[#161B22]/50 text-[11px] text-[#8B949E]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-[#00F0FF] font-bold">DECK_STATUS: ONLINE</span>
          </div>
          <span className="text-[#30363D]">|</span>
          <div className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-[#FF9F1C]" />
            <span>CORE_FREQ: 3.8 GHz</span>
          </div>
          <span className="text-[#30363D]">|</span>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#00F0FF]" />
            <span>SEC_LEVEL: ALPHA</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[#C9D1D9]">
            <Clock className="w-3 h-3 text-[#00F0FF]" />
            <span>{time || '12:00:00 UTC'}</span>
          </div>
          <span className="text-[#30363D]">|</span>
          <span className="text-[10px] text-[#8B949E]">THEME 02 // CONTROL DECK</span>
        </div>
      </div>

      {/* Main Header & Nav Bar */}
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Brand/System Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-[#00F0FF]/10 border border-[#00F0FF]/50 rounded-sm flex items-center justify-center text-[#00F0FF] group-hover:bg-[#00F0FF]/20 group-hover:border-[#00F0FF] transition-all">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-[#C9D1D9] group-hover:text-[#00F0FF] transition-colors leading-tight">
              PORTFOLIO_OS <span className="text-[#00F0FF] text-[10px]">v2.5</span>
            </div>
            <div className="text-[10px] text-[#8B949E] tracking-wider">ENGINEERING_COMMAND</div>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-2.5 py-1.5 rounded-sm transition-all ${
                  active
                    ? 'text-[#00F0FF] font-bold bg-[#00F0FF]/10 border border-[#00F0FF]/40'
                    : 'text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#161B22] border border-transparent'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#161B22] border border-[#30363D] rounded-sm text-[#8B949E] hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition-all text-xs"
            title="Search Archive (Cmd/Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SEARCH</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-[#0A0D10] border border-[#30363D] rounded text-[#8B949E]">
              ⌘K
            </kbd>
          </button>

          <Link
            to="/search"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-[#FF9F1C]/10 border border-[#FF9F1C]/40 text-[#FF9F1C] hover:bg-[#FF9F1C]/20 transition-all text-xs"
          >
            ARCHIVE
          </Link>
        </div>
      </div>
    </header>
  );
};
