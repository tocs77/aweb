export type { User, UserSchema, UserRole } from './model/types/user';
export { USER_SLICE_NAME } from './model/types/user';
export { userReducer, userActions } from './model/slice/userSlice';
export { getAuthData } from './model/selectors/getAuthData/getAuthData';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';
export { isUserAdmin, isUserManager, getUserRoles } from './model/selectors/getUserRoles/getUserRoles';
