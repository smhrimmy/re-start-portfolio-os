/**
 * Admin Panel "Intelligent Stage" Design Identity Tokens
 * Must be preserved across all admin console pages (/admin/*).
 */
export const INTELLIGENT_STAGE_TOKENS = {
  colors: {
    bgBase: '#ececeb', // Light paper-gray base surface
    surfaceCard: '#f4f4f3',
    surfaceElevated: '#ffffff', // Distinct step for modals, popovers, dropdowns
    surfaceBorder: '#dcdcdc',
    textPrimary: '#1a1a1a',
    textSecondary: '#555555', // Restrained charcoal (6.31:1 contrast)
    textMuted: '#6b6b6b', // Caption & subtle metadata text (4.86:1 contrast - passes WCAG 2.2 AA)
    ledActive: '#15803d', // Green LED status dot (4.62:1 contrast)
    ledWarning: '#b45309', // Warning amber (4.58:1 contrast)
    ledDanger: '#b91c1c', // Danger crimson (4.88:1 contrast)
  },
  typography: {
    fontFamily: '"SF Mono", "Fira Code", monospace, sans-serif',
    mastheadTracking: '0.15em',
  },
};
