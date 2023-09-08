import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextTheme, TextAlign } from '@/shared/ui/deprecated/Text';
import { Input } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { CountrySelect } from '@/entities/Country';

import classes from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface ProfileCardProps {
  className?: string;
  profile: Profile | undefined;
  isLoading: boolean;
  error?: string;
  readOnly: boolean;
  onChangeFirstName: (value: string) => void;
  onChangeLastName: (value: string) => void;
  onChangeAge: (value: string) => void;
  onChangeCity: (value: string) => void;
  onChangeUsername: (value: string) => void;
  onChangeAvatar: (value: string) => void;
  onChangeCurrency: (value: Currency) => void;
  onChangeCountry: (value: Country) => void;
}

const ProfileCardEl = function Inp(props: ProfileCardProps) {
  const { t } = useTranslation();
  const {
    className,
    profile,
    isLoading,
    error,
    onChangeFirstName,
    onChangeLastName,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
    readOnly,
  } = props;

  if (isLoading) {
    return (
      <div className={classNames(classes.ProfileCard, {}, [className, classes.loading])} data-testid='profile-card'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <HStack className={classNames(classes.ProfileCard, {}, [className])} max gap='8'>
        <Text theme={TextTheme.ERROR} align={TextAlign.CENTER} title={t('Error loading profile')} text={error} />
      </HStack>
    );
  }

  if (!profile) return null;
  return (
    <VStack className={classNames(classes.ProfileCard, { [classes.editing]: !readOnly }, [className])} max gap='8'>
      {profile.avatar && (
        <div className={classes.avatar}>
          <Avatar src={profile.avatar} size={60} />
        </div>
      )}
      <Input
        value={profile.first || ''}
        placeholder={t('Your name')}
        className={classes.input}
        onChange={onChangeFirstName}
        readOnly={readOnly}
        data-testid='ProfileCard.firstname'
      />
      <Input
        value={profile.lastname || ''}
        placeholder={t('Your last name')}
        className={classes.input}
        onChange={onChangeLastName}
        readOnly={readOnly}
        data-testid='ProfileCard.lastname'
      />
      <Input
        value={profile.age || 0}
        placeholder={t('Age')}
        className={classes.input}
        onChange={onChangeAge}
        readOnly={readOnly}
      />
      <Input
        value={profile.city || ''}
        placeholder={t('City')}
        className={classes.input}
        onChange={onChangeCity}
        readOnly={readOnly}
      />
      <Input
        value={profile.username || ''}
        placeholder={t('User name')}
        className={classes.input}
        onChange={onChangeUsername}
        readOnly={readOnly}
      />
      <Input
        value={profile.avatar || ''}
        placeholder={t('Avatar')}
        className={classes.input}
        onChange={onChangeAvatar}
        readOnly={readOnly}
      />
      <CurrencySelect onChange={onChangeCurrency} value={profile.currency} readOnly={readOnly} className={classes.input} />
      <CountrySelect onChange={onChangeCountry} value={profile.country} readOnly={readOnly} className={classes.input} />
    </VStack>
  );
};

export const ProfileCard = memo(ProfileCardEl);
