import { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Sidebar.module.scss';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher/ui/LangSwitcher';
import { Button, ButtonTheme, ButtonSize } from 'shared/ui/Button';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from './SidebarItem/SidebarItem';
import { useSelector } from 'react-redux';

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
      <div className={classes.items}>
        {sidebarItemsList.map((item) => (
          <SidebarItem key={item.path} item={item} collapsed={collapsed} data-testid={item.path} />
        ))}
      </div>
      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={classes.lang} short={collapsed} />
      </div>
    </menu>
  );
};

export const Sidebar = memo(SidebarEl);
