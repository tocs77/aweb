import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

import { ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME } from '../../types/articleDetailsRecommendationsSchema';

export const fetchArticleRecommendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  `${ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME}/fetchArticleRecommendations`,
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Article[]>('/articles', { params: { _limit: 4 } });
      if (!response.data) {
        return rejectWithValue('Wrong fetching articles');
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
