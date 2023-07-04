import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
export const ARTICLES_PAGE_SLICE_NAME = 'articlesPage';

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading: boolean;
  error?: string;
  view: ArticleView;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface StoreWithArticlesPage {
  [ARTICLES_PAGE_SLICE_NAME]: ArticlesPageSchema;
}
