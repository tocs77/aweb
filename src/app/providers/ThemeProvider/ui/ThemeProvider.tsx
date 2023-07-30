import { PropsWithChildren, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/consts/localstorage';
import { ThemeContext } from '@/shared/lib/context/ThemeContext/ThemeContext';
import { Theme } from '@/shared/consts/theme';

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

interface ThemeProviderProps {
  initialTheme?: Theme;
}

export const ThemeProvider = (props: PropsWithChildren<ThemeProviderProps>) => {
  const [theme, setTheme] = useState<Theme>(props.initialTheme || defaultTheme);

  const defaultProps = useMemo(() => {
    return { theme: theme, setTheme: setTheme };
  }, [theme, setTheme]);

  return <ThemeContext.Provider value={defaultProps}>{props.children}</ThemeContext.Provider>;
};
