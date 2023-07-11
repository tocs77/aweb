import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { Text, TextSize, TextTheme } from 'shared/ui/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'widgets/Page';

import { ARTICLE_DETAILS_PAGE_SLICE_NAME } from '../../model/types';
import { getArticleRecommendations } from '../../model/slice/articleDetailsRecommendationsSlice';
import { articleDetailsPageReducer } from '../../model/slice';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { getArticleCommentsIsLoading, getArticleCommentsError } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import classes from './ArticleDetailsPage.module.scss';
import { fetchArticleRecommendations } from '../../model/services/fecthArticleRecommendations/fetchArticleRecommendations';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { ArtilceDetailPageHeader } from './ArticleDetailsPageHeader/ArticleDetailsPageHeader';

const initialReducers: ReducersList = {
  [ARTICLE_DETAILS_PAGE_SLICE_NAME]: articleDetailsPageReducer,
};

const ArticleDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
  const error = useSelector(getArticleCommentsError);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  });

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  if (!id) return <div>{t('Article not found')}</div>;

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Page>
        <ArtilceDetailPageHeader />
        <ArticleDetails id={id} />
        {error && <Text title={'Error'} text={error} theme={TextTheme.ERROR} />}
        <Text title={t('See also')} size={TextSize.L} className={classes.comment_title} />
        <ArticleList
          articles={recommendations}
          isLoading={recommendationsIsLoading}
          className={classes.recommendations}
          target={'_blank'}
        />
        <Text title={t('Comments')} size={TextSize.L} className={classes.comment_title} />
        <AddCommentForm onSendComment={onSendComment} />

        <CommentList comments={comments} isLoading={commentsIsLoading} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
