import { ReactElement } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './StickyContentLayout.module.scss';

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactElement;
  content: ReactElement;
  right?: ReactElement;
}
export const StickyConentLayout = (props: StickyContentLayoutProps) => {
  const { className, left, content, right } = props;
  return (
    <div className={classNames(classes.StickyContentLayout, {}, [className])}>
      {right && <div className={classes.right}>{right}</div>}
      <div className={classes.content}>{content}</div>
      {left && <div className={classes.left}>{left}</div>}
    </div>
  );
};
