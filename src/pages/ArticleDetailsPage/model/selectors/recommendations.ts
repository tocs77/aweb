import { createSelector } from '@reduxjs/toolkit';
import { ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME } from '../types/articleDetailsRecommendationsSchema';
import { getArticlesDetailsPageStore } from './index';

export const getArticleRecommendationsError = createSelector(
  getArticlesDetailsPageStore,
  (store) => store?.[ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME]?.error,
);

export const getArticleRecommendationsIsLoading = createSelector(
  getArticlesDetailsPageStore,
  (store) => store?.[ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME]?.isLoading,
);
