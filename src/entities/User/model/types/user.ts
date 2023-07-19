export const USER_SLICE_NAME = 'user' as const;

export type UserRole = 'USER' | 'ADMIN' | 'MANAGER';

export interface User {
  id: string;
  username: string;
  avatar?: string;
  roles: UserRole[];
}

export interface UserSchema {
  authData?: User;
  _inited: boolean;
}

export interface StoreWithUser {
  [USER_SLICE_NAME]: UserSchema;
}
