import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/consts/theme';

import ThemeIcon from '@/shared/assets/icons/theme-light.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userActions } from '@/entities/User';
import { Icon } from '@/shared/ui/Icon';

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcherEl = ({ className }: ThemeSwitcherProps) => {
  const { toggleTheme } = useTheme();
  const dispath = useAppDispatch();

  const onToggleHandler = useCallback(() => {
    toggleTheme((theme: Theme) => {
      dispath(userActions.saveJsonSettings({ theme: theme }));
    });
  }, [dispath, toggleTheme]);

  return (
    <Button className={classNames('', {}, [className])} theme={ButtonTheme.CLEAR} onClick={onToggleHandler}>
      <Icon Svg={ThemeIcon} width={40} height={40} inverted={true} />
    </Button>
  );
};

export const ThemeSwitcher = memo(ThemeSwitcherEl);
