import { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/Popups';
import { NotificationList } from 'entities/Notification';
import { Icon } from 'shared/ui/Icon';
import { Drawer } from 'shared/ui/Drower';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';

import classes from './NotificationButton.module.scss';
import { AnimationProvider } from 'shared/lib/components/AnimationsProvider';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = (props: NotificationButtonProps) => {
  const { className } = props;
  const [isOpened, setIsOpened] = useState(false);

  const onOpenDrawer = () => {
    setIsOpened(true);
  };

  const trigger = (
    <div onClick={onOpenDrawer}>
      <Icon Svg={NotificationIcon} inverted />
    </div>
  );

  return (
    <div>
      <BrowserView>
        <Popover direction='bottom-left' className={classNames(classes.NotificationButton, {}, [className])} label={trigger}>
          <NotificationList className={classes.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <AnimationProvider>
          <Drawer isOpened={isOpened} onClose={() => setIsOpened(false)}>
            <NotificationList />
          </Drawer>
        </AnimationProvider>
      </MobileView>
    </div>
  );
};
