import { getProfileIsLoading } from './getProfileIsLoading';
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

describe('getProfileIsLoading', () => {
  it('should return profile loading true', () => {
    const state: StoreWithProfile = { [PROFILE_CARD_SLICE_NAME]: baseProfile };
    expect(getProfileIsLoading(state)).toBe(false);
  });
  it('should return profile loading false', () => {
    const state: StoreWithProfile = { [PROFILE_CARD_SLICE_NAME]: { ...baseProfile, isLoading: true } };
    expect(getProfileIsLoading(state)).toBe(true);
  });
});
