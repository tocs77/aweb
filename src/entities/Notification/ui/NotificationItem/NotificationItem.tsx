import { classNames } from '@/shared/lib/classNames/classNames';

import { Card, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text } from '@/shared/ui/deprecated/Text';

import classes from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { AppLink } from '@/shared/ui/deprecated/AppLink';

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = (props: NotificationItemProps) => {
  const { className, notification } = props;

  let content = (
    <Card theme={CardTheme.OUTLINED} className={classNames(classes.NotificationItem, {}, [className])}>
      <Text title={notification.title} text={notification.description} />
    </Card>
  );

  if (notification.href)
    content = (
      <AppLink to={notification.href} target='_blank' className={classes.link}>
        {content}
      </AppLink>
    );
  return content;
};
