import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { LoginModal } from '@/features/AuthByUserName';
import { getAuthData } from '@/entities/User';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { getRouteArticleCreate } from '@/shared/consts/router';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropDown } from '@/features/AvatarDropDown';

import classes from './Navbar.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';

interface NavbarProps {
  className?: string;
}

const NavbarEl = ({ className }: NavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation();
  const authData = useSelector(getAuthData);

  if (authData) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <nav className={classNames(classes.navbarRedesigned, {}, [className])}>
            <HStack gap='16' className={classes.actions}>
              <NotificationButton />
              <AvatarDropDown />
            </HStack>
          </nav>
        }
        off={
          <nav className={classNames(classes.navbar, {}, [className])}>
            <Text className={classes.appName} title={t('Zeitung')} theme={TextTheme.INVERTED} />
            <AppLink to={getRouteArticleCreate()} theme={AppLinkTheme.SECONDARY} className={classes.createBtn}>
              {t('Create article')}
            </AppLink>
            <HStack gap='16' className={classes.actions}>
              <NotificationButton />
              <AvatarDropDown />
            </HStack>
          </nav>
        }
      />
    );
  }

  return (
    <>
      <LoginModal isOpen={isAuthModal} onClose={() => setIsAuthModal(false)} />
      <nav className={classNames(classes.navbar, {}, [className])}>
        <ToggleFeatures
          feature='isAppRedesigned'
          on={
            <Button variant='clear' className={classes.links} onClick={() => setIsAuthModal(true)}>
              {t('Login')}
            </Button>
          }
          off={
            <ButtonDeprecated theme={ButtonTheme.CLEAR_INVERTED} className={classes.links} onClick={() => setIsAuthModal(true)}>
              {t('Login')}
            </ButtonDeprecated>
          }
        />
      </nav>
    </>
  );
};

export const Navbar = memo(NavbarEl);
