import { ARTICLES_PAGE_SLICE_NAME, StoreWithArticlesPage } from '../types/articlesPageSchema';

export const getArticlesIsLoading = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?.isLoading;
export const getArticlesError = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?.error;
export const getArticlesView = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?.view;
