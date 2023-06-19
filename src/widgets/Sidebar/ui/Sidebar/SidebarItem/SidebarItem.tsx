import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { useTranslation } from 'react-i18next';
import classes from './SidebarItem.module.scss';
import { SidebarItemType } from '../../../model/items';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

const SidebarItemEl = ({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  return (
    <AppLink
      to={item.path}
      theme={AppLinkTheme.SECONDARY}
      className={classNames(classes.item, { [classes.collapsed]: collapsed }, [])}>
      <item.Icon className={classes.icon} />
      <span className={classes.link}> {t(item.text)}</span>
    </AppLink>
  );
};

export const SidebarItem = memo(SidebarItemEl);
