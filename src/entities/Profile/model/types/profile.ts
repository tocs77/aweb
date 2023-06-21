import { Country, Currency } from 'shared/consts/common';

export const PROFILE_SLICE_NAME = 'profile' as const;

export interface Profile {
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
  isLoading: boolean;
  error?: string;
  readonly: boolean;
}

export interface StoreWithProfile {
  [PROFILE_SLICE_NAME]: ProfileSchema;
}
