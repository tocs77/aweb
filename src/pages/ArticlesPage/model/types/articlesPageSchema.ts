import { EntityState } from '@reduxjs/toolkit';

import { Article, ArticleView, ArticleSortField } from '@/entities/Article';
import { ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types';
export const ARTICLES_PAGE_SLICE_NAME = 'articlesPage';

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading: boolean;
  error?: string;
  view: ArticleView;
  page: number;
  limit: number;
  hasMore: boolean;
  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;

  _inited: boolean;
}

export interface StoreWithArticlesPage {
  [ARTICLES_PAGE_SLICE_NAME]: ArticlesPageSchema;
}
