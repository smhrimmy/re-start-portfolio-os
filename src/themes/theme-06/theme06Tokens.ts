export const theme06Tokens = {
  colors: {
    bgPrimary: '#FAFAF8',
    bgSecondary: '#F5F3F0',
    bgTertiary: '#EBE8E3',
    textPrimary: '#1A1A1A',
    textSecondary: '#5C5C5C',
    textTertiary: '#A0A0A0',
    accentPrimary: '#0066FF',
    accentSecondary: '#00D4FF',
    accentTertiary: '#D4AF37',
    accentWarm: '#FF6B35',
    glassLight: 'rgba(255, 255, 255, 0.7)',
    glassMed: 'rgba(255, 255, 255, 0.5)',
    glassDark: 'rgba(26, 26, 26, 0.08)',
    shadowGlass: '0 8px 32px rgba(31, 38, 135, 0.15)',
    borderPrimary: 'rgba(26, 26, 26, 0.1)',
    borderLight: 'rgba(26, 26, 26, 0.05)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
    '5xl': '128px',
  },
  typography: {
    fontSerif: '"Instrument Serif", "Georgia", serif',
    fontSans: '"Satoshi", "Inter", -apple-system, sans-serif',
  },
  animation: {
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    durations: {
      pageLoad: '0.6s',
      scroll: '0.8s',
      hover: '0.4s',
      micro: '0.3s',
      modal: '0.4s',
      transition: '0.6s',
    },
  },
  glass: {
    card: {
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(16px) saturate(120%)',
      border: '1px solid rgba(26, 26, 26, 0.1)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
    },
  },
  threeJs: {
    particleCount: {
      HIGH: 400,
      MEDIUM: 250,
      LOW: 80,
    },
    shapeCount: {
      HIGH: 10,
      MEDIUM: 5,
      LOW: 2,
    },
  },
};

export default theme06Tokens;
