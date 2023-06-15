import { StoreWithLogin, LOGIN_SLICE_NAME } from '../../types/loginSchema';

export const getLoginState = (state: StoreWithLogin) => state[LOGIN_SLICE_NAME];
