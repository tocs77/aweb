import { getProfileError } from './getProfileError';
import { Profile } from '@/entities/Profile';
import { ProfileCardSchema, StoreWithProfile, PROFILE_CARD_SLICE_NAME } from '../../types/editableProfileCardSchema';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

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

const baseProfile: ProfileCardSchema = {
  data: profile,
  isLoading: false,
  readonly: true,
  error: 'error',
};

describe('getPrgetProfileErrorofile', () => {
  it('should return profile error', () => {
    const state: StoreWithProfile = { [PROFILE_CARD_SLICE_NAME]: baseProfile };
    expect(getProfileError(state)).toEqual('error');
  });
  it('should return undefined for empty error', () => {
    const state: StoreWithProfile = { [PROFILE_CARD_SLICE_NAME]: { ...baseProfile, error: undefined } };
    expect(getProfileError(state)).toBe(undefined);
  });
});
