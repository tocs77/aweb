import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ProfileCard } from '@/entities/Profile';
import { getAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from '@/shared/ui/Text';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { getProfileForm } from '../../models/selectors/getProfileForm/getProfileForm';
import { getProfileError } from '../../models/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../models/selectors/getProfileIsLoading/getProfileIsLoading';
import { profileCardActions } from '../../models/slice/profileCardSlice';
import { getProfileReadOnly } from '../../models/selectors/getProfileReadonly/getProfileReadOnly';
import { getProfileValidateErrors } from '../../models/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { PROFILE_CARD_SLICE_NAME } from '../../models/types/editableProfileCardSchema';
import { profileCardReducer } from '../../models/slice/profileCardSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { VStack } from '@/shared/ui/Stack';
const reducers: ReducersList = { [PROFILE_CARD_SLICE_NAME]: profileCardReducer };

interface EditableProfileCardProps {
  id: string;
}

export const EditableProfileCard = (props: EditableProfileCardProps) => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const profile = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);
  const readOnly = useSelector(getProfileReadOnly);
  const profileValidateErrors = useSelector(getProfileValidateErrors);
  const { t } = useTranslation();

  const authId = useSelector(getAuthData)?.id;

  useInitialEffect(() => dispatch(profileCardActions.fetchProfileData(id || authId || '')));

  const onChangeFirstName = useCallback(
    (value: string) => {
      dispatch(profileCardActions.updateProfile({ first: value }));
    },
    [dispatch],
  );

  const onChangeLastName = useCallback(
    (value: string) => {
      dispatch(profileCardActions.updateProfile({ lastname: value }));
    },
    [dispatch],
  );

  const onChangeAge = useCallback(
    (value: string) => {
      if (isNaN(Number(value))) return;
      dispatch(profileCardActions.updateProfile({ age: Number(value || 0) }));
    },
    [dispatch],
  );

  const onChangeCity = useCallback(
    (value: string) => {
      dispatch(profileCardActions.updateProfile({ city: value }));
    },
    [dispatch],
  );

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(profileCardActions.updateProfile({ username: value }));
    },
    [dispatch],
  );

  const onChangeAvatar = useCallback(
    (value: string) => {
      dispatch(profileCardActions.updateProfile({ avatar: value }));
    },
    [dispatch],
  );
  const onChangeCurrency = useCallback(
    (value: Currency) => {
      dispatch(profileCardActions.updateProfile({ currency: value }));
    },
    [dispatch],
  );

  const onChangeCountry = useCallback(
    (value: Country) => {
      dispatch(profileCardActions.updateProfile({ country: value }));
    },
    [dispatch],
  );
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      {profileValidateErrors?.length &&
        profileValidateErrors.map((error) => (
          <Text text={t(error)} key={error} theme={TextTheme.ERROR} data-testid='EditableProfileCard.Error' />
        ))}
      <VStack gap='16' max>
        <EditableProfileCardHeader />
        <ProfileCard
          profile={profile}
          isLoading={isLoading}
          error={error}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeUsername={onChangeUsername}
          onChangeAvatar={onChangeAvatar}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
          readOnly={readOnly}
        />
      </VStack>
    </DynamicModuleLoader>
  );
};
