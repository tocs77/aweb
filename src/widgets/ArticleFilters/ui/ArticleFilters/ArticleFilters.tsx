import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { Input } from '@/shared/ui/redesigned/Input';
import { classNames } from '@/shared/lib/classNames/classNames';
import SearchIcon from '@/shared/assets/icons/search.svg';

import classes from './ArticleFilters.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ArticleFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (order: SortOrder) => void;
  onChangeSort: (sort: ArticleSortField) => void;
  onChangeArticleType: (type: ArticleType) => void;
  articleType: ArticleType;
  search: string;
  onChangeSearch: (search: string) => void;
}

export const ArticleFilters = (props: ArticleFiltersProps) => {
  const { className, articleType, onChangeArticleType, onChangeOrder, onChangeSearch, onChangeSort, order, search, sort } = props;
  const { t } = useTranslation();
  return (
    <Card className={classNames(classes.ArticleFilters, {}, [className])} padding='24'>
      <VStack gap='32'>
        <Input placeholder={t('Search')} value={search} onChange={onChangeSearch} addonLeft={<Icon Svg={SearchIcon} />} />
        <ArticleTypeTabs articleType={articleType} onChangeArticleType={onChangeArticleType} className={classes.tabs} />
        <ArticleSortSelector order={order} sort={sort} onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
      </VStack>
    </Card>
  );
};
