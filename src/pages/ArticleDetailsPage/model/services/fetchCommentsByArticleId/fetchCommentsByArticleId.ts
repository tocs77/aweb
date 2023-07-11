import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';
import { ARTICLE_DETAILS_COMMENT_SLICE_NAME } from '../../types/articleDetailsCommentsSchema';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';

export const fetchCommentsByArticleId = createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>(
  `${ARTICLE_DETAILS_COMMENT_SLICE_NAME}/fetchCommentsByArticleId`,
  async (id: string | undefined, { extra, rejectWithValue }) => {
    if (!id) return rejectWithValue('Wrong article id');
    try {
      const response = await extra.api.get<Comment[]>('/comments', { params: { articleId: id, _expand: 'user' } });
      if (!response.data) {
        return rejectWithValue('Wrong fetching comments');
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
