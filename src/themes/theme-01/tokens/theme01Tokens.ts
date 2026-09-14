export const THEME_01_TOKENS = {
  colors: {
    bgBase: '#F9F8F6',        // Warm paper background
    bgSurface: '#FFFFFF',     // Clean paper surface
    bgElevated: '#F2F0EB',    // Slightly darker paper
    textPrimary: '#111111',   // Near-black ink
    textSecondary: '#666666', // Restrained charcoal
    textMuted: '#999999',     // Muted gray captions
    rule: '#E2E0D8',          // Thin editorial rule
    ruleDark: '#111111',      // Dark divider rule
    accent: '#8B0000',        // Deep Crimson editorial accent
    accentHover: '#6B0000',
    accentLight: '#FDF2F2',
    success: '#15803D',
    error: '#B91C1C',
    warning: '#C2410C',
  },
  typography: {
    fonts: {
      display: 'Playfair Display, Georgia, Garamond, serif',
      body: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'JetBrains Mono, Courier New, monospace',
    },
    displayXL: { fontSize: '3.5rem', lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' },
    displayL: { fontSize: '2.5rem', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.015em' },
    displayM: { fontSize: '1.75rem', lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.01em' },
    headline: { fontSize: '1.375rem', lineHeight: '1.3', fontWeight: '600' },
    subheadline: { fontSize: '1.125rem', lineHeight: '1.4', fontWeight: '500' },
    body: { fontSize: '0.9375rem', lineHeight: '1.6', fontWeight: '400' },
    caption: { fontSize: '0.75rem', lineHeight: '1.5', fontWeight: '400' },
    metadata: { fontSize: '0.6875rem', lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.05em' },
    indexNumber: { fontSize: '0.8125rem', lineHeight: '1.0', fontWeight: '700' },
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
    durationSlow: 500,
    easeEditorial: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
};
