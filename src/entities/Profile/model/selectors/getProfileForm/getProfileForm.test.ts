import { getProfileForm } from './getProfileForm';
import { ProfileSchema, StoreWithProfile, PROFILE_SLICE_NAME, Profile } from '../../types/profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
('../../types/profile');

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

const baseProfile: ProfileSchema = {
  form: profile,
  isLoading: false,
  readonly: true,
};

describe('getProfileForm', () => {
  it('should return profile value', () => {
    const state: StoreWithProfile = { [PROFILE_SLICE_NAME]: baseProfile };
    expect(getProfileForm(state)).toEqual(profile);
  });
  it('should return undefined forempty  profile value', () => {
    const state: StoreWithProfile = { [PROFILE_SLICE_NAME]: { form: undefined, isLoading: true, readonly: true } };
    expect(getProfileForm(state)).toBe(undefined);
  });
});
