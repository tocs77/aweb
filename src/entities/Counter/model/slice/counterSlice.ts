import { createSlice } from '@reduxjs/toolkit';
import { CounterSchema, COUNTER_SLICE_NAME } from '../types/counterSchema';

const initialState: CounterSchema = {
  value: 0,
};

export const counterSlice = createSlice({
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
