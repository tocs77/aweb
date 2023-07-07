import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleSortField } from 'entities/Article';
import { Select, SelectOption } from 'shared/ui/Select';
import { SortOrder } from 'shared/types';

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
    <div className={classNames(classes.ArticleSortSelector, {}, [className])}>
      <Select<ArticleSortField> label={t('Sort by')} options={sortFieldOptions} onChange={onChangeSort} value={sort} />
      <Select<SortOrder> label={t('By')} options={orderOptions} onChange={onChangeOrder} value={order} />
    </div>
  );
};

export const ArticleSortSelector = memo(ArticleSortSelectorEl);
