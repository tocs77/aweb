import { PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: CardVariant;
  max?: boolean;
  padding?: CardPadding;
}

export const Card = (props: PropsWithChildren<CardProps>) => {
  const { className, children, variant = 'normal', padding = 0, max, ...otherProps } = props;

  return (
    <div
      className={classNames(classes.Card, { [classes.max]: max }, [className, classes[variant]])}
      {...otherProps}
      style={{ padding: `${padding}px` }}>
      {children}
    </div>
  );
};
