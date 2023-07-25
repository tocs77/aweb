import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { profileCardActions } from '../../models/slice/profileCardSlice';
import { getProfile } from '../../models/selectors/getProfile/getProfile';
import { getProfileReadOnly } from '../../models/selectors/getProfileReadonly/getProfileReadOnly';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = (props: EditableProfileCardHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useSelector(getAuthData);
  const readOnly = useSelector(getProfileReadOnly);
  const profile = useSelector(getProfile);

  const canEdit = user?.id === profile?.id;

  const onEdit = useCallback(() => {
    dispatch(profileCardActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileCardActions.cancelEditProfile());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(profileCardActions.updateProfileData());
  }, [dispatch]);

  return (
    <HStack justify='between' max className={classNames('', {}, [className])}>
      <Text title={t('Profile')} />
      {canEdit && (
        <>
          {readOnly ? (
            <Button theme={ButtonTheme.OUTLINE} onClick={onEdit} data-testid='EditableProfileCardHeader.EditBtn'>
              {t('Edit')}
            </Button>
          ) : (
            <>
              <HStack gap='8'>
                <Button
                  theme={ButtonTheme.OUTLINE_WARNING}
                  onClick={onCancelEdit}
                  data-testid='EditableProfileCardHeader.CancelBtn'>
                  {t('Cancel')}
                </Button>
                <Button theme={ButtonTheme.OUTLINE} onClick={onSave} data-testid='EditableProfileCardHeader.SaveBtn'>
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
