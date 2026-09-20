import { ThemeConfig } from './types';
import { theme01Config } from './theme-01/config';
import { theme02Config } from './theme-02/config';
import { theme03Config } from './theme-03/config';
import { theme04Config } from './theme-04/config';
import { theme05Config } from './theme-05/config';
import { theme06Config } from './theme-06/config';
import { theme07Config } from './theme-07/config';
import { theme08Config } from './theme-08/config';
import { theme09Config } from './theme-09/config';
import { themeTemplateConfig } from './theme-template';

const themeRegistry = new Map<string, ThemeConfig>();

export function registerTheme(config: ThemeConfig): void {
  validateThemeUniqueness(config.id);
  themeRegistry.set(config.id, config);
}

export function validateThemeUniqueness(themeId: string): void {
  if (themeRegistry.has(themeId)) {
    throw new Error(`[ThemeRegistry] Duplicate theme registration detected: '${themeId}'`);
  }
}

export function getTheme(themeId: string): ThemeConfig | undefined {
  return themeRegistry.get(themeId);
}

export function getAllThemes(): ThemeConfig[] {
  return Array.from(themeRegistry.values());
}

// Auto-register built-in themes
registerTheme(theme01Config);
registerTheme(theme02Config);
registerTheme(theme03Config);
registerTheme(theme04Config);
registerTheme(theme05Config);
registerTheme(theme06Config);
registerTheme(theme07Config);
registerTheme(theme08Config);
registerTheme(theme09Config);
registerTheme(themeTemplateConfig);




