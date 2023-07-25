import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '../../types/Article';
import { ARTICLE_DETAILS_SLICE_NAME } from '../../types/articleDetailsSchema';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import axios from 'axios';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
  `${ARTICLE_DETAILS_SLICE_NAME}/fetchArticleById`,
  async (id: string, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Article>(`/articles/${id}`, { params: { _expand: 'user' } });
      if (!response.data) {
        return rejectWithValue('Wrong fetching article');
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
