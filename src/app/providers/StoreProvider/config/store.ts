import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer, COUNTER_SLICE_NAME } from 'entities/Counter';

export const createReduxStore = (intialState?: StateSchema) => {
  return configureStore<StateSchema>({
    reducer: { [COUNTER_SLICE_NAME]: counterReducer },
    devTools: __IS_DEV__,
    preloadedState: intialState,
  });
};
