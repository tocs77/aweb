import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { Text } from 'shared/ui/Text';
import { Loader } from 'shared/ui/Loader';
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

  if (!comments || !comments.length) {
    content = <Text text={t('No comments yet')} />;
  } else if (isLoading) {
    content = <Loader />;
  } else {
    content = comments.map((comment) => <CommentCard key={comment.id} comment={comment} className={classes.comment} />);
  }

  return <div className={classNames('', {}, [className])}>{content}</div>;
};

export const CommentList = memo(CommentListEl);
