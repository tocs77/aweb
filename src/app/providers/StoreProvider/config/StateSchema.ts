import { CounterSchema, COUNTER_SLICE_NAME } from 'entities/Counter';
import { UserSchema, USER_SLICE_NAME } from 'entities/User';
import { LoginSchema, LOGIN_SLICE_NAME } from 'features/AuthByUserName';
export interface StateSchema {
  [COUNTER_SLICE_NAME]: CounterSchema;
  [USER_SLICE_NAME]: UserSchema;
  [LOGIN_SLICE_NAME]?: LoginSchema;
}
