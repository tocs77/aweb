import { Currency } from 'entities/Currency';
import { Profile } from 'entities/Profile';
import { Country } from 'entities/Country';

import { ProfileCardSchema } from '../../models/types/editableProfileCardSchema';
import { ValidateProfileError } from '../../models/consts/consts';
import { profileCardReducer, profileCardActions } from './profileCardSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const profile: Profile = {
  id: '1',
  first: 'Bob',
  lastname: 'Smith',
  age: 33,
  currency: Currency.EUR,
  country: Country.Australia,
  city: '',
  username: 'admin',
  avatar: '',
};

describe('Profile slice tests', () => {
  it('should set readonly', () => {
    const state: DeepPartial<ProfileCardSchema> = {
      readonly: false,
    };
    expect(profileCardReducer(state as ProfileCardSchema, profileCardActions.setReadOnly(true))).toEqual({ readonly: true });
  });

  it('should cancel edit', () => {
    const state: DeepPartial<ProfileCardSchema> = {
      form: { ...profile, first: 'ggg' },
      data: profile,
    };
    const updatedState = profileCardReducer(state as ProfileCardSchema, profileCardActions.cancelEditProfile());
    expect(updatedState.form).toEqual(profile);
  });

  it('should updateProfile edit', () => {
    const state: DeepPartial<ProfileCardSchema> = {
      form: { ...profile, first: 'ggg' },
    };
    const updatedState = profileCardReducer(state as ProfileCardSchema, profileCardActions.updateProfile(profile));
    expect(updatedState.form).toEqual(profile);
  });

  it('should make error in updateProfile edit', () => {
    const state: DeepPartial<ProfileCardSchema> = {
      form: { ...profile },
    };
    const updatedState = profileCardReducer(state as ProfileCardSchema, profileCardActions.updateProfile({ first: 'gggg' }));
    expect(updatedState.form).toEqual({ ...profile, first: 'gggg' });
  });

  test('pending updated profile service', () => {
    const state: DeepPartial<ProfileCardSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.INCORRECT_AGE],
    };
    const updatedState = profileCardReducer(state as ProfileCardSchema, updateProfileData.pending);
    expect(updatedState).toEqual({ isLoading: true, validateErrors: undefined });
  });
  test('fulfilled updated profile service', () => {
    const state: DeepPartial<ProfileCardSchema> = {
      isLoading: true,
      validateErrors: [ValidateProfileError.INCORRECT_AGE],
    };
    const updatedState = profileCardReducer(state as ProfileCardSchema, updateProfileData.fulfilled(profile, ''));
    expect(updatedState).toEqual({ data: profile, form: profile, isLoading: false, validateErrors: undefined, readonly: true });
  });
});
