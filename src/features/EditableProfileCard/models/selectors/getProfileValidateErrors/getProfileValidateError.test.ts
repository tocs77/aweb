import { getProfileValidateErrors } from './getProfileValidateErrors';
import { Profile } from '@/entities/Profile';
import { ProfileCardSchema, StoreWithProfile, PROFILE_CARD_SLICE_NAME } from '../../types/editableProfileCardSchema';
import { ValidateProfileError } from '../../consts/consts';
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
const validateErrors: ValidateProfileError[] = [ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_AGE];

const baseProfile: ProfileCardSchema = {
  data: profile,
  isLoading: false,
  readonly: true,
  error: 'error',
  validateErrors: validateErrors,
};

describe('getProfileIsLoading', () => {
  it('should return profile validate errors', () => {
    const state: StoreWithProfile = { [PROFILE_CARD_SLICE_NAME]: baseProfile };
    expect(getProfileValidateErrors(state)).toEqual(validateErrors);
  });
  it('should return undefined for no errors', () => {
    const state: StoreWithProfile = { [PROFILE_CARD_SLICE_NAME]: { ...baseProfile, validateErrors: undefined } };
    expect(getProfileValidateErrors(state)).toBe(undefined);
  });
});
