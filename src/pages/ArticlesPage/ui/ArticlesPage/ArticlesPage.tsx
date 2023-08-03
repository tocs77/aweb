import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextTheme, TextAlign } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import { ARTICLES_PAGE_SLICE_NAME } from '../../model/types/articlesPageSchema';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { fetchNextArticlesPage } from '@/pages/ArticlesPage/model/sevices/fetchNextArticlesPage/fetchNextArticlesPage';
import { getArticlesError } from '../../model/selectors/ariclesPageSelectors';
import { initArticlesPage } from '../../model/sevices/initArticlesPage/initArticlesPage';
import { ArticlePageFiler } from '../ArticlePageFilters/ArticlePageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';

const reducers: ReducersList = { [ARTICLES_PAGE_SLICE_NAME]: articlesPageReducer };

const ArticlesPage = () => {
  const dispatch = useAppDispatch();

  const error = useSelector(getArticlesError);

  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });
  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page onScrollEnd={onLoadNextPart} name='articles-page' data-testid='articles-page'>
        {error && <Text title='Error in artilces' text={error} theme={TextTheme.ERROR} align={TextAlign.CENTER} />}
        <ArticlePageFiler />
        <ArticleInfiniteList />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
