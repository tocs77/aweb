import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextTheme, TextAlign } from 'shared/ui/Text';

import { ARTICLES_PAGE_SLICE_NAME } from '../../model/types/articlesPageSchema';
import { articlesPageReducer, getArticles, articlesPageActions } from '../../model/slices/articlesPageSlice';
import { fetchArticlesList } from '../../model/sevices/fetchArticlesList/fetchArticlesList';
import { getArticlesIsLoading, getArticlesError, getArticlesView } from '../../model/selectors/ariclesPageSelectors';

const reducers: ReducersList = { [ARTICLES_PAGE_SLICE_NAME]: articlesPageReducer };

const ArticlesPage = () => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesIsLoading);
  const error = useSelector(getArticlesError);
  const view = useSelector(getArticlesView);

  useInitialEffect(() => {
    dispatch(fetchArticlesList());
    dispatch(articlesPageActions.initState());
  });

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div>
        {error && <Text title='Error in artilces' text={error} theme={TextTheme.ERROR} align={TextAlign.CENTER} />}
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
