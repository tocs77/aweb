import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ProfileCard.module.scss';
import { getProfile } from '../../model/selectors/getProfile/getProfile';
// import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
// import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { Text } from 'shared/ui/Text';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';

interface ProfileCardProps {
  className?: string;
}

const ProfileCardEl = function Inp(props: ProfileCardProps) {
  const { t } = useTranslation();
  const { className } = props;
  const data = useSelector(getProfile);
  // const error = useSelector(getProfileError);
  // const isLoading = useSelector(getProfileIsLoading);

  return (
    <div className={classNames(classes.ProfileCard, {}, [className])}>
      <div className={classes.header}>
        <Text title={t('Profile')} />
        <Button theme={ButtonTheme.OUTLINE} className={classes.editBtn}>
          {t('Edit')}
        </Button>
      </div>
      <div className={classes.data}>
        <Input
          value={data?.first || ''}
          placeholder={t('Your name')}
          className={classes.input}
          onChange={() => {
            console.log('123');
          }}
        />
        <Input
          value={data?.lastname || ''}
          placeholder={t('Your last name')}
          className={classes.input}
          onChange={() => {
            console.log('123');
          }}
        />
      </div>
    </div>
  );
};

export const ProfileCard = memo(ProfileCardEl);
