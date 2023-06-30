import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ADD_COMMENT_FORM_SLICE_NAME, AddCommentFormSchema } from '../types/addCommentForm';

export const initialState: AddCommentFormSchema = {
  text: '',
};

export const addCommentFormSlice = createSlice({
  name: ADD_COMMENT_FORM_SLICE_NAME,
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
