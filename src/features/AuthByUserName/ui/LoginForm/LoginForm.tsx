import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './LoginForm.module.scss';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={classNames(classes.LoginForm, {}, [className])}>
      <Input type='text' className={classes.input} placeholder={t('Enter user name')} value={name} onChange={setName} autofocus />
      <Input type='text' className={classes.input} placeholder={t('Enter password')} value={password} onChange={setPassword} />
      <Button className={classes.loginBtn}>{t('Login')}</Button>
    </div>
  );
};
