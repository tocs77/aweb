import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './LoginModal.module.scss';
import { Modal } from 'shared/ui/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import { getAuthData } from 'entities/User';

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
      <LoginForm />
    </Modal>
  );
};
