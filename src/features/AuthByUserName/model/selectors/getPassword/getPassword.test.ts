import { StateSchema } from '@/app/providers/StoreProvider';
import { getPassword } from './getPassword';
import { LOGIN_SLICE_NAME, StoreWithLogin } from '../../types/loginSchema';

describe('get login password', () => {
  it('should return password', () => {
    const state: DeepPartial<StateSchema> = { [LOGIN_SLICE_NAME]: { password: '11122' } };
    expect(getPassword(state as StoreWithLogin)).toEqual('11122');
  });
  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getPassword(state as StoreWithLogin)).toEqual('');
  });
});
