import { getProfileIsLoading } from './getProfileIsLoading';
import { ProfileSchema, StoreWithProfile, PROFILE_SLICE_NAME, Profile } from '../../types/profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
('../../types/profile');

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

const baseProfile: ProfileSchema = {
  data: profile,
  isLoading: false,
  readonly: true,
  error: 'error',
};

describe('getProfileIsLoading', () => {
  it('should return profile loading true', () => {
    const state: StoreWithProfile = { [PROFILE_SLICE_NAME]: baseProfile };
    expect(getProfileIsLoading(state)).toBe(false);
  });
  it('should return profile loading false', () => {
    const state: StoreWithProfile = { [PROFILE_SLICE_NAME]: { ...baseProfile, isLoading: true } };
    expect(getProfileIsLoading(state)).toBe(true);
  });
});
