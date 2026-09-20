import React, { useState, useEffect } from 'react';
import { DeviceTier } from '../../core/device/device-tier';
import { mockStorage } from '@/data/mockStorage';
import { PortfolioIdentity, Project, Experience, SkillCategory } from '@/types/portfolio';

import { THEME_08_TABS } from './theme08Tokens';
import { HudTop } from './components/HudTop';
import { HudBottom } from './components/HudBottom';
import { TabRail } from './components/TabRail';
import { soundSynth } from './soundSynth';

import { ResumeTab } from './components/tabs/ResumeTab';
import { ProfileTab } from './components/tabs/ProfileTab';
import { QuestsTab } from './components/tabs/QuestsTab';
import { SkillsTab } from './components/tabs/SkillsTab';
import { InventoryTab } from './components/tabs/InventoryTab';
import { JournalTab } from './components/tabs/JournalTab';
import { AchievementsTab } from './components/tabs/AchievementsTab';
import { UplinkTab } from './components/tabs/UplinkTab';
import { CreditsTab } from './components/tabs/CreditsTab';

import './styles/theme08.css';

interface Theme08Props {
  tier: DeviceTier;
}

export const Theme08Component: React.FC<Theme08Props> = ({ tier }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [visitedTabs, setVisitedTabs] = useState<Set<number>>(() => new Set([0]));

  const [identity, setIdentity] = useState<PortfolioIdentity>(mockStorage.getIdentity());
  const [projects, setProjects] = useState<Project[]>(mockStorage.getProjects());
  const [experience, setExperience] = useState<Experience[]>(mockStorage.getExperience());
  const [skills, setSkills] = useState<SkillCategory[]>(mockStorage.getSkills());

  // Load identity and domain models from mockStorage
  useEffect(() => {
    setIdentity(mockStorage.getIdentity());
    setProjects(mockStorage.getProjects());
    setExperience(mockStorage.getExperience());
    setSkills(mockStorage.getSkills());

    const unsubscribe = mockStorage.subscribe(() => {
      setIdentity(mockStorage.getIdentity());
      setProjects(mockStorage.getProjects());
      setExperience(mockStorage.getExperience());
      setSkills(mockStorage.getSkills());
    });

    return () => unsubscribe();
  }, []);

  // Track visited tabs in state & sessionStorage for HUD progression stars
  const selectTab = (id: number) => {
    setActiveTab(id);
    setVisitedTabs((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  // Keyboard Navigation: ArrowUp/Down to move tabs, Esc to jump to RESUME
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Don't intercept typing in inputs
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        soundSynth.playSelect();
        selectTab(0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundSynth.playMove();
        selectTab(activeTab > 0 ? activeTab - 1 : THEME_08_TABS.length - 1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundSynth.playMove();
        selectTab(activeTab < THEME_08_TABS.length - 1 ? activeTab + 1 : 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  const currentTabSpec = THEME_08_TABS[activeTab] || THEME_08_TABS[0];

  return (
    <div
      className="pause-root grid grid-rows-[56px_1fr_44px] grid-cols-1 md:grid-cols-[260px_1fr] relative"
      style={{ '--pause-accent': currentTabSpec.accent } as React.CSSProperties}
    >
      {/* Background Plate & Scrim Layers */}
      <div
        className="absolute inset-0 z-0 transition-all duration-700 ease-out"
        style={{ background: currentTabSpec.bgGradient }}
      />
      <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-[3px]" />
      <div className="absolute inset-0 z-0 pause-scanlines opacity-40 pointer-events-none" />

      {/* TOP HUD BAR (56px) */}
      <div className="col-span-1 md:col-span-2 z-30">
        <HudTop
          activeTab={activeTab}
          visitedTabs={visitedTabs}
          accentColor={currentTabSpec.accent}
        />
      </div>

      {/* LEFT TAB NAVIGATION RAIL (260px) */}
      <div className="hidden md:block z-20">
        <TabRail
          activeTab={activeTab}
          onSelectTab={selectTab}
          accentColor={currentTabSpec.accent}
        />
      </div>

      {/* MAIN CONTENT PANE (Scrollable inner panel) */}
      <main className="z-10 p-6 sm:p-10 overflow-y-auto pause-scroll relative flex flex-col justify-start">
        {activeTab === 0 && (
          <ResumeTab
            identity={identity}
            onJumpToQuests={() => selectTab(2)}
            accentColor={currentTabSpec.accent}
          />
        )}
        {activeTab === 1 && (
          <ProfileTab
            identity={identity}
            accentColor={currentTabSpec.accent}
          />
        )}
        {activeTab === 2 && (
          <QuestsTab
            projects={projects}
            accentColor={currentTabSpec.accent}
          />
        )}
        {activeTab === 3 && (
          <SkillsTab
            skills={skills}
            accentColor={currentTabSpec.accent}
          />
        )}
        {activeTab === 4 && (
          <InventoryTab
            accentColor={currentTabSpec.accent}
          />
        )}
        {activeTab === 5 && (
          <JournalTab
            experiences={experience}
            accentColor={currentTabSpec.accent}
          />
        )}
        {activeTab === 6 && (
          <AchievementsTab
            accentColor={currentTabSpec.accent}
          />
        )}
        {activeTab === 7 && (
          <UplinkTab
            identity={identity}
            accentColor={currentTabSpec.accent}
            onTransmissionSuccess={() => selectTab(6)}
          />
        )}
        {activeTab === 8 && (
          <CreditsTab
            onReturnToResume={() => selectTab(0)}
            accentColor={currentTabSpec.accent}
          />
        )}
      </main>

      {/* BOTTOM HINT BAR (44px) */}
      <div className="col-span-1 md:col-span-2 z-30">
        <HudBottom
          hintText={currentTabSpec.hint}
          accentColor={currentTabSpec.accent}
        />
      </div>
    </div>
  );
};

export default Theme08Component;
