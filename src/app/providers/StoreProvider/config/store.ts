import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { counterReducer, COUNTER_SLICE_NAME } from '@/entities/Counter';
import { userReducer, USER_SLICE_NAME } from '@/entities/User';
import { createReducerManager } from './reducerManager';
import { $api } from '@/shared/api/api';
import { SCROLL_KEEP_SLICE_NAME, scrollKeepReducer } from '@/features/ScrollKeep';
import { rtkApi } from '@/shared/api/rtkApi';

export const createReduxStore = (intialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    [COUNTER_SLICE_NAME]: counterReducer,
    [USER_SLICE_NAME]: userReducer,
    [SCROLL_KEEP_SLICE_NAME]: scrollKeepReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArgument: ThunkExtraArg = {
    api: $api,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: intialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument,
        },
      }).concat(rtkApi.middleware),
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type RootState = StateSchema;
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
