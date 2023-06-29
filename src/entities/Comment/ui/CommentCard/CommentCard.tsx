import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import classes from './CommentCard.module.scss';
import { Avatar } from 'shared/ui/Avatar';
import { Text } from 'shared/ui/Text';
import { Skeleton } from 'shared/ui/Skeleton';

interface CommentCardProps {
  className?: string;
  comment: Comment;
  isLoading?: boolean;
}

const CommentCardEl = (props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <div className={classNames(classes.CommentCard, {}, [className])}>
        <div className={classes.header}>
          <Skeleton border='50%' width={30} height={30} />
          <Skeleton width={70} height={30} />
        </div>
        <Skeleton width='100%' height={30} className={classes.text} />
      </div>
    );
  }

  return (
    <div className={classNames(classes.CommentCard, {}, [className])}>
      <div className={classes.header}>
        {comment.user.avatar && <Avatar src={comment.user.avatar} size={30} />}
        <Text title={comment.user.username} />
      </div>
      <Text text={comment.text} className={classes.text} />
    </div>
  );
};

export const CommentCard = memo(CommentCardEl);
