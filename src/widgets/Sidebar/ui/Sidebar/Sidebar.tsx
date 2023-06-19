import { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Sidebar.module.scss';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher/ui/LangSwitcher';
import { Button, ButtonTheme, ButtonSize } from 'shared/ui/Button';
import { SidebarItemsList } from 'widgets/Sidebar/model/items';
import { SidebarItem } from './SidebarItem/SidebarItem';

interface SidebarProps {
  className?: string;
}

const SidebarEl = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
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
        {SidebarItemsList.map((item) => (
          <SidebarItem key={item.path} item={item} collapsed={collapsed} data-testid={item.path} />
        ))}
      </div>
      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={classes.lang} short={collapsed} />
      </div>
    </div>
  );
};

export const Sidebar = memo(SidebarEl);
