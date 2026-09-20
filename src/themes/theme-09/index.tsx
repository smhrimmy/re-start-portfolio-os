import React, { useState, useEffect } from 'react';
import { DeviceTier } from '../../core/device/device-tier';
import { mockStorage } from '@/data/mockStorage';
import { PortfolioIdentity, Project, Experience, SkillCategory } from '@/types/portfolio';

import { GTA_ERAS, EraSpec } from './eras.config';
import { LoadingWipe } from './components/LoadingWipe';
import { GtaHudTop } from './components/GtaHudTop';
import { GtaHudBottom } from './components/GtaHudBottom';
import { CharacterPlate } from './components/CharacterPlate';
import { AcademyTab } from './components/AcademyTab';
import { soundSynth } from '../theme-08/soundSynth';

import { ResumeTab } from '../theme-08/components/tabs/ResumeTab';
import { ProfileTab } from '../theme-08/components/tabs/ProfileTab';
import { QuestsTab } from '../theme-08/components/tabs/QuestsTab';
import { SkillsTab } from '../theme-08/components/tabs/SkillsTab';
import { InventoryTab } from '../theme-08/components/tabs/InventoryTab';
import { JournalTab } from '../theme-08/components/tabs/JournalTab';
import { AchievementsTab } from '../theme-08/components/tabs/AchievementsTab';
import { UplinkTab } from '../theme-08/components/tabs/UplinkTab';
import { CreditsTab } from '../theme-08/components/tabs/CreditsTab';

import './styles/theme09.css';

