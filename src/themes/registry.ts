import { ThemeConfig } from './types';
import { theme01Config } from './theme-01/config';
import { theme02Config } from './theme-02/config';
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
registerTheme(themeTemplateConfig);
