import { ThemeConfig } from '../types';
import Theme02Component from './index';

export const theme02Config: ThemeConfig = {
  id: 'theme-02',
  name: 'Digital Control Deck',
  description: 'A compact futuristic engineering control deck with interactive 3D hero core, perspective card deck, and hardware boot sequence.',
  version: '2.5.0',
  author: 'Prajwal DL',
  supports3D: true,
  minSupportedTier: 'LOW',
  component: Theme02Component,
};
