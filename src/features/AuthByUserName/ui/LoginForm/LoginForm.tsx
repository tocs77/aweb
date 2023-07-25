import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './LoginForm.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text, TextTheme } from '@/shared/ui/Text';
import { useSelector } from 'react-redux';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { getPassword } from '../../model/selectors/getPassword/getPassword';
import { getUsername } from '../../model/selectors/getUsername/getUsername';
import { getIsLoading } from '../../model/selectors/getIsLoading/getIsLoading';
import { getError } from '../../model/selectors/getError/getError';
import { loginByUsername } from '../../model/services/loginByUserName/loginByUserName';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { LOGIN_SLICE_NAME } from '@/features/AuthByUserName/model/types/loginSchema';

interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = { [LOGIN_SLICE_NAME]: loginReducer };

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
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

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username: name, password }));

    if (result.meta.requestStatus === 'fulfilled') onSuccess();
  }, [dispatch, name, onSuccess, password]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
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
    </DynamicModuleLoader>
  );
});

export default LoginForm;
