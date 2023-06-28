import { StoreWithArticleDetails, ARTICLE_DETAILS_SLICE_NAME } from '../types/articleDetailsSchema';

export const getArticleDetailsData = (state: StoreWithArticleDetails) => state[ARTICLE_DETAILS_SLICE_NAME]?.data;

export const getError = (state: StoreWithArticleDetails) => state[ARTICLE_DETAILS_SLICE_NAME]?.error;

export const getIsLoading = (state: StoreWithArticleDetails) => state[ARTICLE_DETAILS_SLICE_NAME]?.isLoading || false;
