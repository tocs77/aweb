import { Profile } from 'entities/Profile';

export const PROFILE_CARD_SLICE_NAME = 'profile' as const;

export interface ProfileCardSchema {
  data?: Profile;
  form?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  validateErrors?: ValidateProfileError[];
}

export interface StoreWithProfile {
  [PROFILE_CARD_SLICE_NAME]: ProfileCardSchema;
}
export enum ValidateProfileError {
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  INCORRECT_AGE = 'INCORRECT_AGE',
  INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
  NO_DATA = 'NO_DATA',
}
