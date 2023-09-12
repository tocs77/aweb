import { ReactNode, memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Flex, FlexDirection } from '@/shared/ui/redesigned/Stack';

import classes from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (value: string) => void;
  direction?: FlexDirection;
}

const TabsEl = (props: TabsProps) => {
  const { className, tabs, value, onTabClick, direction = 'row' } = props;

  const clickHandler = useCallback(
    (value: string) => {
      return () => onTabClick(value);
    },
    [onTabClick],
  );

  return (
    <Flex className={classNames('', {}, [className])} direction={direction} gap='8' align='start'>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          variant={value === tab.value ? 'light' : 'normal'}
          onClick={clickHandler(tab.value)}
          border={'round'}
          className={classes.tab}>
          {tab.content}
        </Card>
      ))}
    </Flex>
  );
};

export const Tabs = memo(TabsEl);
