import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';

import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { Page } from '@/widgets/Page';

import { ARTICLE_DETAILS_PAGE_SLICE_NAME } from '../../model/types';
import { articleDetailsPageReducer } from '../../model/slice';

import { ArtilceDetailPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/ArticleRating';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/Card';

const initialReducers: ReducersList = {
  [ARTICLE_DETAILS_PAGE_SLICE_NAME]: articleDetailsPageReducer,
};

const ArticleDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>{t('Article not found')}</div>;

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Page>
        <ArtilceDetailPageHeader />
        <ArticleDetails id={id} />
        <ToggleFeatures
          feature='isArticleRatingEnabled'
          on={<ArticleRating articleId={id} />}
          off={<Card>{t('Rating coming soon')}</Card>}
        />
        <ArticleRecommendationsList />
        <ArticleDetailsComments id={id} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
