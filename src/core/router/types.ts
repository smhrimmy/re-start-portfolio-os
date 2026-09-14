import React from 'react';
import { DeviceTier } from '../device/device-tier';
import {
  Theme02Project,
  Theme02Article,
  Theme02Experience,
  Theme02OwnerProfile,
} from '../../themes/theme-02/utils/theme02DataAdapter';

export interface ThemeStoreData {
  projects: Theme02Project[];
  articles: Theme02Article[];
  experiences: Theme02Experience[];
  resumeConfig: {
    summary: string;
    skills: string[];
    education: Array<{ degree: string; institution: string; year: string }>;
    certifications: Array<{ title: string; issuer: string; date: string }>;
    pdfUrl: string;
  };
  ownerProfile: Theme02OwnerProfile;
}

export interface ThemeSkinProps {
  tier: DeviceTier;
  data: ThemeStoreData;
  onOpenSearch: () => void;
}

export type ThemeSkinComponent = React.FC<ThemeSkinProps>;
