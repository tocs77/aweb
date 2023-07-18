import { useTranslation } from 'react-i18next';

import { Text, TextSize } from 'shared/ui/Text';
import { ArticleList } from 'entities/Article';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { useRecommendationsApi } from '../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = (props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { isLoading, data, error } = useRecommendationsApi(3);

  if (isLoading || error) return null;

  return (
    <VStack className={classNames('', {}, [className])} gap='8' max>
      <Text title={t('See also')} size={TextSize.L} />
      <ArticleList articles={data} target={'_blank'} isLoading={isLoading} />
    </VStack>
  );
};
