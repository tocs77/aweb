import { ArticleFilters } from '@/widgets/ArticleFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

export const FiltersContainer = () => {
  const { onChangeOrder, onChangeSearch, onChangeSort, onChangeArticleType, order, search, sort, articleType } =
    useArticleFilters();
  return (
    <ArticleFilters
      articleType={articleType}
      order={order}
      sort={sort}
      search={search}
      onChangeArticleType={onChangeArticleType}
      onChangeOrder={onChangeOrder}
      onChangeSearch={onChangeSearch}
      onChangeSort={onChangeSort}
    />
  );
};
