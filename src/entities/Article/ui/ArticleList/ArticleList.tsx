import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/Article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItem.Skeleton';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const ArticleListEl = (props: ArticleListProps) => {
  const { className, articles, isLoading = false, view = ArticleView.GRID } = props;

  const renderArticle = (article: Article) => {
    return <ArticleListItem key={article.id} article={article} view={view} />;
  };

  if (isLoading) {
    return (
      <div className={classNames(classes.ArticleList, {}, [className])}>
        {new Array(view === ArticleView.GRID ? 9 : 3).fill(0).map((_, index) => (
          <ArticleListItemSkeleton view={view} key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={classNames(classes.ArticleList, {}, [className])}>
      {articles.length ? articles.map((article) => renderArticle(article)) : null}
    </div>
  );
};

export const ArticleList = memo(ArticleListEl);
