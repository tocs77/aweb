import { getProfileError } from './getProfileError';
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

describe('getPrgetProfileErrorofile', () => {
  it('should return profile error', () => {
    const state: StoreWithProfile = { [PROFILE_SLICE_NAME]: baseProfile };
    expect(getProfileError(state)).toEqual('error');
  });
  it('should return undefined for empty error', () => {
    const state: StoreWithProfile = { [PROFILE_SLICE_NAME]: { ...baseProfile, error: undefined } };
    expect(getProfileError(state)).toBe(undefined);
  });
});
