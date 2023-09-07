import { PropsWithChildren } from 'react';
import { NavLink, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'secondary';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  activeClassName?: string;
}

export const AppLink = (props: PropsWithChildren<AppLinkProps>) => {
  const { to, className, variant = 'primary', activeClassName = '', children, ...otherProps } = props;
  if (!props) return null;
  return (
    <NavLink
      to={to}
      {...otherProps}
      className={({ isActive }) => classNames(classes.appLink, { [activeClassName]: isActive }, [className, classes[variant]])}>
      {children}
    </NavLink>
  );
};
