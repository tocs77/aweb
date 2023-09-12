import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';

import TileIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TileIcon from '@/shared/assets/icons/tile.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.GRID,
    icon: toggleFeatures({ name: 'isAppRedesigned', on: () => TileIcon, off: () => TileIconDeprecated }),
  },
  {
    view: ArticleView.LIST,
    icon: toggleFeatures({ name: 'isAppRedesigned', on: () => ListIcon, off: () => ListIconDeprecated }),
  },
];

const ArticleViewSelectorEl = (props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card className={classNames(classes.ArticleViewSelectorRedesigned, {}, [className])} border='round'>
          <HStack gap='8'>
            {viewTypes.map((viewType) => (
              <Icon
                className={classNames('', { [classes.notSelected]: view !== viewType.view })}
                Svg={viewType.icon}
                width={24}
                height={24}
                clickable
                onClick={() => onViewClick(viewType.view)}
                key={viewType.view}
              />
            ))}
          </HStack>
        </Card>
      }
      off={
        <div className={classNames(classes.ArticleViewSelector, {}, [className])}>
          {viewTypes.map((viewType) => (
            <ButtonDeprecated
              key={viewType.view}
              theme={ButtonTheme.CLEAR}
              onClick={() => onViewClick(viewType.view)}
              disabled={view === viewType.view}>
              <IconDeprecated Svg={viewType.icon} width={24} height={24} />
            </ButtonDeprecated>
          ))}
        </div>
      }
    />
  );
};

export const ArticleViewSelector = memo(ArticleViewSelectorEl);
