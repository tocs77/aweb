import { ReactNode, memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Tabs.module.scss';
import { Card, CardTheme } from '@/shared/ui/deprecated/Card';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (value: string) => void;
}

const TabsEl = (props: TabsProps) => {
  const { className, tabs, value, onTabClick } = props;

  const clickHandler = useCallback(
    (value: string) => {
      return () => onTabClick(value);
    },
    [onTabClick],
  );

  return (
    <div className={classNames(classes.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          theme={value === tab.value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          onClick={clickHandler(tab.value)}>
          {tab.content}
        </Card>
      ))}
    </div>
  );
};

/**
 * @deprecated component deprecated
 */

export const Tabs = memo(TabsEl);
