import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Rss,
  GitCommit,
  Cpu,
  User,
  FileText,
  Mail,
} from 'lucide-react';

export const ControlDockMobile: React.FC = () => {
  const location = useLocation();

  const dockItems = [
    { label: 'HOME', path: '/', icon: LayoutDashboard },
    { label: 'DECK', path: '/projects', icon: Layers },
    { label: 'FEED', path: '/blog', icon: Rss },
    { label: 'NODES', path: '/experience', icon: GitCommit },
    { label: 'MATRIX', path: '/skills', icon: Cpu },
    { label: 'USER', path: '/about', icon: User },
    { label: 'RESUME', path: '/resume', icon: FileText },
    { label: 'COMMS', path: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0D10]/95 backdrop-blur-lg border-t border-[#30363D] px-2 py-1.5 font-mono select-none">
      <div className="flex items-center justify-around overflow-x-auto no-scrollbar py-0.5">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center min-w-[50px] py-1 px-1.5 rounded transition-all ${
                active
                  ? 'text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/40 font-bold'
                  : 'text-[#8B949E] hover:text-[#C9D1D9]'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${active ? 'text-[#00F0FF]' : 'text-[#8B949E]'}`} />
              <span className="text-[9px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
