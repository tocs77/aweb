import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';

import TileIcon from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
  { view: ArticleView.GRID, icon: TileIcon },
  { view: ArticleView.LIST, icon: ListIcon },
];

const ArticleViewSelectorEl = (props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  return (
    <div className={classNames(classes.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          key={viewType.view}
          theme={ButtonTheme.CLEAR}
          onClick={() => onViewClick(viewType.view)}
          disabled={view === viewType.view}>
          <Icon Svg={viewType.icon} width={24} height={24} />
        </Button>
      ))}
    </div>
  );
};

export const ArticleViewSelector = memo(ArticleViewSelectorEl);
