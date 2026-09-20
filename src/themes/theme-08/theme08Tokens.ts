export interface TabSpec {
  id: number;
  key: string;
  label: string;
  badge: string;
  accent: string;
  bgGradient: string;
  hint: string;
}

export const THEME_08_TABS: TabSpec[] = [
  {
    id: 0,
    key: 'resume',
    label: 'RESUME',
    badge: '00',
    accent: '#E8B44A',
    bgGradient: 'radial-gradient(ellipse at center, #1F180A 0%, #07080A 80%)',
    hint: '[↑↓] NAVIGATE  [↵] SELECT TAB  [ESC] RESUME TOUR',
  },
  {
    id: 1,
    key: 'profile',
    label: 'PROFILE',
    badge: '01',
    accent: '#6FD3F2',
    bgGradient: 'radial-gradient(ellipse at center, #0B1D26 0%, #07080A 80%)',
    hint: '[↑↓] NAVIGATE  [↵] VIEW ATTRIBUTES',
  },
  {
    id: 2,
    key: 'quests',
    label: 'QUESTS',
    badge: '02',
    accent: '#FF9B42',
    bgGradient: 'radial-gradient(ellipse at center, #26150A 0%, #07080A 80%)',
    hint: '[↑↓] SELECT QUEST  [↵] OPEN CASE STUDY',
  },
  {
    id: 3,
    key: 'skills',
    label: 'SKILLS',
    badge: '03',
    accent: '#A98BFF',
    bgGradient: 'radial-gradient(ellipse at center, #180F26 0%, #07080A 80%)',
    hint: '[HOVER] EXAMINE CONSTELLATION NODE',
  },
  {
    id: 4,
    key: 'inventory',
    label: 'INVENTORY',
    badge: '04',
    accent: '#7FE0A8',
    bgGradient: 'radial-gradient(ellipse at center, #0B2114 0%, #07080A 80%)',
    hint: '[HOVER] INSPECT TOOL SPECIFICATIONS',
  },
  {
    id: 5,
    key: 'journal',
    label: 'JOURNAL',
    badge: '05',
    accent: '#D9A066',
    bgGradient: 'radial-gradient(ellipse at center, #21170D 0%, #07080A 80%)',
    hint: '[SCROLL] BROWSE CHRONOLOGICAL LOGS',
  },
  {
    id: 6,
    key: 'achievements',
    label: 'ACHIEVEMENTS',
    badge: '06',
    accent: '#FFD166',
    bgGradient: 'radial-gradient(ellipse at center, #261E0A 0%, #07080A 80%)',
    hint: '[INSPECT] VERIFY CREDENTIALS & REVIEWS',
  },
  {
    id: 7,
    key: 'uplink',
    label: 'UPLINK',
    badge: '07',
    accent: '#FF6B6B',
    bgGradient: 'radial-gradient(ellipse at center, #260A0A 0%, #07080A 80%)',
    hint: '[TAB] NEXT FIELD  [↵] TRANSMIT SIGNAL',
  },
  {
    id: 8,
    key: 'credits',
    label: 'CREDITS',
    badge: '08',
    accent: '#C3C9D4',
    bgGradient: 'radial-gradient(ellipse at center, #15181F 0%, #07080A 80%)',
    hint: '[ESC] RETURN TO RESUME MENU',
  },
];
