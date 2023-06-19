import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { LoginModal } from 'features/AuthByUserName';
import { getAuthData } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { userActions } from 'entities/User';

interface NavbarProps {
  className?: string;
}

const NavbarEl = ({ className }: NavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation();
  const authData = useSelector(getAuthData);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(userActions.logout());
  };

  if (authData) {
    return (
      <>
        <div className={classNames(classes.navbar, {}, [className])}>
          <Button theme={ButtonTheme.CLEAR_INVERTED} className={classes.links} onClick={onLogout}>
            {t('Logout')}
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <LoginModal isOpen={isAuthModal} onClose={() => setIsAuthModal(false)} />
      <div className={classNames(classes.navbar, {}, [className])}>
        <Button theme={ButtonTheme.CLEAR_INVERTED} className={classes.links} onClick={() => setIsAuthModal(true)}>
          {t('Login')}
        </Button>
      </div>
    </>
  );
};

export const Navbar = memo(NavbarEl);
