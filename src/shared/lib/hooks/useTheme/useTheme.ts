import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '@/shared/consts/localstorage';
import { ThemeContext } from '@/shared/lib/context/ThemeContext/ThemeContext';
import { Theme } from '@/shared/consts/theme';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

const defaultTheme = Theme.LIGHT;
const themes = Object.values(Theme);

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    const currentTheme = theme || defaultTheme;
    let themeIndex = themes.indexOf(currentTheme);
    if (themeIndex === themes.length - 1) themeIndex = -1;

    const newTheme = themes[themeIndex + 1];
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    document.body.className = newTheme;
    setTheme?.(newTheme);
  };
  return { toggleTheme, theme: theme || defaultTheme };
};
