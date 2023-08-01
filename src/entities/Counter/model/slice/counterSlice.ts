import { CounterSchema, COUNTER_SLICE_NAME } from '../types/counterSchema';
import { buildSlice } from '@/shared/lib/store/buildSlice';

const initialState: CounterSchema = {
  value: 0,
};

export const counterSlice = buildSlice({
  name: COUNTER_SLICE_NAME,
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { actions: counterActions } = counterSlice;
export const { reducer: counterReducer } = counterSlice;
export const { useActions: useCounterActions } = counterSlice;
