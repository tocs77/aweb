import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer, COUNTER_SLICE_NAME } from 'entities/Counter';
import { userReducer, USER_SLICE_NAME } from 'entities/User';

export const createReduxStore = (intialState?: StateSchema) => {
  const rootReducers: ReducersMapObject<StateSchema> = { [COUNTER_SLICE_NAME]: counterReducer, [USER_SLICE_NAME]: userReducer };

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: intialState,
  });
};
