import { EntityState } from '@reduxjs/toolkit';
import { Comment } from 'entities/Comment';

export const ARTICLE_DETAILS_COMMENT_SLICE_NAME = 'articleDetailsComment' as const;

export interface ArticleDetailsCommentSchema extends EntityState<Comment> {
  isLoading?: boolean;
  error?: string;
}

export interface StoreWithArticleDetailsComment {
  [ARTICLE_DETAILS_COMMENT_SLICE_NAME]: ArticleDetailsCommentSchema;
}
