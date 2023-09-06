import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { Text } from '@/shared/ui/deprecated/Text';
import classes from './CommentList.module.scss';

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
    content = <Text text={t('No comments yet')} />;
  } else {
    content = comments.map((comment) => <CommentCard key={comment.id} comment={comment} className={classes.comment} />);
  }

  return <div className={classNames('', {}, [className])}>{content}</div>;
};

export const CommentList = memo(CommentListEl);
