import { ComponentType } from 'react';
import { DeviceTier } from '../core/device/device-tier';

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  supports3D: boolean;
  minSupportedTier: DeviceTier;
  component: ComponentType<{ tier: DeviceTier }>;
}
