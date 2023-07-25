import { useSelector } from 'react-redux';

import { ArticleList } from '@/entities/Article';
import { getArticlesIsLoading, getArticlesView } from '../../model/selectors/ariclesPageSelectors';
import { getArticles } from '../../model/slices/articlesPageSlice';

export const ArticleInfiniteList = () => {
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesIsLoading);
  const view = useSelector(getArticlesView);
  return <ArticleList isLoading={isLoading} view={view} articles={articles} />;
};
