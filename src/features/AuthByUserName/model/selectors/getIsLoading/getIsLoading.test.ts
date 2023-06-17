import { StateSchema } from 'app/providers/StoreProvider';
import { getIsLoading } from './getIsLoading';
import { LOGIN_SLICE_NAME, StoreWithLogin } from '../../types/loginSchema';

describe('get login is loading', () => {
  it('should return is loading state', () => {
    const state: DeepPartial<StateSchema> = { [LOGIN_SLICE_NAME]: { isLoading: true } };
    expect(getIsLoading(state as StoreWithLogin)).toEqual(true);
  });
  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getIsLoading(state as StoreWithLogin)).toEqual(false);
  });
});
