import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextTheme, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

import classes from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { ProfileCardDeprecated, ProfileCardSkeletonDeprecated } from './ProfileCardDeprecated/ProfileCardDeprecated';
import { ProfileCardRedesigned, ProfileCardSkeletonRedesigned } from './ProfileCardRedesigned/ProfileCardRedesigned';
import { ToggleFeatures } from '@/shared/lib/features';

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
      <ToggleFeatures feature='isAppRedesigned' on={<ProfileCardSkeletonRedesigned />} off={<ProfileCardSkeletonDeprecated />} />
    );
  }

  if (error) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <HStack className={classNames(classes.ProfileCard, {}, [className])} max gap='8'>
            <Text variant='error' align='center' title={t('Error loading profile')} text={error} />
          </HStack>
        }
        off={
          <HStack className={classNames(classes.ProfileCard, {}, [className])} max gap='8'>
            <TextDeprecated theme={TextTheme.ERROR} align={TextAlign.CENTER} title={t('Error loading profile')} text={error} />
          </HStack>
        }
      />
    );
  }

  if (!profile) return null;

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <ProfileCardRedesigned
          onChangeAge={onChangeAge}
          onChangeAvatar={onChangeAvatar}
          onChangeCity={onChangeCity}
          onChangeCountry={onChangeCountry}
          onChangeCurrency={onChangeCurrency}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeUsername={onChangeUsername}
          profile={profile}
          readOnly={readOnly}
          className={className}
        />
      }
      off={
        <ProfileCardDeprecated
          onChangeAge={onChangeAge}
          onChangeAvatar={onChangeAvatar}
          onChangeCity={onChangeCity}
          onChangeCountry={onChangeCountry}
          onChangeCurrency={onChangeCurrency}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeUsername={onChangeUsername}
          profile={profile}
          readOnly={readOnly}
          className={className}
        />
      }
    />
  );
};

export const ProfileCard = memo(ProfileCardEl);
