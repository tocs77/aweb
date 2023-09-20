import { Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { CommentList } from '@/entities/Comment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from '@/features/AddCommentForm';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Loader } from '@/shared/ui/redesigned/Loader';
import { ToggleFeatures } from '@/shared/lib/features';

import { getArticleCommentsIsLoading, getArticleCommentsError } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';

interface ArticleDetailsCommentsProps {
  className?: string;
  id: string;
}

export const ArticleDetailsComments = (props: ArticleDetailsCommentsProps) => {
  const { className, id } = props;

  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const error = useSelector(getArticleCommentsError);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch],
  );
  return (
    <div className={classNames('', {}, [className])}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <>
            {error && <Text title={'Error'} text={error} variant='error' />}
            <Text title={t('Comments')} size='l' />
          </>
        }
        off={
          <>
            {error && <TextDeprecated title={'Error'} text={error} theme={TextTheme.ERROR} />}
            <TextDeprecated title={t('Comments')} size={TextSize.L} />
          </>
        }
      />

      <Suspense fallback={<Loader />}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>
      <CommentList comments={comments} isLoading={commentsIsLoading} />
    </div>
  );
};
