import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { profileCardActions } from '../../models/slice/profileCardSlice';
import { getProfile } from '../../models/selectors/getProfile/getProfile';
import { getProfileReadOnly } from '../../models/selectors/getProfileReadonly/getProfileReadOnly';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

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
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card border='faceted' max variant='normal' padding='16'>
          <HStack justify='between' max className={classNames('', {}, [className])}>
            <Text title={t('Profile')} />
            {canEdit && (
              <>
                {readOnly ? (
                  <Button variant='outline' color='normal' onClick={onEdit} data-testid='EditableProfileCardHeader.EditBtn'>
                    {t('Edit')}
                  </Button>
                ) : (
                  <>
                    <HStack gap='8'>
                      <Button
                        variant='outline'
                        color='error'
                        onClick={onCancelEdit}
                        data-testid='EditableProfileCardHeader.CancelBtn'>
                        {t('Cancel')}
                      </Button>
                      <Button variant='outline' color='success' onClick={onSave} data-testid='EditableProfileCardHeader.SaveBtn'>
                        {t('Save')}
                      </Button>
                    </HStack>
                  </>
                )}
              </>
            )}
          </HStack>
        </Card>
      }
      off={
        <HStack justify='between' max className={classNames('', {}, [className])}>
          <TextDeprecated title={t('Profile')} />
          {canEdit && (
            <>
              {readOnly ? (
                <ButtonDeprecated theme={ButtonTheme.OUTLINE} onClick={onEdit} data-testid='EditableProfileCardHeader.EditBtn'>
                  {t('Edit')}
                </ButtonDeprecated>
              ) : (
                <>
                  <HStack gap='8'>
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE_WARNING}
                      onClick={onCancelEdit}
                      data-testid='EditableProfileCardHeader.CancelBtn'>
                      {t('Cancel')}
                    </ButtonDeprecated>
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE}
                      onClick={onSave}
                      data-testid='EditableProfileCardHeader.SaveBtn'>
                      {t('Save')}
                    </ButtonDeprecated>
                  </HStack>
                </>
              )}
            </>
          )}
        </HStack>
      }
    />
  );
};
