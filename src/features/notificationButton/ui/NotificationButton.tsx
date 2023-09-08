import { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { NotificationList } from '@/entities/Notification';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Drawer } from '@/shared/ui/deprecated/Drower';
import NotificationIconDepecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';

import classes from './NotificationButton.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Popover } from '@/shared/ui/redesigned/Popups';

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
    <ToggleFeatures
      feature='isAppRedesigned'
      on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
      off={
        <div onClick={onOpenDrawer}>
          <IconDeprecated Svg={NotificationIconDepecated} inverted />
        </div>
      }
    />
  );

  return (
    <div>
      <BrowserView>
        <ToggleFeatures
          feature='isAppRedesigned'
          on={
            <Popover direction='bottom-left' className={classNames(classes.NotificationButton, {}, [className])} label={trigger}>
              <NotificationList className={classes.notifications} />
            </Popover>
          }
          off={
            <PopoverDeprecated
              direction='bottom-left'
              className={classNames(classes.NotificationButton, {}, [className])}
              label={trigger}>
              <NotificationList className={classes.notifications} />
            </PopoverDeprecated>
          }
        />
      </BrowserView>
      <MobileView>
        {trigger}

        <Drawer isOpened={isOpened} onClose={() => setIsOpened(false)}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
};
