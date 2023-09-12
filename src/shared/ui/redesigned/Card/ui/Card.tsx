import { PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'normal';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: CardVariant;
  max?: boolean;
  padding?: CardPadding;
  border?: CardBorder;
}

export const Card = (props: PropsWithChildren<CardProps>) => {
  const { className, children, variant = 'normal', border = 'normal', padding = 0, max, ...otherProps } = props;

  const paddingClasses = {
    0: classes.padding0,
    8: classes.padding8,
    16: classes.padding16,
    24: classes.padding24,
  };

  return (
    <div
      className={classNames(classes.Card, { [classes.max]: max }, [
        className,
        classes[variant],
        classes[`border-${border}`],
        paddingClasses[padding],
      ])}
      {...otherProps}>
      {children}
    </div>
  );
};
