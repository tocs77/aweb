import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { Text, TextTheme } from 'shared/ui/Text';
import { Button } from 'shared/ui/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

import { ARTICLE_DETAILS_COMMENT_SLICE_NAME } from '../../model/types/ArticleDetailsCommentSchema';
import { articleDetailsCommentReducer, getArticleComments } from '../../model/slice/ArticleDetailsCommentSlice';
import { getArticleCommentsIsLoading, getArticleCommentsError } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import classes from './ArticleDetailsPage.module.scss';

const ArticleDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const initialReducers: ReducersList = { [ARTICLE_DETAILS_COMMENT_SLICE_NAME]: articleDetailsCommentReducer };
  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getArticleCommentsIsLoading);
  const error = useSelector(getArticleCommentsError);
  const navigate = useNavigate();

  useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)));

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  if (!id) return <div>{t('Article not found')}</div>;

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div>
        <Button onClick={onBackToList}>{t('Back')}</Button>
        <ArticleDetails id={id} />
        {error && <Text title={'Error'} text={error} theme={TextTheme.ERROR} />}
        <Text title={t('Comments')} className={classes.comment_title} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList comments={comments} isLoading={isLoading} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
