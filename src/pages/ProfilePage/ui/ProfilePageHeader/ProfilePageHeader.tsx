import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ProfilePageHeader.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Text } from 'shared/ui/Text';
import { getProfileReadOnly, profileActions } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const readOnly = useSelector(getProfileReadOnly);

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
    <div className={classNames(classes.ProfilePageHeader, {}, [className])}>
      <div className={classes.header}>
        <Text title={t('Profile')} />
        {readOnly ? (
          <Button theme={ButtonTheme.OUTLINE} className={classes.editBtn} onClick={onEdit}>
            {t('Edit')}
          </Button>
        ) : (
          <>
            <Button theme={ButtonTheme.OUTLINE_WARNING} className={classes.editBtn} onClick={onCancelEdit}>
              {t('Cancel')}
            </Button>
            <Button theme={ButtonTheme.OUTLINE} className={classes.saveBtn} onClick={onSave}>
              {t('Save')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
