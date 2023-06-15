import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './LoginForm.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Text, TextTheme } from 'shared/ui/Text';
import { useSelector } from 'react-redux';
import { loginActions } from '../../model/slice/loginSlice';
import { getPassword } from '../../model/selectors/getPassword/getPassword';
import { getUsername } from '../../model/selectors/getUsername/getUsername';
import { getIsLoading } from '../../model/selectors/getIsLoading/getIsLoading';
import { getError } from '../../model/selectors/getError/getError';
import { loginByUsername } from '../../model/services/loginByUserName/loginByUserName';
import { useAppDispatch } from 'app/providers/StoreProvider/config/store';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const name = useSelector(getUsername);
  const password = useSelector(getPassword);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const onChangeUsername = useCallback(
    (val: string) => {
      dispatch(loginActions.setUsetname(val));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (val: string) => {
      dispatch(loginActions.setPassword(val));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username: name, password }));
  }, [dispatch, name, password]);

  return (
    <div className={classNames(classes.LoginForm, {}, [className])}>
      <Text title={t('Login Form')} />
      {error && <Text theme={TextTheme.ERROR} text={error} />}
      <Input
        type='text'
        className={classes.input}
        placeholder={t('Enter user name')}
        value={name}
        onChange={onChangeUsername}
        autofocus
      />
      <Input
        type='text'
        className={classes.input}
        placeholder={t('Enter password')}
        value={password}
        onChange={onChangePassword}
      />
      <Button className={classes.loginBtn} theme={ButtonTheme.OUTLINE} onClick={onLoginClick} disabled={isLoading}>
        {t('Login')}
      </Button>
    </div>
  );
});
