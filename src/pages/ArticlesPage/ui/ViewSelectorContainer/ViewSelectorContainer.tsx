import { ArticleViewSelector } from '@/features/ArtilceViewSelector';

interface ViewSelectorContainerProps {
  className?: string;
}
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

export const ViewSelectorContainer = (props: ViewSelectorContainerProps) => {
  const { className } = props;
  const { view, onChangeView } = useArticleFilters();
  return <ArticleViewSelector className={className} view={view} onViewClick={onChangeView} />;
};
