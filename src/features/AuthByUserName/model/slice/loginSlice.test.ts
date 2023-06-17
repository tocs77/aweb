import { LoginSchema } from '../types/loginSchema';
import { loginReducer, loginActions } from './loginSlice';

describe('Login slice tests', () => {
  it('should set user name', () => {
    const state: DeepPartial<LoginSchema> = {
      username: '123',
    };
    expect(loginReducer(state as LoginSchema, loginActions.setUsetname('user'))).toEqual({ username: 'user' });
  });
  it('should set user password', () => {
    const state: DeepPartial<LoginSchema> = {
      password: '123',
    };
    expect(loginReducer(state as LoginSchema, loginActions.setPassword('pwd'))).toEqual({ password: 'pwd' });
  });
});
