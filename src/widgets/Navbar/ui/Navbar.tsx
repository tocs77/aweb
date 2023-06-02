import { classNames } from 'shared/lib/classNames';
import classes from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(classes.navbar, {}, [className])}>
      <div className={classes.links}>
        <AppLink to={'/'} theme={AppLinkTheme.SECONDARY} className={classes.mainLink}>
          Main
        </AppLink>
        <AppLink to={'/about'}>About site</AppLink>
      </div>
    </div>
  );
};