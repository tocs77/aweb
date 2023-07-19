import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { LoginModal } from 'features/AuthByUserName';
import { getAuthData, isUserAdmin, isUserManager } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userActions } from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/ui/Dropdown';
import { Avatar } from 'shared/ui/Avatar';

import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

const NavbarEl = ({ className }: NavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation();
  const authData = useSelector(getAuthData);
  const dispatch = useAppDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const isAdminPanelAvailable = isAdmin || isManager;

  const onLogout = () => {
    dispatch(userActions.logout());
  };

  if (authData) {
    return (
      <nav className={classNames(classes.navbar, {}, [className])}>
        <Text className={classes.appName} title={t('Zeitung')} theme={TextTheme.INVERTED} />
        <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY} className={classes.createBtn}>
          {t('Create article')}
        </AppLink>
        <Dropdown
          className={classes.dropdown}
          title={<Avatar size={30} src={authData.avatar || ''} />}
          items={[
            { content: t('Admin Panel'), href: `${RoutePath.admin_panel}`, hidden: !isAdminPanelAvailable },
            { content: t('User profile'), href: `${RoutePath.profile}${authData.id}` },
            { content: t('Logout'), onClick: onLogout },
          ]}
        />
      </nav>
    );
  }

  return (
    <>
      <LoginModal isOpen={isAuthModal} onClose={() => setIsAuthModal(false)} />
      <nav className={classNames(classes.navbar, {}, [className])}>
        <Button theme={ButtonTheme.CLEAR_INVERTED} className={classes.links} onClick={() => setIsAuthModal(true)}>
          {t('Login')}
        </Button>
      </nav>
    </>
  );
};

export const Navbar = memo(NavbarEl);
