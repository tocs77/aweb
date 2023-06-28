import { createSlice } from '@reduxjs/toolkit';
import { ARTICLE_DETAILS_SLICE_NAME, ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';

const initialState: ArticleDetailsSchema = {
  data: undefined,
  isLoading: false,
};

export const articleDetailsSlice = createSlice({
  name: ARTICLE_DETAILS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticleById.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchArticleById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchArticleById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: articleDetailsSliceActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;
