import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text as TextDeprecated, TextTheme, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';

import { ARTICLES_PAGE_SLICE_NAME } from '../../model/types/articlesPageSchema';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { fetchNextArticlesPage } from '@/pages/ArticlesPage/model/sevices/fetchNextArticlesPage/fetchNextArticlesPage';
import { getArticlesError } from '../../model/selectors/ariclesPageSelectors';
import { initArticlesPage } from '../../model/sevices/initArticlesPage/initArticlesPage';
import { ArticlePageFiler } from '../ArticlePageFilters/ArticlePageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyConentLayout } from '@/shared/layout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

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

  const content = (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <StickyConentLayout
          left={
            <div>
              <ViewSelectorContainer />
            </div>
          }
          content={
            <Page onScrollEnd={onLoadNextPart} name='articles-page' data-testid='articles-page'>
              {error && <Text title='Error in artilces' text={error} variant='error' align='center' />}
              <ArticleInfiniteList />
              <ArticlePageGreeting />
            </Page>
          }
          right={<FiltersContainer />}
        />
      }
      off={
        <Page onScrollEnd={onLoadNextPart} name='articles-page' data-testid='articles-page'>
          {error && <TextDeprecated title='Error in artilces' text={error} theme={TextTheme.ERROR} align={TextAlign.CENTER} />}
          <ArticlePageGreeting />
          <ArticlePageFiler />
          <ArticleInfiniteList />
        </Page>
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
