import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import classes from './CommentCard.module.scss';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteProfile } from '@/shared/consts/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

const CommentCardEl = (props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  const Skeleton = toggleFeatures({ name: 'isAppRedesigned', on: () => SkeletonRedesigned, off: () => SkeletonDeprecated });

  if (isLoading) {
    return (
      <div className={classNames(classes.CommentCard, {}, [className])} data-testid='CommentCard.Loading'>
        <div className={classes.header}>
          <Skeleton border='50%' width={30} height={30} />
          <Skeleton width={70} height={30} />
        </div>
        <Skeleton width='100%' height={30} className={classes.text} />
      </div>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card padding='24' border='round'>
          <VStack gap='8' max className={classNames('', {}, [className])} data-testid='CommentCard.Content'>
            <AppLink to={getRouteProfile(comment.user.id)}>
              <HStack gap='8'>
                {comment.user.avatar && <Avatar src={comment.user.avatar} size={30} />}
                <Text title={comment.user.username} />
              </HStack>
            </AppLink>

            <Text text={comment.text} className={classes.text} />
          </VStack>
        </Card>
      }
      off={
        <div className={classNames(classes.CommentCard, {}, [className])} data-testid='CommentCard.Content'>
          <AppLinkDeprecated to={getRouteProfile(comment.user.id)}>
            <div className={classes.header}>
              {comment.user.avatar && <AvatarDeprecated src={comment.user.avatar} size={30} />}
              <TextDeprecated title={comment.user.username} />
            </div>
          </AppLinkDeprecated>

          <TextDeprecated text={comment.text} className={classes.text} />
        </div>
      }
    />
  );
};

export const CommentCard = memo(CommentCardEl);
