import { getProfileReadOnly } from './getProfileReadOnly';
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
  data: profile,
  isLoading: false,
  readonly: true,
  error: 'error',
};

describe('getProfileReadOnly', () => {
  it('should return profile read only true', () => {
    const state: StoreWithProfile = { [PROFILE_SLICE_NAME]: baseProfile };
    expect(getProfileReadOnly(state)).toBe(true);
  });
  it('should return profile read only false', () => {
    const state: StoreWithProfile = { [PROFILE_SLICE_NAME]: { ...baseProfile, readonly: false } };
    expect(getProfileReadOnly(state)).toBe(false);
  });
});
