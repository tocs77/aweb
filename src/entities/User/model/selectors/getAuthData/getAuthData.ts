import { StoreWithUser, USER_SLICE_NAME } from '../../types/user';

export const getAuthData = (state: StoreWithUser) => state[USER_SLICE_NAME].authData;
