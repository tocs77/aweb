import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card/ui/Card';
import { Input } from '@/shared/ui/deprecated/Input';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArtilceViewSelector';

import classes from './ArticlePageFilters.module.scss';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ArticlePageFilerProps {
  className?: string;
}

const ArticlePageFilerEl = (props: ArticlePageFilerProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const {
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeArticleType,
    onChangeView,
    order,
    search,
    sort,
    articleType,
    view,
  } = useArticleFilters();

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
