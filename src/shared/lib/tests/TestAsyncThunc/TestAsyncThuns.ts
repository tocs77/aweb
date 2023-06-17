import { StateSchema } from 'app/providers/StoreProvider';
import { Dispatch, AsyncThunkAction, AnyAction } from '@reduxjs/toolkit';

type ActionCreatorType<Retun, Arg, RejectedValue> = (arg: Arg) => AsyncThunkAction<Retun, Arg, { rejectValue: RejectedValue }>;

export class TestAsyncThunk<Retun, Arg, RejectedValue> {
  dispatch: Dispatch;
  getState: () => StateSchema;
  actionCreator: ActionCreatorType<Retun, Arg, RejectedValue>;

  constructor(actionCreator: ActionCreatorType<Retun, Arg, RejectedValue>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, {});
    return result;
  }
}
