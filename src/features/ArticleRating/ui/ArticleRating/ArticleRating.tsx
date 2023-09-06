import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { RatingCard } from '@/entities/Rating';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { useSelector } from 'react-redux';
import { getAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

interface ArticleRatingProps {
  className?: string;
  articleId: string;
}
export const ArticleRating = (props: ArticleRatingProps) => {
  const { t } = useTranslation();
  const { className, articleId } = props;
  const auth = useSelector(getAuthData);
  const { data, isLoading } = useGetArticleRating({ articleId, userId: auth?.id || '' });
  const [rateArticleMutation] = useRateArticle();

  const handleArticleMutation = useCallback(
    (rating: number, feedback?: string) => {
      try {
        rateArticleMutation({ articleId, rate: rating, feedback, userId: auth?.id || '' });
      } catch (error) {
        console.log(error);
      }
    },
    [articleId, auth?.id, rateArticleMutation],
  );

  const onCancel = useCallback(
    (rating: number) => {
      handleArticleMutation(rating);
    },
    [handleArticleMutation],
  );
  const onAccept = useCallback(
    (rating: number, feedback?: string) => {
      handleArticleMutation(rating, feedback);
    },
    [handleArticleMutation],
  );

  if (isLoading) return <Skeleton width='100%' height='50px' />;

  const rating = data?.[0];

  return (
    <RatingCard
      className={className}
      title={t('Rate Article')}
      feedbackTitle={t('Yor feedback will help to improve quality')}
      hasFeedback
      onAccept={onAccept}
      onCancel={onCancel}
      rating={rating?.rate}
    />
  );
};
