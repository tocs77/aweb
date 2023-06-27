export type { User, UserSchema } from './model/types/user';
export { USER_SLICE_NAME } from './model/types/user';
export { userReducer, userActions } from './model/slice/userSlice';
export { getAuthData } from './model/selectors/getAuthData/getAuthData';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';
