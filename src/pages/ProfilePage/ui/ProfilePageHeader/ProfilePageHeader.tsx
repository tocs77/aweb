import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Text } from 'shared/ui/Text';
import { getProfile, getProfileReadOnly, profileActions } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getAuthData } from 'entities/User';
import { HStack } from 'shared/ui/Stack';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useSelector(getAuthData);
  const readOnly = useSelector(getProfileReadOnly);
  const profile = useSelector(getProfile);

  const canEdit = user?.id === profile?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEditProfile());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(profileActions.updateProfileData());
  }, [dispatch]);

  return (
    <HStack justify='between' max className={classNames('', {}, [className])}>
      <Text title={t('Profile')} />
      {canEdit && (
        <>
          {readOnly ? (
            <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
              {t('Edit')}
            </Button>
          ) : (
            <>
              <HStack gap='8'>
                <Button theme={ButtonTheme.OUTLINE_WARNING} onClick={onCancelEdit}>
                  {t('Cancel')}
                </Button>
                <Button theme={ButtonTheme.OUTLINE} onClick={onSave}>
                  {t('Save')}
                </Button>
              </HStack>
            </>
          )}
        </>
      )}
    </HStack>
  );
};
