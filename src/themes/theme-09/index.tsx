import React, { useState, useEffect, useRef } from 'react';
import { DeviceTier } from '../../core/device/device-tier';
import { mockStorage } from '@/data/mockStorage';
import { PortfolioIdentity, Project, Experience, SkillCategory } from '@/types/portfolio';
import { ERAS, ERA_ORDER, DEFAULT_ERA, EraSpec, GTA_ERAS } from './eras.config';
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
import { AcademyTab } from './components/AcademyTab';

import './styles/theme09.css';

interface Theme09Props {
  tier: DeviceTier;
}

const TABS = ['Social', 'Map', 'Brief', 'Stats', 'Settings', 'Game'];
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const Theme09Component: React.FC<Theme09Props> = ({ tier }) => {
  // Era State
  const [eraIndex, setEraIndex] = useState<number>(() => {
    const savedId = typeof window !== 'undefined' ? localStorage.getItem('gta_active_era') : null;
    const foundIdx = GTA_ERAS.findIndex((e) => e.id === savedId);
    return foundIdx >= 0 ? foundIdx : 4; // Default GTA V
  });

  const currentEra = GTA_ERAS[eraIndex] || GTA_ERAS[4];

  // Section State
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [selectedTopTab, setSelectedTopTab] = useState<number>(5); // Game default
  const [showWheel, setShowWheel] = useState<boolean>(false);
  const [isWiping, setIsWiping] = useState<boolean>(false);
  const [isSwappingPlate, setIsSwappingPlate] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [showDetailView, setShowDetailView] = useState<boolean>(false);

  // Cash and Stars
  const [cashValue, setCashValue] = useState<number>(currentEra.characterInfo.cashValue);
  const [starRating, setStarRating] = useState<number>(4);
  const [cheatToast, setCheatToast] = useState<string | null>(null);

  // Time String
  const [timeStr, setTimeStr] = useState<string>('00:00');

  // Portfolio Mock Data
  const [identity, setIdentity] = useState<PortfolioIdentity>(mockStorage.getIdentity());
  const [projects, setProjects] = useState<Project[]>(mockStorage.getProjects());
  const [experience, setExperience] = useState<Experience[]>(mockStorage.getExperience());
  const [skills, setSkills] = useState<SkillCategory[]>(mockStorage.getSkills());

  // Refs for sliding nav highlight
  const navBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const highlightRef = useRef<HTMLDivElement | null>(null);

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

  // Live Clock Tick
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTimeStr(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
    };
    tick();
    const interval = setInterval(tick, 10000);
    return () => clearInterval(interval);
  }, []);

  // Update cash when era changes unless cheat is active
  useEffect(() => {
    if (!cheatToast) {
      setCashValue(currentEra.characterInfo.cashValue);
    }
  }, [currentEra]);

  // Sliding Nav Highlight position update
  useEffect(() => {
    const activeBtn = navBtnRefs.current[sectionIndex];
    const hl = highlightRef.current;
    if (activeBtn && hl && activeBtn.parentElement) {
      hl.style.height = `${activeBtn.offsetHeight}px`;
      hl.style.transform = `translateY(${activeBtn.parentElement.offsetTop}px)`;
    }
  }, [sectionIndex, eraIndex]);

  // Apply Era with Wipe
  const applyEra = (newIdx: number, animate = true) => {
    const idx = (newIdx + GTA_ERAS.length) % GTA_ERAS.length;
    if (idx === eraIndex && animate) return;

    if (!muted) soundSynth.playSelect();
    setIsSwappingPlate(true);

    if (animate) {
      setIsWiping(true);
      setTimeout(() => {
        setIsWiping(false);
      }, 620);
    }

    setEraIndex(idx);
    const targetEra = GTA_ERAS[idx];
    if (typeof window !== 'undefined') {
      localStorage.setItem('gta_active_era', targetEra.id);
    }

    setTimeout(() => {
      setIsSwappingPlate(false);
    }, 400);
  };

  const selectSection = (idx: number) => {
    const nextIdx = (idx + SECTIONS.length) % SECTIONS.length;
    setSectionIndex(nextIdx);
    setShowDetailView(false);
    if (!muted) soundSynth.playSelect();
  };

  // Keyboard navigation & Konami Cheats
  useEffect(() => {
    let keyBuffer: string[] = [];
    let textBuffer = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Konami Check
      keyBuffer.push(e.key);
      keyBuffer = keyBuffer.slice(-KONAMI_CODE.length);
      if (keyBuffer.join() === KONAMI_CODE.join()) {
        triggerCheat('HESOYAM');
        return;
      }

      // Text Cheat Check ("hesoyam")
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        textBuffer += e.key.toLowerCase();
        if (textBuffer.length > 20) textBuffer = textBuffer.slice(-20);
        if (textBuffer.endsWith('hesoyam')) {
          triggerCheat('HESOYAM');
          textBuffer = '';
        }
      }

      if (e.key === '[') {
        applyEra(eraIndex - 1);
      } else if (e.key === ']') {
        applyEra(eraIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!muted) soundSynth.playMove();
        selectSection(sectionIndex - 1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!muted) soundSynth.playMove();
        selectSection(sectionIndex + 1);
      } else if (e.key === 'Escape') {
        setShowWheel(false);
        setShowDetailView(false);
      }
    };

    const triggerCheat = (code: string) => {
      soundSynth.playSelect();
      setCashValue(999999999);
      setStarRating(5);
      setCheatToast(`CHEAT ACTIVATED: ${code} — FULL HEALTH, ARMOR & $250,000`);
      setTimeout(() => setCheatToast(null), 4000);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sectionIndex, eraIndex, muted]);

  // Sections definitions
  const SECTIONS = [
    {
      id: 'start',
      label: 'Start',
      title: identity?.name || 'Prajwal DL',
      kicker: 'Welcome',
      body: identity?.bio || 'Full-stack developer building fast, characterful interfaces. Press [ and ] to travel between eras.',
      tags: ['React', 'TypeScript', 'Node.js', 'Three.js'],
    },
    {
      id: 'about',
      label: 'About',
      title: 'About Me',
      kicker: 'Profile',
      body: identity?.bio || 'Passionate software engineer creating high-performance web systems, spatial UI, and interactive digital experiences.',
      tags: [identity?.location || 'India', 'Open to work', 'Full-Stack'],
    },
    {
      id: 'skills',
      label: 'Skills',
      title: currentEra.labels.skills,
      kicker: 'Loadout',
      body: 'Your stack, rated. The star meter in the HUD reflects overall proficiency across front-end, back-end, and cloud ops.',
      tags: ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Docker'],
    },
    {
      id: 'projects',
      label: 'Projects',
      title: currentEra.labels.projects,
      kicker: 'Missions',
      body: 'Selected builds with live links, architectural notes, and high-impact project outcomes.',
      tags: projects.map((p) => p.title).slice(0, 4),
    },
    {
      id: 'experience',
      label: 'Experience',
      title: currentEra.labels.experience,
      kicker: 'Career',
      body: 'Professional trajectory, engineering roles, and production impact at top tech organizations.',
      tags: experience.map((e) => e.company).slice(0, 4),
    },
    {
      id: 'achievements',
      label: 'Achievements',
      title: currentEra.labels.achievements,
      kicker: '100% Completion',
      body: 'Awards, hackathon victories, and production engineering milestones — presented as this era\'s reward system.',
      tags: ['Hackathon Winner', 'Certified Cloud Engineer', 'Top Contributor'],
    },
    {
      id: 'academy',
      label: 'Academy',
      title: currentEra.labels.academy || 'Education',
      kicker: 'Training',
      body: 'B.Tech in Computer Science & Engineering + continuous late-night full-stack mastery.',
      tags: ['B.Tech CSE', 'Data Structures', 'Operating Systems', 'Cloud Ops'],
    },
    {
      id: 'contact',
      label: 'Contact',
      title: currentEra.labels.contact,
      kicker: 'Safehouse',
      body: 'Direct transmission lines. Email, LinkedIn, GitHub. Reply time: fast.',
      tags: ['Email', 'LinkedIn', 'GitHub'],
    },
    {
      id: 'exit',
      label: 'Exit',
      title: 'Exit Game',
      kicker: 'Quit',
      body: 'Thanks for playing. Progress saved automatically in your browser.',
      tags: ['Portfolio OS', '2026 Edition'],
    },
  ];

  const currentSection = SECTIONS[sectionIndex];

  return (
    <div className="pause-os" data-era={currentEra.id}>
      {/* FILM GRAIN OVERLAY */}
      <div className="grain-overlay" />

      {/* CHEAT TOAST */}
      {cheatToast && (
        <div
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-6 py-2 rounded-lg font-mono text-xs font-bold text-black shadow-2xl animate-bounce"
          style={{ backgroundColor: currentEra.accent }}
        >
          {cheatToast}
        </div>
      )}

      {/* TOP TAB BAR */}
      <nav className="tabs-bar" role="tablist">
        {TABS.map((t, i) => (
          <button
            key={t}
            className="tab-btn"
            role="tab"
            aria-selected={i === selectedTopTab}
            onClick={() => {
              setSelectedTopTab(i);
              if (!muted) soundSynth.playSelect();
              if (t === 'Stats') setSectionIndex(2);
              if (t === 'Brief') setSectionIndex(0);
              if (t === 'Map') setSectionIndex(3);
              if (t === 'Social') setSectionIndex(7);
            }}
          >
            {t}
          </button>
        ))}
      </nav>

      {/* LEFT NAV COLUMN */}
      <aside className="nav-col">
        <div className="nav-header-title">{currentEra.name}</div>
        <ul className="nav-item-list">
          <div className="nav-sliding-highlight" ref={highlightRef} />
          {SECTIONS.map((s, i) => (
            <li key={s.id} className="nav-item-row">
              <button
                ref={(el) => (navBtnRefs.current[i] = el)}
                className="nav-item-btn"
                aria-current={i === sectionIndex}
                onClick={() => selectSection(i)}
                onMouseEnter={() => {
                  if (!muted) soundSynth.playMove();
                }}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* CHARACTER PLATE + MAIN OVERLAY PANEL */}
      <main className="plate-view">
        <div
          className="plate-view-bg"
          style={{ backgroundImage: `url('${currentEra.backdrop}')` }}
        />

        <img
          src={identity?.avatarUrl || currentEra.character}
          alt={identity?.name || 'Character plate'}
          className={`plate-view-img ${isSwappingPlate ? 'swapping' : ''}`}
        />

        {/* CONTENT PANEL OVERLAY */}
        <div className="content-panel-overlay">
          {showDetailView ? (
            <div className="w-full h-full overflow-y-auto pr-2">
              <button
                onClick={() => setShowDetailView(false)}
                className="mb-4 px-3 py-1.5 rounded text-xs font-bold uppercase font-mono border border-white/20 text-white hover:bg-white/10 cursor-pointer"
                style={{ backgroundColor: currentEra.accent, color: '#000' }}
              >
                ◀ BACK TO MENU OVERVIEW
              </button>

              {sectionIndex === 0 && <ResumeTab identity={identity} onJumpToQuests={() => setSectionIndex(3)} accentColor={currentEra.accent} />}
              {sectionIndex === 1 && <ProfileTab identity={identity} accentColor={currentEra.accent} />}
              {sectionIndex === 2 && <SkillsTab skills={skills} accentColor={currentEra.accent} />}
              {sectionIndex === 3 && <QuestsTab projects={projects} accentColor={currentEra.accent} />}
              {sectionIndex === 4 && <JournalTab experiences={experience} accentColor={currentEra.accent} />}
              {sectionIndex === 5 && <AchievementsTab accentColor={currentEra.accent} />}
              {sectionIndex === 6 && <AcademyTab identity={identity} accentColor={currentEra.accent} />}
              {sectionIndex === 7 && <UplinkTab identity={identity} accentColor={currentEra.accent} onTransmissionSuccess={() => setSectionIndex(5)} />}
              {sectionIndex === 8 && <CreditsTab onReturnToResume={() => setSectionIndex(0)} accentColor={currentEra.accent} />}
            </div>
          ) : (
            <>
              <span className="kicker">{currentSection.kicker}</span>
              <h1>{currentSection.title}</h1>
              <p>{currentSection.body}</p>
              <div className="tags">
                {currentSection.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setShowDetailView(true)}
                  className="px-4 py-2 rounded text-xs font-bold uppercase tracking-widest font-mono cursor-pointer transition-transform active:scale-95 shadow-lg"
                  style={{ backgroundColor: currentEra.accent, color: '#000' }}
                >
                  OPEN DETAILED {currentSection.label.toUpperCase()} VIEW ▸
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* BOTTOM HUD STRIP */}
      <footer className="hud-strip">
        <div className="era-switch-bar">
          <button
            className="era-arrow-btn"
            aria-label="Previous era"
            onClick={() => applyEra(eraIndex - 1)}
          >
            ◀
          </button>

          <div
            className="era-badge-label"
            title="Click to open era wheel"
            onClick={() => setShowWheel(!showWheel)}
          >
            {currentEra.code}
          </div>

          <button
            className="era-arrow-btn"
            aria-label="Next era"
            onClick={() => applyEra(eraIndex + 1)}
          >
            ▶
          </button>
        </div>

        <div className="hud-sep" />
        <div className="minimap-box" title="Minimap Radar" />

        <div className="hud-sep hide-sm" />
        <div className="hud-cell hide-sm">
          SKILL{' '}
          <span className="star-rating-list">
            {[1, 2, 3, 4, 5].map((st) => (
              <span key={st} className={`star-icon ${st <= starRating ? 'on' : ''}`}>
                ★
              </span>
            ))}
          </span>
        </div>

        <div className="hud-sep hide-sm" />
        <div className="hud-cell hide-sm">
          PROJECT VALUE <span className="val">${cashValue.toLocaleString()}</span>
        </div>

        <div className="spacer" />

        <div className="hud-cell">
          <span>{currentEra.name} · {currentEra.year}</span>
        </div>

        <div className="hud-sep" />

        <div className="hud-cell">
          <span className="val">{timeStr}</span>
        </div>

        <div className="hud-sep" />

        <button
          className="era-arrow-btn"
          title="Toggle sound"
          style={{ opacity: muted ? 0.35 : 1 }}
          onClick={() => {
            const next = !muted;
            setMuted(next);
            soundSynth.enabled = !next;
            if (!next) soundSynth.playSelect();
          }}
        >
          ♪
        </button>
      </footer>

      {/* ERA WHEEL MODAL */}
      {showWheel && (
        <div className="wheel-modal-overlay" onClick={() => setShowWheel(false)}>
          <div className="wheel-grid-layout" onClick={(e) => e.stopPropagation()}>
            {GTA_ERAS.map((e, idx) => (
              <button
                key={e.id}
                className="wheel-tile-card"
                style={{ borderColor: e.accent }}
                onClick={() => {
                  applyEra(idx);
                  setShowWheel(false);
                }}
              >
                <span style={{ color: e.accent, fontSize: '22px' }}>{e.code}</span>
                <small>{e.name} · {e.year}</small>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LOADING WIPE */}
      <div
        className={`wipe-overlay-screen ${isWiping ? 'run' : ''}`}
        style={{ backgroundColor: currentEra.accent, color: '#0b0b0b' }}
      >
        <div>
          <div className="wipe-spinner-circle" />
          <div className="wipe-text-label">
            Streaming assets: {currentEra.name.toUpperCase().replace(/ /g, '_')}.PAK
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theme09Component;


