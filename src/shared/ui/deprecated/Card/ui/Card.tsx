import { PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  theme?: CardTheme;
  max?: boolean;
}

/**
 * @deprecated component deprecated
 */

export const Card = (props: PropsWithChildren<CardProps>) => {
  const { className, children, theme = CardTheme.NORMAL, max, ...otherProps } = props;

  return (
    <div className={classNames(classes.Card, { [classes.max]: max }, [className, classes[theme]])} {...otherProps}>
      {children}
    </div>
  );
};
