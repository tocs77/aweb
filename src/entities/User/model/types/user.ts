export const USER_SLICE_NAME = 'user' as const;
export interface User {
  id: string;
  username: string;
}

export interface UserSchema {
  authData?: User;
}

export interface StoreWithUser {
  [USER_SLICE_NAME]: UserSchema;
}
