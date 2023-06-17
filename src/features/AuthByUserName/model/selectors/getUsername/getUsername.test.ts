import { StateSchema } from 'app/providers/StoreProvider';
import { getUsername } from './getUsername';
import { LOGIN_SLICE_NAME, StoreWithLogin } from '../../types/loginSchema';

describe('get login user name', () => {
  it('should return user name', () => {
    const state: DeepPartial<StateSchema> = { [LOGIN_SLICE_NAME]: { username: 'XXXXX' } };
    expect(getUsername(state as StoreWithLogin)).toEqual('XXXXX');
  });
  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getUsername(state as StoreWithLogin)).toEqual('');
  });
});
