import { useContext } from 'react';

import { ThemeContext } from '@/shared/lib/context/ThemeContext/ThemeContext';
import { Theme } from '@/shared/consts/theme';

interface UseThemeResult {
  toggleTheme: (saveAction: (theme: Theme) => void) => void;
  theme: Theme;
}

const defaultTheme = Theme.LIGHT;
const themes = Object.values(Theme);

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = (saveAction?: (theme: Theme) => void) => {
    const currentTheme = theme || defaultTheme;
    let themeIndex = themes.indexOf(currentTheme);
    if (themeIndex === themes.length - 1) themeIndex = -1;

    const newTheme = themes[themeIndex + 1];
    saveAction?.(newTheme);
    document.body.className = newTheme;
    setTheme?.(newTheme);
  };
  return { toggleTheme, theme: theme || defaultTheme };
};
