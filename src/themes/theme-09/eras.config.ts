export interface EraSpec {
  id: string;
  name: string;
  shortName: string;
  year: string;
  accent: string;
  bg: string;
  panelBg: string;
  panelBorder: string;
  fontDisplay: string;
  fontBody: string;
  voice: string;
  tagline: string;
  characterBadge: string;
  assetPak: string;
  hudStyle: 'chunky' | 'neon' | 'stencil' | 'gritty' | 'flat' | 'glass';
  labels: {
    projects: string;
    skills: string;
    experience: string;
    contact: string;
  };
}

export const GTA_ERAS: EraSpec[] = [
  {
    id: 'iii',
    name: 'GTA III',
    shortName: 'III',
    year: '2001',
    accent: '#D9531E',
    bg: '#14181F',
    panelBg: 'rgba(20, 24, 31, 0.9)',
    panelBorder: 'rgba(217, 83, 30, 0.4)',
    fontDisplay: '"Trebuchet MS", "Impact", sans-serif',
    fontBody: '"Inter", sans-serif',
    voice: 'Terse & Grim',
    tagline: 'JOB COMPLETE.',
    characterBadge: 'LIBERTY CITY SILENT OPERATOR',
    assetPak: 'STREAMING ASSETS: LIBERTY_CITY_2001.PAK',
    hudStyle: 'chunky',
    labels: {
      projects: 'MISSIONS',
      skills: 'STATS',
      experience: 'CRIME LOG',
      contact: 'PAGER UPLINK',
    },
  },
  {
    id: 'vc',
    name: 'Vice City',
    shortName: 'VC',
    year: '1986',
    accent: '#FF007F',
    bg: '#0E081C',
    panelBg: 'rgba(14, 8, 28, 0.85)',
    panelBorder: 'rgba(255, 0, 127, 0.5)',
    fontDisplay: '"Brush Script MT", "Caveat", cursive',
    fontBody: '"Inter", sans-serif',
    voice: 'Flashy & Neon',
    tagline: 'STAY LEGENDARY.',
    characterBadge: 'VICE CITY EXECUTIVE PRODUCER',
    assetPak: 'STREAMING ASSETS: VICE_CITY_1986.PAK',
    hudStyle: 'neon',
    labels: {
      projects: 'ASSETS & DEALS',
      skills: 'REPUTATION',
      experience: 'EMPIRE TIMELINE',
      contact: 'RADIO TRANSMISSION',
    },
  },
  {
    id: 'sa',
    name: 'San Andreas',
    shortName: 'SA',
    year: '1992',
    accent: '#FFD700',
    bg: '#12160C',
    panelBg: 'rgba(18, 22, 12, 0.9)',
    panelBorder: 'rgba(255, 215, 0, 0.4)',
    fontDisplay: '"Impact", "Arial Black", sans-serif',
    fontBody: '"Inter", sans-serif',
    voice: 'Streetwise & Bold',
    tagline: 'RESPECT +15',
    characterBadge: 'SAN ANDREAS CHIEF ARCHITECT',
    assetPak: 'STREAMING ASSETS: SAN_ANDREAS_1992.PAK',
    hudStyle: 'stencil',
    labels: {
      projects: 'TURF & HEISTS',
      skills: 'RESPECT & STATS',
      experience: 'HOOD HISTORY',
      contact: 'PAYPHONE DIAL',
    },
  },
  {
    id: 'iv',
    name: 'GTA IV',
    shortName: 'IV',
    year: '2008',
    accent: '#FFBF00',
    bg: '#0D0F12',
    panelBg: 'rgba(13, 15, 18, 0.92)',
    panelBorder: 'rgba(255, 191, 0, 0.35)',
    fontDisplay: '"Georgia", "Playfair Display", serif',
    fontBody: '"Inter", sans-serif',
    voice: 'Cynical & Gritty',
    tagline: 'CONTRACT FULFILLED.',
    characterBadge: 'LIBERTY CITY VETERAN DEVELOPER',
    assetPak: 'STREAMING ASSETS: LIBERTY_CITY_2008.PAK',
    hudStyle: 'gritty',
    labels: {
      projects: 'CONTRACTS',
      skills: 'CAPABILITIES',
      experience: 'DOSSIER LOG',
      contact: 'CELLULAR UPLINK',
    },
  },
  {
    id: 'v',
    name: 'GTA V',
    shortName: 'V',
    year: '2013',
    accent: '#FF6600',
    bg: '#0A0B0E',
    panelBg: 'rgba(10, 11, 14, 0.9)',
    panelBorder: 'rgba(255, 102, 0, 0.4)',
    fontDisplay: '"Oswald", "Bebas Neue", sans-serif',
    fontBody: '"Inter", sans-serif',
    voice: 'Corporate Satire',
    tagline: 'MISSION PASSED',
    characterBadge: 'LOS SANTOS CREATIVE DIRECTOR',
    assetPak: 'STREAMING ASSETS: LOS_SANTOS_2013.PAK',
    hudStyle: 'flat',
    labels: {
      projects: 'CASE STUDIES',
      skills: 'SKILLS TREE',
      experience: 'CAREER HISTORY',
      contact: 'CONTACT CONSOLE',
    },
  },
  {
    id: 'vi',
    name: 'GTA VI',
    shortName: 'VI',
    year: '2025',
    accent: '#00E5FF',
    bg: '#080A14',
    panelBg: 'rgba(8, 10, 20, 0.75)',
    panelBorder: 'rgba(0, 229, 255, 0.45)',
    fontDisplay: '"Satoshi", "Inter", sans-serif',
    fontBody: '"Inter", sans-serif',
    voice: 'Optimistic & Next-Gen',
    tagline: 'LEVEL UP.',
    characterBadge: 'LEONIDA NEXT-GEN ARCHITECT',
    assetPak: 'STREAMING ASSETS: LEONIDA_2025.PAK',
    hudStyle: 'glass',
    labels: {
      projects: 'SPATIAL PORTALS',
      skills: 'NEXT-GEN MATRIX',
      experience: 'PROGRESSION TIMELINE',
      contact: 'QUANTUM TRANSMISSION',
    },
  },
];
