import { classNames } from '@/shared/lib/classNames/classNames';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonDepreacted } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

import { NotificationItem } from '../NotificationItem/NotificationItem';
import { useNotificationsApi } from '../../api/notificationApi';
import { toggleFeatures } from '@/shared/lib/features';
interface NotificationListProps {
  className?: string;
}

export const NotificationList = (props: NotificationListProps) => {
  const { className } = props;

  const { isLoading, data: notifications } = useNotificationsApi(null, { pollingInterval: 5000 });

  const Skeleton = toggleFeatures({ name: 'isAppRedesigned', on: () => SkeletonRedesigned, off: () => SkeletonDepreacted });

  if (isLoading) {
    return (
      <VStack gap={'16'} max className={classNames('', {}, [className])}>
        <Skeleton width={'100%'} height={'80px'} border='8px' />
        <Skeleton width={'100%'} height={'80px'} border='8px' />
        <Skeleton width={'100%'} height={'80px'} border='8px' />
      </VStack>
    );
  }
  return (
    <VStack gap={'16'} max className={classNames('', {}, [className])}>
      {notifications?.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </VStack>
  );
};
