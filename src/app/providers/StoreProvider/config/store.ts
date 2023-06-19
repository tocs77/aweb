import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { StateSchema } from './StateSchema';
import { counterReducer, COUNTER_SLICE_NAME } from 'entities/Counter';
import { userReducer, USER_SLICE_NAME } from 'entities/User';
import { createReducerManager } from './reducerManager';

export const createReduxStore = (intialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    [COUNTER_SLICE_NAME]: counterReducer,
    [USER_SLICE_NAME]: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: intialState,
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type RootState = StateSchema;
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
