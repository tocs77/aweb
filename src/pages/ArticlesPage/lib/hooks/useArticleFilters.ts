import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  getArticlesView,
  getArticlesPageSortOrder,
  getArticlesPageSortField,
  getArticlesPageSearch,
  getArticlesPageType,
} from '../../model/selectors/ariclesPageSelectors';
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import { SortOrder } from '@/shared/types';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticlesList } from '../../model/sevices/fetchArticlesList/fetchArticlesList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

export function useArticleFilters() {
  const view = useSelector(getArticlesView);
  const sort = useSelector(getArticlesPageSortField);
  const order = useSelector(getArticlesPageSortOrder);
  const search = useSelector(getArticlesPageSearch);
  const articleType = useSelector(getArticlesPageType);

  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
  );

  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeArticleType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  return {
    view,
    sort,
    order,
    search,
    articleType,
    onChangeView,
    onChangeSort,
    onChangeOrder,
    onChangeSearch,
    onChangeArticleType,
  };
}
