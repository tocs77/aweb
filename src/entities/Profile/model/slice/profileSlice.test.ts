import { Currency } from 'entities/Currency';
import { Profile, ProfileSchema, ValidateProfileError } from '../types/profile';
import { profileReducer, profileSliceActions } from './profileSlice';
import { Country } from 'entities/Country';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const profile: Profile = {
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
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
    };
    expect(profileReducer(state as ProfileSchema, profileSliceActions.setReadOnly(true))).toEqual({ readonly: true });
  });

  it('should cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = {
      form: { ...profile, first: 'ggg' },
      data: profile,
    };
    const updatedState = profileReducer(state as ProfileSchema, profileSliceActions.cancelEditProfile());
    expect(updatedState.form).toEqual(profile);
  });

  it('should updateProfile edit', () => {
    const state: DeepPartial<ProfileSchema> = {
      form: { ...profile, first: 'ggg' },
    };
    const updatedState = profileReducer(state as ProfileSchema, profileSliceActions.updateProfile(profile));
    expect(updatedState.form).toEqual(profile);
  });

  it('should make error in updateProfile edit', () => {
    const state: DeepPartial<ProfileSchema> = {
      form: { ...profile },
    };
    const updatedState = profileReducer(state as ProfileSchema, profileSliceActions.updateProfile({ first: 'gggg' }));
    expect(updatedState.form).toEqual({ ...profile, first: 'gggg' });
  });

  test('pending updated profile service', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.INCORRECT_AGE],
    };
    const updatedState = profileReducer(state as ProfileSchema, updateProfileData.pending);
    expect(updatedState).toEqual({ isLoading: true, validateErrors: undefined });
  });
  test('fulfilled updated profile service', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      validateErrors: [ValidateProfileError.INCORRECT_AGE],
    };
    const updatedState = profileReducer(state as ProfileSchema, updateProfileData.fulfilled(profile, ''));
    expect(updatedState).toEqual({ data: profile, form: profile, isLoading: false, validateErrors: undefined });
  });
});
