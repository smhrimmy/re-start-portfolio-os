export const THEME_02_TOKENS = {
  colors: {
    bgBase: '#0A0D10',        // Deep Graphite Base
    bgSurface: '#161B22',     // Panel Surface
    bgElevated: '#1F242C',    // Elevated Panel
    bgBorder: '#30363D',      // Structural Line / Border
    textPrimary: '#E6EDF3',   // Crisp White
    textSecondary: '#8B949E', // Technical Muted Gray
    textMuted: '#6E7681',     // Dim Metadata
    accentCyan: '#00F0FF',    // Primary Cyan Accent
    accentCyanHover: '#00C8D6',
    accentAmber: '#FF9F1C',   // Indicator Amber
    accentAmberHover: '#E58800',
    success: '#2EA043',
    error: '#F85149',
    warning: '#D29922',
  },
  typography: {
    fonts: {
      display: 'Chakra Petch, Orbitron, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    displayXL: { fontSize: '3rem', lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' },
    displayL: { fontSize: '2.25rem', lineHeight: '1.15', fontWeight: '700' },
    displayM: { fontSize: '1.5rem', lineHeight: '1.2', fontWeight: '600' },
    headline: { fontSize: '1.25rem', lineHeight: '1.3', fontWeight: '600' },
    subheadline: { fontSize: '1rem', lineHeight: '1.4', fontWeight: '500' },
    body: { fontSize: '0.875rem', lineHeight: '1.5', fontWeight: '400' },
    caption: { fontSize: '0.75rem', lineHeight: '1.4', fontWeight: '400' },
    metadata: { fontSize: '0.6875rem', lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.08em' },
    code: { fontSize: '0.75rem', lineHeight: '1.4', fontWeight: '400' },
  },
  grid: {
    desktopColumns: 12,
    tabletColumns: 8,
    mobileColumns: 4,
    maxWidth: '1280px',
  },
  motion: {
    durationFast: 200,
    durationBase: 350,
    durationSlow: 600,
    easeControl: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
};
