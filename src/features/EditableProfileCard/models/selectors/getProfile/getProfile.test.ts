import { getProfile } from './getProfile';
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
};

describe('getProfile', () => {
  it('should return profile value', () => {
    const state: StoreWithProfile = { [PROFILE_CARD_SLICE_NAME]: baseProfile };
    expect(getProfile(state)).toEqual(profile);
  });
  it('should return undefined forempty  profile value', () => {
    const state: StoreWithProfile = { [PROFILE_CARD_SLICE_NAME]: { data: undefined, isLoading: true, readonly: true } };
    expect(getProfile(state)).toBe(undefined);
  });
});
