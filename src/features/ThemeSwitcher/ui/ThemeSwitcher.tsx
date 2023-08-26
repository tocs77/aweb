import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/consts/theme';

import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userActions } from '@/entities/User';

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcherEl = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispath = useAppDispatch();

  const onToggleHandler = useCallback(() => {
    toggleTheme((theme: Theme) => {
      dispath(userActions.saveJsonSettings({ theme: theme }));
    });
  }, [dispath, toggleTheme]);

  return (
    <Button className={classNames('', {}, [className])} theme={ButtonTheme.CLEAR} onClick={onToggleHandler}>
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
};

export const ThemeSwitcher = memo(ThemeSwitcherEl);
