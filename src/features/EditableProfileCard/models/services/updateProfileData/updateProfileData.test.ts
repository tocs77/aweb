import { updateProfileData } from './updateProfileData';
import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../../consts/consts';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunc/TestAsyncThuns';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

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

describe('updateProfileData.test', () => {
  it('should dispatch profile data', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, { profile: { form: profile } });
    thunk.api.put.mockReturnValue(Promise.resolve({ data: profile }));
    const result = await thunk.callThunk();
    expect(thunk.api.put).toBeCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.payload).toEqual(profile);
  });

  it('validate error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, { profile: { form: undefined } });
    thunk.api.put.mockReturnValue(Promise.resolve());
    const result = await thunk.callThunk();
    expect(result.payload).toEqual([ValidateProfileError.NO_DATA]);
  });

  it('server error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, { profile: { form: profile } });
    thunk.api.put.mockReturnValue(Promise.reject({ status: 403 }));
    const result = await thunk.callThunk();
    expect(result.payload).toEqual('Unknown error in fetching');
  });
});
