import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import classes from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/types/sidebar';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getAuthData } from '@/entities/User';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

const SidebarItemEl = ({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const isAuth = useSelector(getAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <AppLink
          to={item.path}
          variant='primary'
          activeClassName={classes.active}
          className={classNames(classes.itemRedesigned, { [classes.collapsedRedesigned]: collapsed }, [])}>
          <Icon Svg={item.Icon} />
          <span className={classes.link}> {t(item.text)}</span>
        </AppLink>
      }
      off={
        <AppLinkDeprecated
          to={item.path}
          theme={AppLinkTheme.SECONDARY}
          className={classNames(classes.item, { [classes.collapsed]: collapsed }, [])}>
          <item.Icon className={classes.icon} />
          <span className={classes.link}> {t(item.text)}</span>
        </AppLinkDeprecated>
      }
    />
  );
};

export const SidebarItem = memo(SidebarItemEl);
