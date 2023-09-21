import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './LoginForm.module.scss';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
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
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

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
  const forceUpdate = useForceUpdate();

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

    if (result.meta.requestStatus === 'fulfilled') {
      forceUpdate();
      onSuccess();
    }
  }, [dispatch, forceUpdate, name, onSuccess, password]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <div className={classNames(classes.LoginFormRedesigned, {}, [className])}>
            <Text title={t('Login Form')} />
            {error && <Text variant='error' text={error} />}
            <VStack gap='16' max>
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
              <Button className={classes.loginBtn} variant='outline' onClick={onLoginClick} disabled={isLoading}>
                {t('Login')}
              </Button>
            </VStack>
          </div>
        }
        off={
          <div className={classNames(classes.LoginForm, {}, [className])}>
            <TextDeprecated title={t('Login Form')} />
            {error && <TextDeprecated theme={TextTheme.ERROR} text={error} />}
            <InputDeprecated
              type='text'
              className={classes.input}
              placeholder={t('Enter user name')}
              value={name}
              onChange={onChangeUsername}
              autofocus
            />
            <InputDeprecated
              type='text'
              className={classes.input}
              placeholder={t('Enter password')}
              value={password}
              onChange={onChangePassword}
            />
            <ButtonDeprecated
              className={classes.loginBtn}
              theme={ButtonTheme.OUTLINE}
              onClick={onLoginClick}
              disabled={isLoading}>
              {t('Login')}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  );
});

export default LoginForm;
