import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { ARTICLES_PAGE_SLICE_NAME } from '../../types/articlesPageSchema';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';

export const fetchArticlesList = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  `${ARTICLES_PAGE_SLICE_NAME}/fetchArticlesList`,
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Article[]>('/articles', { params: { _expand: 'user' } });
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
