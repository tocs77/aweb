import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

import classes from './CommentList.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

const CommentListEl = (props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation();

  let content: JSX.Element | JSX.Element[];
  if (isLoading) {
    content = (
      <>
        <CommentCard isLoading={isLoading} className={classes.comment} />
        <CommentCard isLoading={isLoading} className={classes.comment} />
        <CommentCard isLoading={isLoading} className={classes.comment} />
      </>
    );
  } else if (!comments || !comments.length) {
    content = (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<Text text={t('No comments yet')} />}
        off={<TextDeprecated text={t('No comments yet')} />}
      />
    );
  } else {
    content = comments.map((comment) => <CommentCard key={comment.id} comment={comment} className={classes.comment} />);
  }

  return <div className={classNames('', {}, [className])}>{content}</div>;
};

export const CommentList = memo(CommentListEl);
