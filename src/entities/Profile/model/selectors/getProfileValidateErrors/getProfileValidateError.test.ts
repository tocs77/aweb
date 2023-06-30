import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ProfileSchema, StoreWithProfile, PROFILE_SLICE_NAME, Profile, ValidateProfileError } from '../../types/profile';
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
const validateErrors: ValidateProfileError[] = [ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_AGE];

const baseProfile: ProfileSchema = {
  data: profile,
  isLoading: false,
  readonly: true,
  error: 'error',
  validateErrors: validateErrors,
};

describe('getProfileIsLoading', () => {
  it('should return profile validate errors', () => {
    const state: StoreWithProfile = { [PROFILE_SLICE_NAME]: baseProfile };
    expect(getProfileValidateErrors(state)).toEqual(validateErrors);
  });
  it('should return undefined for no errors', () => {
    const state: StoreWithProfile = { [PROFILE_SLICE_NAME]: { ...baseProfile, validateErrors: undefined } };
    expect(getProfileValidateErrors(state)).toBe(undefined);
  });
});
