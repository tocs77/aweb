import { combineReducers } from '@reduxjs/toolkit';

import { ArticleDetailsPageSchema } from '../types';
import { articleDetailsCommentReducer } from './articleDetailsCommentSlice';
import { ARTICLE_DETAILS_COMMENT_SLICE_NAME } from '../types/articleDetailsCommentSchema';
import { articleDetailsRecommendationsReducer } from './articleDetailsRecommendationsSlice';
import { ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME } from '../types/articleDetailsRecommendationsSchema';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  [ARTICLE_DETAILS_COMMENT_SLICE_NAME]: articleDetailsCommentReducer,
  [ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME]: articleDetailsRecommendationsReducer,
});
