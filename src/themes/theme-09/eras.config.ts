export interface EraTokens {
  '--bg': string;
  '--bg-2': string;
  '--panel': string;
  '--accent': string;
  '--accent-2': string;
  '--text': string;
  '--text-dim': string;
  '--glow': string;
  '--radius': string;
  '--border': string;
  '--grain': string;
  '--font-display': string;
  '--font-body': string;
  '--tracking': string;
  '--blur': string;
}

export interface EraLabels {
  skills: string;
  projects: string;
  experience: string;
  achievements: string;
  contact: string;
  cta: string;
}

export interface EraSpec {
  id: string;
  code: string;
  shortName: string;
  name: string;
  label: string;
  year: string;
  tagline: string;
  character: string;
  backdrop: string;
  minimap: string;
  accent: string;
  bg: string;
  panelBorder: string;
  characterBadge: string;
  assetPak: string;
  sfx?: string;
  tokens: EraTokens;
  labels: EraLabels;
}

export const ERAS: Record<string, EraSpec> = {
  three: {
    id: 'three',
    code: 'III',
    shortName: 'III',
    name: 'LIBERTY CITY',
    label: 'LIBERTY CITY',
    year: '2001',
    tagline: 'KEEP YOUR HEAD DOWN',
    character: '/assets/character-reference.png',
    backdrop: 'radial-gradient(ellipse at center, #1E2228 0%, #15181C 100%)',
    minimap: '/art/map-liberty.webp',
    accent: '#c8552b',
    bg: '#15181c',
    panelBorder: '2px solid #3a4048',
    characterBadge: 'III · OPERATOR',
    assetPak: 'STREAMING ASSETS · LIBERTY_CITY_2001.PAK',
    tokens: {
      '--bg': '#15181c',
      '--bg-2': '#1e2228',
      '--panel': 'rgba(30,34,40,0.92)',
      '--accent': '#c8552b',
      '--accent-2': '#8c8f94',
      '--text': '#e6e6e6',
      '--text-dim': '#8a8f96',
      '--glow': '0 0 0 rgba(0,0,0,0)',
      '--radius': '0px',
      '--border': '2px solid #3a4048',
      '--grain': '0.28',
      '--font-display': "'Oswald', 'Arial Narrow', sans-serif",
      '--font-body': "'Roboto Condensed', sans-serif",
      '--tracking': '0.06em',
      '--blur': '0px',
    },
    labels: {
      skills: 'STATS',
      projects: 'MISSIONS',
      experience: 'RAP SHEET',
      achievements: 'REWARDS',
      contact: 'PAYPHONE',
      cta: 'START GAME',
    },
  },

  viceCity: {
    id: 'viceCity',
    code: 'VC',
    shortName: 'VC',
    name: 'VICE CITY',
    label: 'VICE CITY',
    year: '1986',
    tagline: 'STAY LEGENDARY',
    character: '/assets/character-reference.png',
    backdrop: 'radial-gradient(ellipse at center, #2A1052 0%, #160B2E 100%)',
    minimap: '/art/map-vice.webp',
    accent: '#ff3fb4',
    bg: '#160b2e',
    panelBorder: '2px solid #ff3fb4',
    characterBadge: 'VC · OPERATOR',
    assetPak: 'STREAMING ASSETS · VICE_CITY_1986.PAK',
    tokens: {
      '--bg': '#160b2e',
      '--bg-2': '#2a1052',
      '--panel': 'rgba(28,10,55,0.78)',
      '--accent': '#ff3fb4',
      '--accent-2': '#25e6f0',
      '--text': '#ffffff',
      '--text-dim': '#c7a8ff',
      '--glow': '0 0 18px rgba(255,63,180,0.65)',
      '--radius': '10px',
      '--border': '2px solid #ff3fb4',
      '--grain': '0.10',
      '--font-display': "'Monoton', 'Righteous', cursive",
      '--font-body': "'Rajdhani', sans-serif",
      '--tracking': '0.10em',
      '--blur': '6px',
    },
    labels: {
      skills: 'SKILLS TREE',
      projects: 'CASE STUDIES',
      experience: 'EXPERIENCE LOG',
      achievements: 'TROPHIES',
      contact: 'CONTACT SAFE',
      cta: 'START GAME',
    },
  },

  sanAndreas: {
    id: 'sanAndreas',
    code: 'SA',
    shortName: 'SA',
    name: 'SAN ANDREAS',
    label: 'SAN ANDREAS',
    year: '1992',
    tagline: 'RESPECT IS EARNED',
    character: '/assets/character-reference.png',
    backdrop: 'radial-gradient(ellipse at center, #2B3318 0%, #181C10 100%)',
    minimap: '/art/map-sa.webp',
    accent: '#9ecb3c',
    bg: '#181c10',
    panelBorder: '3px solid #6d7a32',
    characterBadge: 'SA · OPERATOR',
    assetPak: 'STREAMING ASSETS · SAN_ANDREAS_1992.PAK',
    tokens: {
      '--bg': '#181c10',
      '--bg-2': '#2b3318',
      '--panel': 'rgba(24,28,16,0.90)',
      '--accent': '#9ecb3c',
      '--accent-2': '#e8b13a',
      '--text': '#f2f0e2',
      '--text-dim': '#9aa27a',
      '--glow': '0 0 8px rgba(158,203,60,0.35)',
      '--radius': '3px',
      '--border': '3px solid #6d7a32',
      '--grain': '0.22',
      '--font-display': "'Permanent Marker', 'Impact', cursive",
      '--font-body': "'Barlow Condensed', sans-serif",
      '--tracking': '0.04em',
      '--blur': '0px',
    },
    labels: {
      skills: 'RESPECT',
      projects: 'TERRITORIES',
      experience: 'HISTORY',
      achievements: 'STREET CRED',
      contact: 'HOMIES',
      cta: 'START GAME',
    },
  },

  four: {
    id: 'four',
    code: 'IV',
    shortName: 'IV',
    name: 'LIBERTY CITY',
    label: 'LIBERTY CITY',
    year: '2008',
    tagline: 'THE AMERICAN DREAM, ALLEGEDLY',
    character: '/assets/character-reference.png',
    backdrop: 'radial-gradient(ellipse at center, #1B2229 0%, #12161A 100%)',
    minimap: '/art/map-liberty-hd.webp',
    accent: '#d9a441',
    bg: '#12161a',
    panelBorder: '1px solid #38424c',
    characterBadge: 'IV · OPERATOR',
    assetPak: 'STREAMING ASSETS · LIBERTY_CITY_2008.PAK',
    tokens: {
      '--bg': '#12161a',
      '--bg-2': '#1b2229',
      '--panel': 'rgba(18,22,26,0.88)',
      '--accent': '#d9a441',
      '--accent-2': '#6f8ba3',
      '--text': '#dfe4e8',
      '--text-dim': '#7b8894',
      '--glow': '0 0 10px rgba(217,164,65,0.25)',
      '--radius': '2px',
      '--border': '1px solid #38424c',
      '--grain': '0.34',
      '--font-display': "'Bebas Neue', sans-serif",
      '--font-body': "'Inter', sans-serif",
      '--tracking': '0.08em',
      '--blur': '2px',
    },
    labels: {
      skills: 'ABILITIES',
      projects: 'CONTRACTS',
      experience: 'CRIMINAL RECORD',
      achievements: 'ACCOLADES',
      contact: 'PHONE',
      cta: 'START GAME',
    },
  },

  five: {
    id: 'five',
    code: 'V',
    shortName: 'V',
    name: 'LOS SANTOS',
    label: 'LOS SANTOS',
    year: '2013',
    tagline: 'BUILD DIFFERENT',
    character: '/assets/character-reference.png',
    backdrop: 'radial-gradient(ellipse at center, #1F2228 0%, #0D0F12 100%)',
    minimap: '/art/map-losantos.webp',
    accent: '#f2a01d',
    bg: '#0d0f12',
    panelBorder: '0px solid transparent',
    characterBadge: 'V · OPERATOR',
    assetPak: 'STREAMING ASSETS · LOS_SANTOS_2013.PAK',
    tokens: {
      '--bg': '#0d0f12',
      '--bg-2': '#f4f4f2',
      '--panel': 'rgba(255,255,255,0.96)',
      '--accent': '#f2a01d',
      '--accent-2': '#2f9e6e',
      '--text': '#101214',
      '--text-dim': '#6b7075',
      '--glow': '0 4px 24px rgba(0,0,0,0.18)',
      '--radius': '4px',
      '--border': '0px solid transparent',
      '--grain': '0.04',
      '--font-display': "'Archivo Black', sans-serif",
      '--font-body': "'Archivo', sans-serif",
      '--tracking': '0.02em',
      '--blur': '0px',
    },
    labels: {
      skills: 'SKILLS TREE',
      projects: 'HEISTS',
      experience: 'CAREER LOG',
      achievements: 'AWARDS',
      contact: 'CONTACTS',
      cta: 'START GAME',
    },
  },

  six: {
    id: 'six',
    code: 'VI',
    shortName: 'VI',
    name: 'LEONIDA',
    label: 'LEONIDA',
    year: '2025',
    tagline: 'THE NEXT CHAPTER',
    character: '/assets/character-reference.png',
    backdrop: 'radial-gradient(ellipse at center, #3B1F4A 0%, #1A0F22 100%)',
    minimap: '/art/map-leonida.webp',
    accent: '#ff7a59',
    bg: '#1a0f22',
    panelBorder: '1px solid rgba(255,255,255,0.22)',
    characterBadge: 'VI · OPERATOR',
    assetPak: 'STREAMING ASSETS · LEONIDA_2025.PAK',
    tokens: {
      '--bg': '#1a0f22',
      '--bg-2': '#3b1f4a',
      '--panel': 'rgba(255,255,255,0.10)',
      '--accent': '#ff7a59',
      '--accent-2': '#4fd6c8',
      '--text': '#fff6f0',
      '--text-dim': '#d7b8c8',
      '--glow': '0 8px 40px rgba(255,122,89,0.28)',
      '--radius': '18px',
      '--border': '1px solid rgba(255,255,255,0.22)',
      '--grain': '0.06',
      '--font-display': "'Clash Display', 'Sora', sans-serif",
      '--font-body': "'Sora', sans-serif",
      '--tracking': '0.14em',
      '--blur': '22px',
    },
    labels: {
      skills: 'SKILL MATRIX',
      projects: 'CASE STUDIES',
      experience: 'TIMELINE',
      achievements: 'MILESTONES',
      contact: 'LINK UP',
      cta: 'ENTER LEONIDA',
    },
  },
};

export const ERA_ORDER = ['three', 'viceCity', 'sanAndreas', 'four', 'five', 'six'];
export const DEFAULT_ERA = 'five';
export const GTA_ERAS: EraSpec[] = ERA_ORDER.map((id) => ERAS[id]);
