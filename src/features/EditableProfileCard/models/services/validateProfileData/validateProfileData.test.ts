import { Profile } from '@/entities/Profile';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../consts/consts';

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

describe('validateProfileData.test', () => {
  it('should return empty array if data is valid', async () => {
    const result = validateProfileData(profile);
    expect(result).toEqual([]);
  });

  it('should return error no data', async () => {
    const result = validateProfileData();
    expect(result).toEqual([ValidateProfileError.NO_DATA]);
  });

  it('should return error in user data', async () => {
    const result = validateProfileData({ ...profile, first: '' });
    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
  it('should return error in user data', async () => {
    const result = validateProfileData({ ...profile, lastname: '' });
    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
  it('should return error in age', async () => {
    const result = validateProfileData({ ...profile, age: 3.3 });
    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });
  it('should return error in country', async () => {
    const result = validateProfileData({ ...profile, country: undefined as unknown as Country });
    expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
  });
  it('should return all errors ', async () => {
    const result = validateProfileData({} as Profile);
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });
});
