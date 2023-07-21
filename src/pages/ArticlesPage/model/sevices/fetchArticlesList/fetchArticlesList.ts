import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';

import { Article, ArticleType } from 'entities/Article';

import { ARTICLES_PAGE_SLICE_NAME, StoreWithArticlesPage } from '../../types/articlesPageSchema';
import {
  getArticlesLimit,
  getArticlesPageSearch,
  getArticlesPageSortField,
  getArticlesPageSortOrder,
  getArticlesPageType,
} from '../../selectors/ariclesPageSelectors';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';

interface FetchArticlesListProps {
  page?: number;
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
  `${ARTICLES_PAGE_SLICE_NAME}/fetchArticlesList`,
  async (props, { extra, rejectWithValue, getState }) => {
    const { page = 1 } = props;
    const state = getState() as StoreWithArticlesPage;
    const limit = getArticlesLimit(state);
    const order = getArticlesPageSortOrder(state);
    const sort = getArticlesPageSortField(state);
    const search = getArticlesPageSearch(state);
    const type = getArticlesPageType(state);

    try {
      addQueryParams({ sort, order, search, type });
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _order: order,
          _limit: limit,
          _sort: sort,
          _page: page,
          q: search,
          type: type === ArticleType.ALL ? undefined : type,
        },
      });
      if (!response.data) {
        return rejectWithValue('Error fetching articles');
      }

      return response.data;
    } catch (error) {
      let errorMsg = 'Unknown error in fetching';
      if (axios.isAxiosError(error)) {
        errorMsg = error?.response?.data || errorMsg;
        errorMsg = error.message || errorMsg;
      }
      return rejectWithValue(errorMsg);
    }
  },
);
