import { useTranslation } from 'react-i18next';

import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleList, ArticleView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useRecommendationsApi } from '../api/articleRecommendationsApi';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = (props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { isLoading, data: artcles, error } = useRecommendationsApi(3);

  if (isLoading || error || !artcles) return null;

  return (
    <VStack className={classNames('', {}, [className])} gap='8' max data-testid='ArticleRecommendationsList'>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<Text text={t('See also')} size='xl' />}
        off={<TextDeprecated title={t('See also')} size={TextSize.L} />}
      />

      <ArticleList articles={artcles} target={'_blank'} isLoading={isLoading} view={ArticleView.GRID} />
    </VStack>
  );
};
