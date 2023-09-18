import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { ArticleView } from '../../model/consts/consts';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItem.Skeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import classes from './ArticleList.module.scss';
import { Article } from '../../model/types/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  target?: HTMLAttributeAnchorTarget;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.GRID ? 9 : 3)
    .fill(0)
    .map((item, index) => <ArticleListItemSkeleton className={classes.card} key={index} view={view} />);

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, view = ArticleView.GRID, isLoading, target } = props;
  const { t } = useTranslation();

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(classes.ArticleList, {}, [className, classes[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    );
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <HStack wrap='wrap' gap='16' className={classNames(classes.ArticleListRedesigned, {}, [])} data-testid='ArticleList'>
          {articles.map((item) => (
            <ArticleListItem article={item} view={view} target={target} key={item.id} className={classes.card} />
          ))}
          {isLoading && getSkeletons(view)}
        </HStack>
      }
      off={
        <div className={classNames(classes.ArticleList, {}, [className, classes[view]])} data-testid='ArticleList'>
          {articles.map((item) => (
            <ArticleListItem article={item} view={view} target={target} key={item.id} className={classes.card} />
          ))}
          {isLoading && getSkeletons(view)}
        </div>
      }
    />
  );
});
