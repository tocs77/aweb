import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { ARTICLES_PAGE_SLICE_NAME, StoreWithArticlesPage } from '../../types/articlesPageSchema';
import { getArticlesPageInited } from '../../selectors/ariclesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  `${ARTICLES_PAGE_SLICE_NAME}/initArticlesPage`,
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const state = getState() as StoreWithArticlesPage;
    const pageInited = getArticlesPageInited(state);
    if (pageInited) return;
    dispatch(articlesPageActions.initState());
    dispatch(fetchArticlesList({ page: 1 }));
  },
);
