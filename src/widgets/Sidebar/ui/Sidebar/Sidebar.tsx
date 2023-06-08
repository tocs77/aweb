import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Sidebar.module.scss';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher/ui/LangSwitcher';
import { Button, ButtonTheme, ButtonSize } from 'shared/ui/Button';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={classNames(classes.Sidebar, { [classes.collapsed]: collapsed }, [className])} data-testid='sidebar'>
      <Button
        theme={ButtonTheme.BACKGROUND_INVERTED}
        onClick={onToggle}
        data-testid='sidebar-toggle'
        className={classes.collapseBtn}
        square={true}
        size={ButtonSize.L}>
        {collapsed ? '>' : '<'}
      </Button>
      <div className={classes.items}>
        <AppLink to={RoutePath.main} theme={AppLinkTheme.SECONDARY} className={classes.item}>
          <MainIcon className={classes.icon} />
          <span className={classes.link}> {t('Main Page', { ns: 'main' })}</span>
        </AppLink>

        <AppLink to={RoutePath.about} className={classes.item}>
          <AboutIcon className={classes.icon} />
          <span className={classes.link}> {t('About Page', { ns: 'about' })}</span>
        </AppLink>
      </div>
      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={classes.lang} short={collapsed} />
      </div>
    </div>
  );
};
