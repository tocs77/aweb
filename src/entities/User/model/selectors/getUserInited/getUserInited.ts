import { StoreWithUser, USER_SLICE_NAME } from '../../types/user';

export const getUserInited = (state: StoreWithUser) => state[USER_SLICE_NAME]._inited;
