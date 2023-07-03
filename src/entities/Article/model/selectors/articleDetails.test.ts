import { getArticleDetailsData, getError, getIsLoading } from './articleDetails';
import { StoreWithArticleDetails, ARTICLE_DETAILS_SLICE_NAME, ArticleDetailsSchema } from '../types/articleDetailsSchema';

import { Article } from '../types/Article';

const article: Article = {
  id: '1',
  title: '3333',
  subtitle: 'eee',
  user: { id: '1', username: 'admin' },
  img: 'ddd',
  views: 4,
  createdAt: 'ddd',
  type: [],
  blocks: [],
};

const baseProfile: ArticleDetailsSchema = {
  data: article,
  isLoading: true,
  error: undefined,
};

describe('Article detail slices', () => {
  it('should return article', () => {
    const state: StoreWithArticleDetails = { [ARTICLE_DETAILS_SLICE_NAME]: baseProfile };
    expect(getArticleDetailsData(state)).toEqual(article);
  });
  it('should return undefined for empty  article value', () => {
    const state: StoreWithArticleDetails = { [ARTICLE_DETAILS_SLICE_NAME]: { data: undefined, isLoading: true } };
    expect(getArticleDetailsData(state)).toBe(undefined);
  });

  it('should return is loading true', () => {
    const state: StoreWithArticleDetails = { [ARTICLE_DETAILS_SLICE_NAME]: { data: undefined, isLoading: true } };
    expect(getIsLoading(state)).toBe(true);
  });

  it('should return error', () => {
    const state: StoreWithArticleDetails = {
      [ARTICLE_DETAILS_SLICE_NAME]: { data: undefined, isLoading: false, error: 'error' },
    };
    expect(getError(state)).toBe('error');
  });
});
