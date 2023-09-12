import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Select as SelectDeprecated, SelectOption } from '@/shared/ui/deprecated/Select';
import { SortOrder } from '@/shared/types';
import { ArticleSortField } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import classes from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (order: SortOrder) => void;
  onChangeSort: (sort: ArticleSortField) => void;
}

const ArticleSortSelectorEl = (props: ArticleSortSelectorProps) => {
  const { className, order, sort, onChangeOrder, onChangeSort } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      { value: 'asc', content: t('ascending') },
      { value: 'desc', content: t('descending') },
    ],
    [t],
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      { value: ArticleSortField.TITLE, content: t('Title') },
      { value: ArticleSortField.CREATED, content: t('Creation date') },
      { value: ArticleSortField.VIEWS, content: t('Views') },
    ],
    [t],
  );

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <VStack className={classNames(classes.ArticleSortSelector, {}, [className])} gap='8'>
          <Text text={`${t('Sort by')}:`} size='l' />
          <ListBox<ArticleSortField> items={sortFieldOptions} onChange={onChangeSort} value={sort} />
          <ListBox<SortOrder> items={orderOptions} onChange={onChangeOrder} value={order} />
        </VStack>
      }
      off={
        <div className={classNames(classes.ArticleSortSelector, {}, [className])}>
          <SelectDeprecated<ArticleSortField>
            label={t('Sort by')}
            options={sortFieldOptions}
            onChange={onChangeSort}
            value={sort}
          />
          <SelectDeprecated<SortOrder> label={t('By')} options={orderOptions} onChange={onChangeOrder} value={order} />
        </div>
      }
    />
  );
};

export const ArticleSortSelector = memo(ArticleSortSelectorEl);
