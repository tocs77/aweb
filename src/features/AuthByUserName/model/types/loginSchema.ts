export const LOGIN_SLICE_NAME = 'login';

export interface LoginSchema {
  username: string;
  password: string;
  isLoading: boolean;
  error?: string;
}

export interface StoreWithLogin {
  [LOGIN_SLICE_NAME]: LoginSchema;
}
