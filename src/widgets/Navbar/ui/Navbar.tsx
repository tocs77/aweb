import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(classes.navbar, {}, [className])}>
      <div className={classes.links}>
        <AppLink to={'/'} theme={AppLinkTheme.SECONDARY} className={classes.mainLink}>
          {t('Main Page')}
        </AppLink>
        <AppLink to={'/about'}>{t('About Page')} </AppLink>
      </div>
    </div>
  );
};
