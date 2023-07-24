import { classNames } from 'shared/lib/classNames/classNames';

import { Popover } from 'shared/ui/Popups';
import { NotificationList } from 'entities/Notification';
import { Icon } from 'shared/ui/Icon';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';

import classes from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = (props: NotificationButtonProps) => {
  const { className } = props;

  return (
    <Popover
      direction='bottom-left'
      className={classNames(classes.NotificationButton, {}, [className])}
      label={
        <div>
          <Icon Svg={NotificationIcon} inverted />
        </div>
      }>
      <NotificationList className={classes.notifications} />
    </Popover>
  );
};
