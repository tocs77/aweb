import { createSelector } from '@reduxjs/toolkit';
import { ARTICLE_DETAILS_COMMENT_SLICE_NAME } from '../types/articleDetailsCommentSchema';
import { getArticlesDetailsPageStore } from './index';

export const getArticleCommentsError = createSelector(
  getArticlesDetailsPageStore,
  (store) => store?.[ARTICLE_DETAILS_COMMENT_SLICE_NAME]?.error,
);

export const getArticleCommentsIsLoading = createSelector(
  getArticlesDetailsPageStore,
  (store) => store?.[ARTICLE_DETAILS_COMMENT_SLICE_NAME]?.isLoading,
);
