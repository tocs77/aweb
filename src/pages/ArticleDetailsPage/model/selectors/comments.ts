import { StoreWithArticleDetailsComment, ARTICLE_DETAILS_COMMENT_SLICE_NAME } from '../types/ArticleDetailsCommentSchema';

export const getArticleCommentsError = (state: StoreWithArticleDetailsComment) =>
  state[ARTICLE_DETAILS_COMMENT_SLICE_NAME]?.error;

export const getArticleCommentsIsLoading = (state: StoreWithArticleDetailsComment) =>
  state[ARTICLE_DETAILS_COMMENT_SLICE_NAME]?.isLoading || false;
