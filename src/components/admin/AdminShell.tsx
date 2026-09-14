import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { AdminMobileNav } from './AdminMobileNav';
import { CommandPalette } from '@/components/common/CommandPalette';
import { ContentSearchModal } from '@/components/common/ContentSearchModal';
import { ShortcutsHelpModal } from '@/components/common/ShortcutsHelpModal';
import { NotificationDrawer } from '@/components/common/NotificationDrawer';
import { OnboardingTour } from '@/components/common/OnboardingTour';

interface AdminShellProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({ currentRoute, onNavigate, children }) => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isContentSearchOpen, setIsContentSearchOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isTourVisible, setIsTourVisible] = useState(false);

  useEffect(() => {
    const isCompleted = localStorage.getItem('pdl_tour_completed') === 'true';
    if (!isCompleted) {
      setIsTourVisible(true);
    }

    const handleKey = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement).tagName;
      if (['INPUT', 'TEXTAREA'].includes(targetTag)) return;

      if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen(prev => !prev);
      } else if (e.key === '/') {
        e.preventDefault();
        setIsContentSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="stage-admin-scope flex h-screen bg-[#ececeb] text-[#222222] overflow-hidden font-sans pt-safe pl-safe pr-safe">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <AdminSidebar currentRoute={currentRoute} onNavigate={onNavigate} />
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopbar
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          onOpenCommandPalette={() => setIsCommandOpen(true)}
          onOpenContentSearch={() => setIsContentSearchOpen(true)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
        />

        <main className="stage-admin-scope flex-1 overflow-y-auto pb-20 md:pb-6 pb-safe bg-[#ececeb] text-[#222222]">
          {children}
        </main>
      </div>

      {/* Mobile Nav */}
      <AdminMobileNav currentRoute={currentRoute} onNavigate={onNavigate} />

      {/* Overlays */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} onNavigate={onNavigate} />
      <ContentSearchModal isOpen={isContentSearchOpen} onClose={() => setIsContentSearchOpen(false)} onNavigate={onNavigate} />
      <ShortcutsHelpModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      <NotificationDrawer isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} onNavigate={onNavigate} />
      {isTourVisible && <OnboardingTour onComplete={() => setIsTourVisible(false)} />}
    </div>
  );
};
