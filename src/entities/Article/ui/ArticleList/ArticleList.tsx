import { memo, HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { FixedSizeList as List, FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

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
  virtualized?: boolean;
}

const ArticleListEl = (props: ArticleListProps) => {
  const { className, articles, isLoading = false, view = ArticleView.GRID, target, virtualized = true } = props;
  const { t } = useTranslation();

  const renderArticleRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const article = articles[index];
    return (
      <div key={article.id} style={style}>
        <ArticleListItem article={article} view={view} target={target} />
      </div>
    );
  };
  const renderArticleCell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
  }) => {
    const article = articles[columnIndex + rowIndex * 3];
    if (!article) return <div key={`${columnIndex}${rowIndex}`} style={style}></div>;
    return (
      <div key={article.id} style={style}>
        <ArticleListItem article={article} view={view} target={target} />
      </div>
    );
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

  let list: JSX.Element | JSX.Element[] | null = null;
  if (virtualized && articles.length) {
    list = (
      <AutoSizer defaultHeight={100} defaultWidth={300} className={classes.autosizer}>
        {({ height, width }: { height: number; width: number }) => {
          return view === ArticleView.GRID ? (
            <Grid
              columnCount={3}
              columnWidth={230}
              height={height}
              rowCount={Math.floor(articles.length / 3)}
              rowHeight={230}
              width={700}>
              {renderArticleCell}
            </Grid>
          ) : (
            <List height={height} itemCount={articles.length} itemSize={500} width={width}>
              {renderArticleRow}
            </List>
          );
        }}
      </AutoSizer>
    );
  } else {
    list = articles.map((article) => <ArticleListItem article={article} view={view} target={target} key={article.id} />);
  }

  return (
    <div className={classNames(classes.ArticleList, {}, [className])}>
      {list}
      {loadingSkeleton}
    </div>
  );
};

export const ArticleList = memo(ArticleListEl);
