import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Sidebar.module.scss';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher/ui/LangSwitcher';
import { Button, ButtonTheme, ButtonSize } from '@/shared/ui/deprecated/Button';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

interface SidebarProps {
  className?: string;
}

const SidebarEl = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const sidebarItemsList = useSelector(getSidebarItems);

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <menu
          className={classNames(classes.SidebarRedesigned, { [classes.collapsedRedesigned]: collapsed }, [className])}
          data-testid='sidebar'>
          <AppLogo className={classes.appLogo} size={collapsed ? 30 : 50} />
          <VStack className={classes.items} gap='8'>
            {sidebarItemsList.map((item) => (
              <SidebarItem key={item.path} item={item} collapsed={collapsed} data-testid={item.path} />
            ))}
          </VStack>
          <div className={classes.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={classes.lang} short={collapsed} />
          </div>
          <Icon
            clickable={true}
            onClick={onToggle}
            data-testid='sidebar-toggle'
            className={classes.collapseBtn}
            Svg={ArrowIcon}
          />
        </menu>
      }
      off={
        <menu className={classNames(classes.Sidebar, { [classes.collapsed]: collapsed }, [className])} data-testid='sidebar'>
          <Button
            theme={ButtonTheme.BACKGROUND_INVERTED}
            onClick={onToggle}
            data-testid='sidebar-toggle'
            className={classes.collapseBtn}
            square={true}
            size={ButtonSize.L}>
            {collapsed ? '>' : '<'}
          </Button>
          <VStack className={classes.items} gap='8'>
            {sidebarItemsList.map((item) => (
              <SidebarItem key={item.path} item={item} collapsed={collapsed} data-testid={item.path} />
            ))}
          </VStack>
          <div className={classes.switchers}>
            <ThemeSwitcher />
            <LangSwitcher className={classes.lang} short={collapsed} />
          </div>
        </menu>
      }
    />
  );
};

export const Sidebar = memo(SidebarEl);
