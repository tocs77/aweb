import { Article } from './Article';

export const ARTICLE_DETAILS_SLICE_NAME = 'articleDetails' as const;
export interface ArticleDetailsSchema {
  isLoading: boolean;
  error?: string;
  data?: Article;
}

export interface StoreWithArticleDetails {
  [ARTICLE_DETAILS_SLICE_NAME]: ArticleDetailsSchema;
}
