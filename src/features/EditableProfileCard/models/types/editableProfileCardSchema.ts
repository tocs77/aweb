import { Profile } from 'entities/Profile';
import { ValidateProfileError } from '../consts/consts';

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
