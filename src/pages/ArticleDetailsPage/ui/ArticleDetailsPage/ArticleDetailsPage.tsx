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
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { StickyConentLayout } from '@/shared/layout';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

const initialReducers: ReducersList = {
  [ARTICLE_DETAILS_PAGE_SLICE_NAME]: articleDetailsPageReducer,
};

const ArticleDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>{t('Article not found')}</div>;

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <StickyConentLayout
            content={
              <Page>
                <VStack gap='16'>
                  <DetailsContainer />
                  <ArticleDetails id={id} />
                  <ArticleRating articleId={id} />
                  <ArticleRecommendationsList />
                  <ArticleDetailsComments id={id} />
                </VStack>
              </Page>
            }
            right={<AdditionalInfoContainer />}
          />
        }
        off={
          <Page>
            <ArtilceDetailPageHeader />
            <ArticleDetails id={id} />
            <ToggleFeatures
              feature='isArticleRatingEnabled'
              on={<ArticleRating articleId={id} />}
              off={<CardDeprecated>{t('Rating coming soon')}</CardDeprecated>}
            />
            <ArticleRecommendationsList />
            <ArticleDetailsComments id={id} />
          </Page>
        }
      />
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
