import { loginByUsername } from './loginByUserName';
import { UserRole, userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunc/TestAsyncThuns';

describe('LognByUserNAme async action', () => {
  it('should dispatch user data', async () => {
    const roles: UserRole[] = ['ADMIN'];
    const thunk = new TestAsyncThunk(loginByUsername);
    const userValue = { username: 'user', id: '1', password: '123', roles };
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
    const result = await thunk.callThunk(userValue);

    expect(thunk.api.post).toBeCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(result.payload).toEqual(userValue);
  });
  it('error login', async () => {
    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockReturnValue(Promise.reject({ status: 403, response: { data: { message: 'error' } } }));
    const result = await thunk.callThunk({ username: 'XXXXX', password: '123' });
    expect(thunk.api.post).toBeCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.payload).toEqual('Unknown error in request login');
  });
  //   beforeEach(() => {
  //     dispatch = jest.fn();
  //     getState = jest.fn();
  //   });
  //   it('should dispatch user data', async () => {
  //     const userValue = { username: 'user', id: '1' };
  //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
  //     const action = loginByUsername({ username: 'XXXXX', password: '123' });
  //     const result = await action(dispatch, getState, undefined);
  //     expect(mockedAxios.post).toBeCalled();
  //     expect(result.meta.requestStatus).toBe('fulfilled');
  //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
  //     expect(dispatch).toHaveBeenCalledTimes(3);
  //     expect(result.payload).toEqual(userValue);
  //   });
  //   it('error login', async () => {
  //     mockedAxios.post.mockReturnValue(Promise.reject({ status: 403, response: { data: { message: 'error' } } }));
  //     const action = loginByUsername({ username: 'XXXXX', password: '123' });
  //     const result = await action(dispatch, getState, undefined);
  //     expect(mockedAxios.post).toBeCalled();
  //     expect(result.meta.requestStatus).toBe('rejected');
  //     expect(dispatch).toHaveBeenCalledTimes(2);
  //     expect(result.payload).toEqual('error');
  //   });
});
