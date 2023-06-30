import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  ARTICLE_DETAILS_COMMENT_SLICE_NAME,
  ArticleDetailsCommentSchema,
  StoreWithArticleDetailsComment,
} from '../types/ArticleDetailsCommentSchema';
import { Comment } from 'entities/Comment';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../services/addCommentForArticle/addCommentForArticle';

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StoreWithArticleDetailsComment>(
  (state) => state[ARTICLE_DETAILS_COMMENT_SLICE_NAME] || commentsAdapter.getInitialState(),
);

const initialState: ArticleDetailsCommentSchema = {
  isLoading: false,
  ids: [],
  entities: {},
};
export const articleDetailsCommentSlice = createSlice({
  name: ARTICLE_DETAILS_COMMENT_SLICE_NAME,
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByArticleId.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchCommentsByArticleId.fulfilled, (state, action) => {
      state.isLoading = false;
      commentsAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(addCommentForArticle.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(addCommentForArticle.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addCommentForArticle.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: articleDetailsCommentActions } = articleDetailsCommentSlice;
export const { reducer: articleDetailsCommentReducer } = articleDetailsCommentSlice;
