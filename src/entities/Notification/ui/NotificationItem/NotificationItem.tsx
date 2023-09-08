import { classNames } from '@/shared/lib/classNames/classNames';

import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

import classes from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = (props: NotificationItemProps) => {
  const { className, notification } = props;

  let content = (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card variant='normal' className={classNames(classes.NotificationItem, {}, [className])} padding='8'>
          <Text title={notification.title} text={notification.description} />
        </Card>
      }
      off={
        <CardDeprecated theme={CardTheme.OUTLINED} className={classNames(classes.NotificationItem, {}, [className])}>
          <TextDeprecated title={notification.title} text={notification.description} />
        </CardDeprecated>
      }
    />
  );

  if (notification.href)
    content = (
      <AppLinkDeprecated to={notification.href} target='_blank' className={classes.link}>
        {content}
      </AppLinkDeprecated>
    );
  return content;
};
