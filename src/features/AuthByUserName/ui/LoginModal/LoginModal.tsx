import { useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './LoginModal.module.scss';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { getAuthData } from '@/entities/User';
import { Loader } from '@/shared/ui/deprecated/Loader';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
  const authData = useSelector(getAuthData);
  useEffect(() => {
    if (authData) onClose();
  }, [authData, onClose]);
  return (
    <Modal className={classNames(classes.LoginModal, {}, [className])} isOpen={isOpen} onClose={onClose} lazy>
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccess={onClose} />
      </Suspense>
    </Modal>
  );
};
