import { EntityState } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';

export const ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME = 'articleDetailsRecommedations' as const;

export interface ArticleDetailsRecommendationsSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
}

export interface StoreWithArticleDetailsRecommendations {
  [ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME]: ArticleDetailsRecommendationsSchema;
}
