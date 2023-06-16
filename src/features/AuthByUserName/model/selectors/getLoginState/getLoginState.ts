import { StoreWithLogin, LOGIN_SLICE_NAME } from '../../types/loginSchema';
import { initialState } from '../../slice/loginSlice';

export const getLoginState = (state: StoreWithLogin) => state[LOGIN_SLICE_NAME] || initialState;
