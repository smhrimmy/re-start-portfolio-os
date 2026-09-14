import React from 'react';
import { DeviceTier } from '../../core/device/device-tier';
import { HeroCanvas } from './components/HeroCanvas';
import { Hero2DFallback } from './components/Hero2DFallback';
import { ThemeConfig } from '../types';
import './tokens.css';

interface ThemeProps {
  tier: DeviceTier;
}

export const ThemeTemplateComponent: React.FC<ThemeProps> = ({ tier }) => {
  const render3D = tier !== 'LOW';

  return (
    <div className="theme-template-root p-8 rounded-2xl min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Portfolio OS — Starter Theme</h1>
        <p className="text-slate-400">Current Device Tier: <span className="font-mono text-blue-400">{tier}</span></p>
      </header>

      <main className="space-y-6">
        {render3D ? <HeroCanvas /> : <Hero2DFallback />}
      </main>
    </div>
  );
};

export const themeTemplateConfig: ThemeConfig = {
  id: 'theme-template',
  name: 'Starter Theme Template',
  description: 'Standard boilerplate implementation matching ThemeConfig contract',
  version: '1.0.0',
  author: 'Portfolio OS Core',
  supports3D: true,
  minSupportedTier: 'LOW',
  component: ThemeTemplateComponent,
};

export default ThemeTemplateComponent;
