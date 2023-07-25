import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { ARTICLES_PAGE_SLICE_NAME, StoreWithArticlesPage } from '../../types/articlesPageSchema';
import { getArticlesIsLoading, getArticlesPage, getArticlesPageHasMore } from '../../selectors/ariclesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  `${ARTICLES_PAGE_SLICE_NAME}/fetchNextArticlesPage`,
  async (_, { getState, dispatch }) => {
    const state = getState() as StoreWithArticlesPage;
    const hasMore = getArticlesPageHasMore(state);
    const page = getArticlesPage(state);
    const isLoading = getArticlesIsLoading(state);
    if (!hasMore || isLoading) return;
    dispatch(fetchArticlesList({ page: page + 1 }));
    dispatch(articlesPageActions.setPage(page + 1));
  },
);
