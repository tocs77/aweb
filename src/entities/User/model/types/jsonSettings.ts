import { Theme } from '@/shared/consts/theme';

export interface JsonSettings {
  theme?: Theme;
  isFirstVisit?: boolean;
  settingsPageHasBeenOpened?: boolean;
}

export const defaultJsonSettings: JsonSettings = {
  theme: Theme.LIGHT,
  isFirstVisit: true,
  settingsPageHasBeenOpened: false,
};
