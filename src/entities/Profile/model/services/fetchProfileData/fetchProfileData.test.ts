import { fetchProfileData } from './fetchProfileData';
import { Profile } from '../../types/profile';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunc/TestAsyncThuns';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

const profile: Profile = {
  id: '1',
  first: 'Bob',
  lastname: 'Smith',
  age: 33,
  currency: Currency.EUR,
  country: Country.Australia,
  city: '',
  username: 'admin',
  avatar: '',
};

describe('Fetch profile data async action', () => {
  it('should dispatch profile data', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: profile }));
    const result = await thunk.callThunk('1');
    expect(thunk.api.get).toBeCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.payload).toEqual(profile);
  });

  it('get empty profile data', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('1');
    expect(thunk.api.get).toBeCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.payload).toEqual('Wrong fetching profile');
  });
});
