import { AnyAction, configureStore, Dispatch, ReducersMapObject, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { StateSchema } from './StateSchema';
import { counterReducer, COUNTER_SLICE_NAME } from 'entities/Counter';
import { userReducer, USER_SLICE_NAME } from 'entities/User';
import { LOGIN_SLICE_NAME, loginReducer } from 'features/AuthByUserName';

export const createReduxStore = (intialState?: StateSchema) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    [COUNTER_SLICE_NAME]: counterReducer,
    [USER_SLICE_NAME]: userReducer,
    [LOGIN_SLICE_NAME]: loginReducer,
  };

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: intialState,
  });
};

type RootState = StateSchema;
type AppDispatch = ThunkDispatch<StateSchema, undefined, AnyAction> & Dispatch<AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
