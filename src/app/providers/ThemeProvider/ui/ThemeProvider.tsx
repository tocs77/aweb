import { PropsWithChildren, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

export const ThemeProvider = (props: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultProps = useMemo(() => {
    return { theme: theme, setTheme: setTheme };
  }, [theme, setTheme]);

  return <ThemeContext.Provider value={defaultProps}>{props.children}</ThemeContext.Provider>;
};
