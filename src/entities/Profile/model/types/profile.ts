import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export const PROFILE_SLICE_NAME = 'profile' as const;

export interface Profile {
  id: string;
  first: string;
  lastname: string;
  age: number;
  currency: Currency;
  country: Country;
  city: string;
  username: string;
  avatar: string;
}

export interface ProfileSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateErrors?: ValidateProfileError[];
}

export interface StoreWithProfile {
  [PROFILE_SLICE_NAME]: ProfileSchema;
}
export enum ValidateProfileError {
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  INCORRECT_AGE = 'INCORRECT_AGE',
  INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
  NO_DATA = 'NO_DATA',
}