interface Theme09Props {
  tier: DeviceTier;
}

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const Theme09Component: React.FC<Theme09Props> = ({ tier }) => {
  // Saved Era in localStorage (default to GTA V)
  const [currentEra, setCurrentEra] = useState<EraSpec>(() => {
    const savedId = typeof window !== 'undefined' ? localStorage.getItem('gta_active_era') : null;
    return GTA_ERAS.find((e: EraSpec) => e.id === savedId) || GTA_ERAS[4]; // Default to GTA V
  });

  const [isWiping, setIsWiping] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeTopTab, setActiveTopTab] = useState<string>('GAME');
  const [visitedTabs, setVisitedTabs] = useState<Set<number>>(() => new Set([0]));
  const [customCash, setCustomCash] = useState<number | undefined>(undefined);
  const [cheatNotification, setCheatNotification] = useState<string | null>(null);

  const [identity, setIdentity] = useState<PortfolioIdentity>(mockStorage.getIdentity());
  const [projects, setProjects] = useState<Project[]>(mockStorage.getProjects());
  const [experience, setExperience] = useState<Experience[]>(mockStorage.getExperience());
  const [skills, setSkills] = useState<SkillCategory[]>(mockStorage.getSkills());

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

  // Trigger 600ms Loading Screen Wipe on Era Change
  const handleSelectEra = (newEra: EraSpec) => {
    if (newEra.id === currentEra.id) return;
    soundSynth.playSelect();
    setIsWiping(true);
    setCurrentEra(newEra);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gta_active_era', newEra.id);
    }
    setTimeout(() => {
      setIsWiping(false);
    }, 600);
  };

  const selectTab = (id: number) => {
    setActiveTab(id);
    setActiveTopTab('GAME');
    setVisitedTabs((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  // Konami & Cheat Code Input Listener ('HESOYAM' or Konami Sequence)
  useEffect(() => {
    let keyBuffer: string[] = [];
    let textBuffer = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Check Konami Code
      keyBuffer.push(e.key);
      keyBuffer = keyBuffer.slice(-KONAMI_CODE.length);
      if (keyBuffer.join() === KONAMI_CODE.join()) {
        activateCheat('HESOYAM');
        return;
      }

      // Check Text Cheats (e.g. typing "hesoyam")
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        textBuffer += e.key.toLowerCase();
        if (textBuffer.length > 20) textBuffer = textBuffer.slice(-20);

        if (textBuffer.endsWith('hesoyam')) {
          activateCheat('HESOYAM');
          textBuffer = '';
        }
      }

      // Standard Keyboard Hotkeys
      if (e.key === 'Escape') {
        e.preventDefault();
        soundSynth.playSelect();
        selectTab(0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundSynth.playMove();
        selectTab(activeTab > 0 ? activeTab - 1 : 9);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundSynth.playMove();
        selectTab(activeTab < 9 ? activeTab + 1 : 0);
      }
    };

    const activateCheat = (code: string) => {
      soundSynth.playSelect();
      setCustomCash(999999999);
      setCheatNotification(`CHEAT ACTIVATED: ${code} — FULL HEALTH, ARMOR & $250k`);
      setTimeout(() => {
        setCheatNotification(null);
      }, 4000);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  // Handle Top Tab Selection
  const handleSelectTopTab = (tab: string) => {
    setActiveTopTab(tab);
    if (tab === 'GAME') {
      setActiveTab(0);
    } else if (tab === 'STATS') {
      setActiveTab(3); // Skills
    } else if (tab === 'BRIEF') {
      setActiveTab(0); // Resume
    } else if (tab === 'MAP') {
      setActiveTab(2); // Projects / Territories
    } else if (tab === 'SOCIAL') {
      setActiveTab(8); // Contact
    } else if (tab === 'SETTINGS') {
      setActiveTab(9); // Credits
    }
  };

  // Dynamic Era-Specific Nav Labels
  const navTabs = [
    { id: 0, label: 'START' },
    { id: 1, label: 'PROFILE' },
    { id: 2, label: currentEra.labels.projects },
    { id: 3, label: currentEra.labels.skills },
    { id: 4, label: 'INVENTORY' },
    { id: 5, label: currentEra.labels.experience },
    { id: 6, label: 'ACHIEVEMENTS' },
    { id: 7, label: currentEra.labels.academy || 'ACADEMY' },
    { id: 8, label: currentEra.labels.contact },
    { id: 9, label: 'CREDITS' },
  ];

  return (
    <div
      className="gta-root grid grid-rows-[56px_1fr_44px] grid-cols-1 md:grid-cols-[260px_1fr] relative"
      data-era={currentEra.id}
      style={{
        backgroundColor: currentEra.bg,
        '--era-accent': currentEra.accent,
      } as React.CSSProperties}
    >
      {/* Loading Screen Wipe Transition */}
      {isWiping && <LoadingWipe era={currentEra} />}

      {/* Cheat Code Activation Toast */}
      {cheatNotification && (
        <div
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-6 py-2 rounded-lg font-mono text-xs font-bold text-black shadow-2xl animate-bounce"
          style={{ backgroundColor: currentEra.accent }}
        >
          {cheatNotification}
        </div>
      )}

      {/* TOP HUD BAR (56px) */}
      <div className="col-span-1 md:col-span-2 z-30">
        <GtaHudTop
          era={currentEra}
          visitedCount={visitedTabs.size}
          activeTopTab={activeTopTab}
          onSelectTopTab={handleSelectTopTab}
          customCash={customCash}
        />
      </div>

      {/* LEFT ERA-ADAPTED TAB NAVIGATION RAIL (260px) */}
      <aside className="hidden md:flex flex-col justify-between p-4 z-20 bg-black/75 border-r border-white/15 overflow-y-auto">
        <div className="space-y-4">
          {/* Character Portrait Plate */}
          <CharacterPlate era={currentEra} identity={identity} />

          {/* Nav Links */}
          <div className="space-y-1 font-mono text-xs">
            {navTabs.map((tab) => {
              const isSelected = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundSynth.playSelect();
                    selectTab(tab.id);
                  }}
                  onMouseEnter={() => soundSynth.playMove()}
                  className={`w-full px-3 py-2 rounded text-left transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    isSelected ? 'font-bold text-black' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  style={{
                    backgroundColor: isSelected ? currentEra.accent : undefined,
                  }}
                >
                  <span className="tracking-wider">{tab.label}</span>
                  {isSelected && <span>▸</span>}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT PANE (Scrollable inner panel) */}
      <main className="z-10 p-6 sm:p-10 overflow-y-auto gta-scroll relative flex flex-col justify-start">
        {activeTab === 0 && (
          <ResumeTab
            identity={identity}
            onJumpToQuests={() => selectTab(2)}
            accentColor={currentEra.accent}
          />
        )}
        {activeTab === 1 && (
          <ProfileTab
            identity={identity}
            accentColor={currentEra.accent}
          />
        )}
        {activeTab === 2 && (
          <QuestsTab
            projects={projects}
            accentColor={currentEra.accent}
          />
        )}
        {activeTab === 3 && (
          <SkillsTab
            skills={skills}
            accentColor={currentEra.accent}
          />
        )}
        {activeTab === 4 && (
          <InventoryTab
            accentColor={currentEra.accent}
          />
        )}
        {activeTab === 5 && (
          <JournalTab
            experiences={experience}
            accentColor={currentEra.accent}
          />
        )}
        {activeTab === 6 && (
          <AchievementsTab
            accentColor={currentEra.accent}
          />
        )}
        {activeTab === 7 && (
          <AcademyTab
            identity={identity}
            accentColor={currentEra.accent}
          />
        )}
        {activeTab === 8 && (
          <UplinkTab
            identity={identity}
            accentColor={currentEra.accent}
            onTransmissionSuccess={() => selectTab(6)}
          />
        )}
        {activeTab === 9 && (
          <CreditsTab
            onReturnToResume={() => selectTab(0)}
            accentColor={currentEra.accent}
          />
        )}
      </main>

      {/* BOTTOM HINT BAR & ERA SWITCHER (44px) */}
      <div className="col-span-1 md:col-span-2 z-30">
        <GtaHudBottom
          era={currentEra}
          onSelectEra={handleSelectEra}
          hintText={`ACTIVE OPERATOR: ${currentEra.characterInfo.alias} (${currentEra.year}) — TYPE 'HESOYAM' FOR CHEAT`}
        />
      </div>
    </div>
  );
};

export default Theme09Component;

