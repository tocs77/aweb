import { getProfileForm } from './getProfileForm';
import { Profile } from '@/entities/Profile';
import { ProfileCardSchema, StoreWithProfile, PROFILE_CARD_SLICE_NAME } from '../../types/editableProfileCardSchema';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
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

const baseProfile: ProfileCardSchema = {
  form: profile,
  isLoading: false,
  readonly: true,
};

describe('getProfileForm', () => {
  it('should return profile value', () => {
    const state: StoreWithProfile = { [PROFILE_CARD_SLICE_NAME]: baseProfile };
    expect(getProfileForm(state)).toEqual(profile);
  });
  it('should return undefined forempty  profile value', () => {
    const state: StoreWithProfile = { [PROFILE_CARD_SLICE_NAME]: { form: undefined, isLoading: true, readonly: true } };
    expect(getProfileForm(state)).toBe(undefined);
  });
});
