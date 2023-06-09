export const USER_SLICE_NAME = 'user' as const;
export interface User {
  id: string;
  username: string;
  avatar?: string;
}

export interface UserSchema {
  authData?: User;
  _inited: boolean;
}

export interface StoreWithUser {
  [USER_SLICE_NAME]: UserSchema;
}
