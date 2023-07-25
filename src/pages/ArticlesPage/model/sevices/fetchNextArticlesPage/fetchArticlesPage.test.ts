import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunc/TestAsyncThuns';
import { ARTICLES_PAGE_SLICE_NAME } from '../../types/articlesPageSchema';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('Fetch next article page async action', () => {
  it('should dispatch to next page', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      [ARTICLES_PAGE_SLICE_NAME]: { isLoading: false, page: 2, ids: [], entities: {}, limit: 5, hasMore: true },
    });
    await thunk.callThunk();
    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 });
  });
  it('should not fetch if hasMore=false', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      [ARTICLES_PAGE_SLICE_NAME]: { isLoading: false, page: 2, ids: [], entities: {}, limit: 5, hasMore: false },
    });
    await thunk.callThunk();
    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
  it('should not fetch if isloading=true', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      [ARTICLES_PAGE_SLICE_NAME]: { isLoading: true, page: 2, ids: [], entities: {}, limit: 5, hasMore: true },
    });
    await thunk.callThunk();
    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
