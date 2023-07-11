import { ARTICLE_DETAILS_COMMENT_SLICE_NAME, ArticleDetailsCommentSchema } from './articleDetailsCommentsSchema';
import {
  ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME,
  ArticleDetailsRecommendationsSchema,
} from './articleDetailsRecommendationsSchema';

export interface ArticleDetailsPageSchema {
  [ARTICLE_DETAILS_COMMENT_SLICE_NAME]: ArticleDetailsCommentSchema;
  [ARTICLE_DETAILS_RECOMMENDATIONS_SLICE_NAME]: ArticleDetailsRecommendationsSchema;
}

export interface StoreWithArticlesDetailsPage {
  [ARTICLE_DETAILS_PAGE_SLICE_NAME]: ArticleDetailsPageSchema;
}

export const ARTICLE_DETAILS_PAGE_SLICE_NAME = 'articlesDetailPage';
