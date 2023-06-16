import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CounterSchema, COUNTER_SLICE_NAME } from 'entities/Counter';
import { UserSchema, USER_SLICE_NAME } from 'entities/User';
import { LoginSchema, LOGIN_SLICE_NAME } from 'features/AuthByUserName';
export interface StateSchema {
  [COUNTER_SLICE_NAME]: CounterSchema;
  [USER_SLICE_NAME]: UserSchema;

  // Async reducers
  [LOGIN_SLICE_NAME]?: LoginSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}
