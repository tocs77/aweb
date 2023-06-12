import { CounterSchema, COUNTER_SLICE_NAME } from 'entities/Counter';

import { UserSchema, USER_SLICE_NAME } from 'entities/User';
export interface StateSchema {
  [COUNTER_SLICE_NAME]: CounterSchema;
  [USER_SLICE_NAME]: UserSchema;
}
