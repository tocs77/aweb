import { memo, HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

import { Text, TextSize } from 'shared/ui/Text';

import { Article, ArticleView } from '../../model/types/Article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItem.Skeleton';
import classes from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const ArticleListEl = (props: ArticleListProps) => {
  const { className, articles, isLoading = false, view = ArticleView.GRID, target } = props;
  const { t } = useTranslation();

  const renderArticle = (article: Article) => {
    return <ArticleListItem key={article.id} article={article} view={view} target={target} />;
  };

  const loadingSkeleton = isLoading
    ? new Array(view === ArticleView.GRID ? 9 : 3).fill(0).map((_, index) => <ArticleListItemSkeleton view={view} key={index} />)
    : null;

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(classes.ArticleList, {}, [className])}>
        <Text size={TextSize.L} title={t('No artilces')} />
      </div>
    );
  }

  return (
    <div className={classNames(classes.ArticleList, {}, [className])}>
      {articles.length ? articles.map((article) => renderArticle(article)) : null}

      {loadingSkeleton}
    </div>
  );
};

export const ArticleList = memo(ArticleListEl);
