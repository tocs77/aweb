import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { LoginModal } from '@/features/AuthByUserName';
import { getAuthData } from '@/entities/User';
import { Text, TextTheme } from '@/shared/ui/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { RoutePath } from '@/shared/consts/router';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropDown } from '@/features/AvatarDropDown';

import classes from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

const NavbarEl = ({ className }: NavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation();
  const authData = useSelector(getAuthData);

  if (authData) {
    return (
      <nav className={classNames(classes.navbar, {}, [className])}>
        <Text className={classes.appName} title={t('Zeitung')} theme={TextTheme.INVERTED} />
        <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY} className={classes.createBtn}>
          {t('Create article')}
        </AppLink>
        <HStack gap='16' className={classes.actions}>
          <NotificationButton />
          <AvatarDropDown />
        </HStack>
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
