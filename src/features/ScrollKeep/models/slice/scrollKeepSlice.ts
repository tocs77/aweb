import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SCROLL_KEEP_SLICE_NAME, ScrollKeepSchema } from '../types/ScrollKeepSchema';

const initialState: ScrollKeepSchema = {
  scroll: {},
};

export const scrollKeepSlice = createSlice({
  name: SCROLL_KEEP_SLICE_NAME,
  initialState,
  reducers: {
    setScrollPosition: (state, action: PayloadAction<{ path: string; position: number }>) => {
      state.scroll[action.payload.path] = action.payload.position;
    },
  },
});

export const { actions: scrollKeepActions } = scrollKeepSlice;
export const { reducer: scrollKeepReducer } = scrollKeepSlice;
