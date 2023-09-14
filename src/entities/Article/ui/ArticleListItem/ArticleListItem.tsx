import { HTMLAttributeAnchorTarget, memo } from 'react';

import { Article } from '../../model/types/Article';
import { ArticleView } from '../../model/consts/consts';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedeigned';
import { ToggleFeatures } from '@/shared/lib/features';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const ArticleListItemEl = (props: ArticleListItemProps) => {
  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<ArticleListItemRedesigned {...props} />}
      off={<ArticleListItemDeprecated {...props} />}
    />
  );
};

export const ArticleListItem = memo(ArticleListItemEl);
