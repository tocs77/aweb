import axios, { AxiosStatic } from 'axios';
import { StateSchema } from 'app/providers/StoreProvider';
import { Dispatch, AsyncThunkAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

type ActionCreatorType<Retun, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<Retun, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

export class TestAsyncThunk<Retun, Arg, RejectedValue> {
  dispatch: Dispatch;
  getState: () => StateSchema;
  actionCreator: ActionCreatorType<Retun, Arg, RejectedValue>;
  api: jest.MockedFunctionDeep<AxiosStatic>;
  navigate: jest.MockedFn<NavigateFunction>;

  constructor(actionCreator: ActionCreatorType<Retun, Arg, RejectedValue>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();
    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, { api: this.api, navigate: this.navigate });
    return result;
  }
}
