import { ThemeConfig } from '../types';
import { theme03Tokens } from './theme03Tokens';

export const theme03Config: ThemeConfig = {
  id: 'theme-03-archive-desk',
  layoutArchitecture: 'Tactile Oblique Archive Desk & Collection Stack',
  navigationPattern: 'Sticky Monospace Chrome + Glossy Navy Pill Action',
  gridSystem: 'Two-Column Oblique Stage (Pills Left, 3D Box Right)',
  typographyPairing: 'Instrument Serif + Satoshi Sans',
  motionLanguage: '3D Folder Skew & Lift, Tactile Sticker Dangle',
  capabilities: ['Motion-Rich', 'Pointer-Intensive'],
  fallback: 'theme-01',
  colorTokens: theme03Tokens,
};
