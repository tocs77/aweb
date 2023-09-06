import { PropsWithChildren } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}
/**
 * @deprecated component deprecated
 */
export const AppLink = (props: PropsWithChildren<AppLinkProps>) => {
  const { to, className, theme = AppLinkTheme.PRIMARY, children, ...otherProps } = props;
  if (!props) return null;
  return (
    <Link to={to} {...otherProps} className={classNames(classes.appLink, {}, [className, classes[theme]])}>
      {children}
    </Link>
  );
};
