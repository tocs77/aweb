import { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { LoginModal } from 'features/AuthByUserName';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation();

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
