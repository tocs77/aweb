import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { ThemeContext } from '@/shared/lib/context/ThemeContext/ThemeContext';
import { Theme } from '@/shared/consts/theme';
import { useGetJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
  initialTheme?: Theme;
}

export const ThemeProvider = (props: PropsWithChildren<ThemeProviderProps>) => {
  const { theme: defaultTheme = Theme.LIGHT } = useGetJsonSettings();
  const [theme, setTheme] = useState<Theme>(props.initialTheme || defaultTheme);
  useEffect(() => {
    setTheme(defaultTheme);
  }, [defaultTheme]);

  const defaultProps = useMemo(() => {
    return { theme: theme, setTheme: setTheme };
  }, [theme, setTheme]);

  return <ThemeContext.Provider value={defaultProps}>{props.children}</ThemeContext.Provider>;
};
