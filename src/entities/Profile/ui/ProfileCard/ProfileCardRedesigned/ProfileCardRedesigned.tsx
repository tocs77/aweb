import { useTranslation } from 'react-i18next';

import { Input } from '@/shared/ui/redesigned/Input';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';

import classes from '../ProfileCard.module.scss';
import { Profile } from '../../../model/types/profile';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface ProfileCardProps {
  className?: string;
  profile: Profile;
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

export const ProfileCardRedesigned = (props: ProfileCardProps) => {
  const {
    className,
    profile,
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
  const { t } = useTranslation();
  return (
    <Card className={classNames(classes.ProfileCardRedesigned, {}, [className])} max variant='outlined' padding='24'>
      {profile.avatar && (
        <div className={classes.avatar}>
          <Avatar src={profile.avatar} size={120} />
        </div>
      )}
      <HStack gap='24' max>
        <VStack gap='16' max>
          <Input
            inputSize='l'
            value={profile.first || ''}
            label={t('Your name')}
            className={classes.input}
            onChange={onChangeFirstName}
            readOnly={readOnly}
            data-testid='ProfileCard.firstname'
          />
          <Input
            inputSize='l'
            value={profile.lastname || ''}
            label={t('Your last name')}
            className={classes.input}
            onChange={onChangeLastName}
            readOnly={readOnly}
            data-testid='ProfileCard.lastname'
          />
          <Input
            value={profile.age || 0}
            inputSize='l'
            label={t('Age')}
            className={classes.input}
            onChange={onChangeAge}
            readOnly={readOnly}
          />
          <Input
            inputSize='l'
            value={profile.city || ''}
            label={t('City')}
            className={classes.input}
            onChange={onChangeCity}
            readOnly={readOnly}
          />
        </VStack>
        <VStack gap='16' max>
          <Input
            inputSize='l'
            value={profile.username || ''}
            label={t('User name')}
            className={classes.input}
            onChange={onChangeUsername}
            readOnly={readOnly}
          />
          <Input
            inputSize='l'
            value={profile.avatar || ''}
            label={t('Avatar')}
            className={classes.input}
            onChange={onChangeAvatar}
            readOnly={readOnly}
          />
          <CurrencySelect onChange={onChangeCurrency} value={profile.currency} readOnly={readOnly} className={classes.input} />
          <CountrySelect onChange={onChangeCountry} value={profile.country} readOnly={readOnly} className={classes.input} />
        </VStack>
      </HStack>
    </Card>
  );
};

export const ProfileCardSkeletonRedesigned = () => {
  return (
    <Card padding='24' max>
      <VStack gap='32'>
        <HStack max align='center' justify='center'>
          <Skeleton width={120} height={120} border='50%' />
        </HStack>
        <HStack gap='32' max>
          <VStack gap='16' max>
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
          </VStack>
          <VStack gap='16' max>
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};
