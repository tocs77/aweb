import { Article, ArticleView } from '@/entities/Article';
import { ARTICLES_PAGE_SLICE_NAME, StoreWithArticlesPage } from '../types/articlesPageSchema';
import { ArticleType } from '@/entities/Article/model/consts/consts';
import { buildSelector } from '@/shared/lib/store';

export const getArticlesIsLoading = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?.isLoading;
export const getArticlesError = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?.error;
export const getArticlesView = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?.view || ArticleView.GRID;
export const getArticlesLimit = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?.limit || 4;
export const getArticlesPage = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?.page || 1;
export const getArticlesPageHasMore = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?.hasMore;
export const getArticlesPageInited = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?._inited;
export const getArticlesPageSortOrder = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?.order;
export const getArticlesPageSortField = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?.sort;
export const getArticlesPageSearch = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?.search ?? '';
export const getArticlesPageType = (state: StoreWithArticlesPage) => state[ARTICLES_PAGE_SLICE_NAME]?.type ?? ArticleType.ALL;

export const [getArticleItemById] = buildSelector<StoreWithArticlesPage, Article | undefined, [id: string]>(
  (state, id: string) => state[ARTICLES_PAGE_SLICE_NAME]?.entities[id],
);
