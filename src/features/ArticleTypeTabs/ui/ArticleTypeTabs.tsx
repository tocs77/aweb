import { memo, useCallback, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { Tabs } from '@/shared/ui/redesigned/Tabs';
import { ArticleType } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleTypeTabsProps {
  className?: string;
  onChangeArticleType: (type: ArticleType) => void;
  articleType: ArticleType;
}

const ArticleTypeTabsEl = (props: ArticleTypeTabsProps) => {
  const { className, onChangeArticleType, articleType } = props;

  const typeTabs = useMemo<TabItem[]>(
    () => [
      { value: ArticleType.ALL, content: 'All' },
      { value: ArticleType.IT, content: 'IT' },
      { value: ArticleType.BUSINESS, content: 'Business' },
      { value: ArticleType.CULTURE, content: 'Culture' },
      { value: ArticleType.SOCIAL, content: 'Social' },
    ],
    [],
  );

  const onTabClick = useCallback(
    (val: string) => {
      onChangeArticleType(val as ArticleType);
    },
    [onChangeArticleType],
  );

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Tabs
          className={classNames('', {}, [className])}
          tabs={typeTabs}
          value={articleType}
          onTabClick={onTabClick}
          direction='column'
        />
      }
      off={
        <TabsDeprecated className={classNames('', {}, [className])} tabs={typeTabs} value={articleType} onTabClick={onTabClick} />
      }
    />
  );
};

export const ArticleTypeTabs = memo(ArticleTypeTabsEl);
