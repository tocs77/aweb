import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { Article } from 'entities/Article';

import { ARTICLE_DETAILS_PAGE_SLICE_NAME, StoreWithArticlesDetailsPage } from '../types';

import {
  ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME,
  ArticleDetailsRecommendationsSchema,
} from '../types/articleDetailsRecommendationsSchema';
import { fetchArticleRecommendations } from '../services/fecthArticleRecommendations/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StoreWithArticlesDetailsPage>(
  (state) =>
    state?.[ARTICLE_DETAILS_PAGE_SLICE_NAME]?.[ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME] ||
    recommendationsAdapter.getInitialState(),
);

const initialState: ArticleDetailsRecommendationsSchema = {
  isLoading: false,
  ids: [],
  entities: {},
};
export const articleDetailsRecommendationSlice = createSlice({
  name: ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME,
  initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticleRecommendations.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
      state.isLoading = false;
      recommendationsAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchArticleRecommendations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: articleDetailsRecommendationsActions } = articleDetailsRecommendationSlice;
export const { reducer: articleDetailsRecommendationsReducer } = articleDetailsRecommendationSlice;
