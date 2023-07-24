import { classNames } from 'shared/lib/classNames/classNames';

import { useNotificationsApi } from '../../api/notificationApi';
import { VStack } from 'shared/ui/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton } from 'shared/ui/Skeleton';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = (props: NotificationListProps) => {
  const { className } = props;

  const { isLoading, data: notifications } = useNotificationsApi(null, { pollingInterval: 5000 });

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
