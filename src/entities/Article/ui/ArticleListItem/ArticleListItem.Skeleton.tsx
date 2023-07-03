import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/ui/Card';
import { Skeleton } from 'shared/ui/Skeleton';

import { ArticleView } from '../../model/types/Article';
import classes from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

const ArticleListItemSkeletonEl = (props: ArticleListItemSkeletonProps) => {
  const { className, view } = props;

  const types = <Skeleton width={130} height={16} className={classes.types} />;
  const views = <Skeleton width={130} height={16} className={classes.types} />;

  if (ArticleView.LIST == view) {
    return (
      <div className={classNames(classes.ArticleListItemSkeleton, {}, [className, classes[view]])}>
        <Card className={classes.card}>
          <div className={classes.header}>
            <Skeleton width={30} height={30} border='50%' />
            <Skeleton width={70} height={20} className={classes.username} />
          </div>
          <Skeleton width={130} height={16} className={classes.title} />
          {types}
          <Skeleton width={70} height={70} />
          <Skeleton height={150} className={classes.textBlock} />
          <div className={classes.footer}>{views}</div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(classes.ArticleListItemSkeleton, {}, [className, classes[view]])}>
      <Card className={classes.card}>
        <div className={classes.imageWrapper}>
          <Skeleton width={200} height={200} className={classes.img} />
        </div>
        <div className={classes.infoWrapper}>
          {types}
          {views}
        </div>
        <Skeleton width={150} height={16} className={classes.title} />
      </Card>
    </div>
  );
};

export const ArticleListItemSkeleton = memo(ArticleListItemSkeletonEl);
