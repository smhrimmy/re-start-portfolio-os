import { ThemeConfig } from '../types';
import { Theme04Component } from './index';

export const theme04Config: ThemeConfig = {
  id: 'theme-04',
  name: '3D Scrollytelling Story',
  description: 'Immersive 3D scroll-driven experience with dynamic Three.js WebGL spatial scenes, camera dolly progression, and holographic project plates.',
  version: '1.0.0',
  author: 'Portfolio OS Core',
  supports3D: true,
  minSupportedTier: 'MEDIUM',
  component: Theme04Component,
};

export default theme04Config;
