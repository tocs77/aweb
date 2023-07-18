import { getProfileReadOnly } from './getProfileReadOnly';
import { Profile } from 'entities/Profile';
import { ProfileCardSchema, StoreWithProfile, PROFILE_CARD_SLICE_NAME } from '../../types/editableProfileCardSchema';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

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

describe('getProfileReadOnly', () => {
  it('should return profile read only true', () => {
    const state: StoreWithProfile = { [PROFILE_CARD_SLICE_NAME]: baseProfile };
    expect(getProfileReadOnly(state)).toBe(true);
  });
  it('should return profile read only false', () => {
    const state: StoreWithProfile = { [PROFILE_CARD_SLICE_NAME]: { ...baseProfile, readonly: false } };
    expect(getProfileReadOnly(state)).toBe(false);
  });
});
