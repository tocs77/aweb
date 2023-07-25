import { createAsyncThunk } from '@reduxjs/toolkit';
import { ARTICLE_DETAILS_COMMENT_SLICE_NAME } from '../../types/articleDetailsCommentsSchema';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import axios from 'axios';
import { getAuthData } from '@/entities/User';
import { Comment } from '@/entities/Comment';
import { getArticleDetailsData, StoreWithArticleDetails } from '@/entities/Article/';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
  `${ARTICLE_DETAILS_COMMENT_SLICE_NAME}/addCommentForArticle`,
  async (text, { extra, rejectWithValue, getState, dispatch }) => {
    const user = getAuthData(getState());
    const articleId = getArticleDetailsData(getState() as StoreWithArticleDetails)?.id;
    if (!user || !articleId || !text) {
      return rejectWithValue('No data');
    }

    try {
      const response = await extra.api.post<Comment>('/comments', { articleId, userId: user.id, text });
      if (!response.data) {
        return rejectWithValue('Error adding comment');
      }
      dispatch(fetchCommentsByArticleId(articleId));
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
