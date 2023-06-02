import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames';
import classes from './AppLink.module.scss';
import { PropsWithChildren } from 'react';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink = (props: PropsWithChildren<AppLinkProps>) => {
  const { to, className, theme = AppLinkTheme.PRIMARY, children, ...otherProps } = props;
  return (
    <Link to={to} {...otherProps} className={classNames(classes.appLink, {}, [className, classes[theme]])}>
      {children}
    </Link>
  );
};
