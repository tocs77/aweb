import { StateSchema } from '@/app/providers/StoreProvider';
import { getError } from './getError';
import { LOGIN_SLICE_NAME, StoreWithLogin } from '../../types/loginSchema';

describe('get login error', () => {
  it('should return error message', () => {
    const state: DeepPartial<StateSchema> = { [LOGIN_SLICE_NAME]: { error: 'error' } };
    expect(getError(state as StoreWithLogin)).toEqual('error');
  });
  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getError(state as StoreWithLogin)).toEqual(undefined);
  });
});
