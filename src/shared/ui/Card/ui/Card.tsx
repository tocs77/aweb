import { PropsWithChildren } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Card.module.scss';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card = (props: PropsWithChildren<CardProps>) => {
  const { className, children, ...otherProps } = props;

  return (
    <div className={classNames(classes.Card, {}, [className])} {...otherProps}>
      {children}
    </div>
  );
};
