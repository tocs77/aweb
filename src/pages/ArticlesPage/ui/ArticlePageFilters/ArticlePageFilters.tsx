import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card/ui/Card';
import { Input } from '@/shared/ui/Input';
import { ArticleSortField, ArticleView, ArticleViewSelector, ArticleTypeTabs } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleSortSelector, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

import classes from './ArticlePageFilters.module.scss';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import {
  getArticlesView,
  getArticlesPageSortOrder,
  getArticlesPageSortField,
  getArticlesPageSearch,
  getArticlesPageType,
} from '../../model/selectors/ariclesPageSelectors';
import { fetchArticlesList } from '../../model/sevices/fetchArticlesList/fetchArticlesList';

interface ArticlePageFilerProps {
  className?: string;
}

const ArticlePageFilerEl = (props: ArticlePageFilerProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesView);
  const order = useSelector(getArticlesPageSortOrder);
  const sort = useSelector(getArticlesPageSortField);
  const search = useSelector(getArticlesPageSearch);
  const articleType = useSelector(getArticlesPageType);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
  );

  const fectchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fectchData, 500);

  const onChangeOrder = useCallback(
    (order: SortOrder) => {
      dispatch(articlesPageActions.setOrder(order));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeSort = useCallback(
    (sort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(sort));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
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
    (type: ArticleType) => {
      dispatch(articlesPageActions.setType(type));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  return (
    <div className={classNames(classes.ArticlePageFiler, {}, [className])}>
      <div className={classes.sortWrapper}>
        <ArticleSortSelector order={order} sort={sort} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={classes.search}>
        <Input placeholder={t('Search')} value={search} onChange={onChangeSearch} />
      </Card>
      <ArticleTypeTabs articleType={articleType} onChangeArticleType={onChangeArticleType} className={classes.tabs} />
    </div>
  );
};

export const ArticlePageFiler = memo(ArticlePageFilerEl);
