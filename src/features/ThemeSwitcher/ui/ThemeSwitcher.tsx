import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/consts/theme';

import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userActions } from '@/entities/User';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ToggleFeatures } from '@/shared/lib/features';

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
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<Icon Svg={ThemeIcon} width={40} height={40} clickable onClick={onToggleHandler} />}
      off={
        <ButtonDeprecated className={classNames('', {}, [className])} theme={ButtonTheme.CLEAR} onClick={onToggleHandler}>
          <IconDeprecated Svg={ThemeIconDeprecated} width={40} height={40} inverted={true} />
        </ButtonDeprecated>
      }
    />
  );
};

export const ThemeSwitcher = memo(ThemeSwitcherEl);
