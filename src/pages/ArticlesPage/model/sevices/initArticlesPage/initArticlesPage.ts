import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Article';

import { ARTICLES_PAGE_SLICE_NAME, StoreWithArticlesPage } from '../../types/articlesPageSchema';
import { getArticlesPageInited } from '../../selectors/ariclesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
  `${ARTICLES_PAGE_SLICE_NAME}/initArticlesPage`,
  async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const orderFromUrl = searchParams.get('order');
    const sortFromUrl = searchParams.get('sort');
    const searchFromUrl = searchParams.get('search');
    const typeFromUrl = searchParams.get('type');

    if (orderFromUrl) dispatch(articlesPageActions.setOrder(orderFromUrl as SortOrder));
    if (sortFromUrl) dispatch(articlesPageActions.setSort(sortFromUrl as ArticleSortField));
    if (searchFromUrl) dispatch(articlesPageActions.setSearch(searchFromUrl));
    if (typeFromUrl) dispatch(articlesPageActions.setType(typeFromUrl as ArticleType));

    const state = getState() as StoreWithArticlesPage;
    const pageInited = getArticlesPageInited(state);
    if (pageInited) return;
    dispatch(articlesPageActions.initState());
    dispatch(fetchArticlesList({ page: 1 }));
  },
);
