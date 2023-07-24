import { PropsWithChildren } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Overlay } from 'shared/ui/Overlay';
import { Portal } from 'shared/ui/Portal';
import { useTheme } from 'app/providers/ThemeProvider';

import classes from './Drawer.module.scss';

interface DrowerProps {
  className?: string;
  isOpened: boolean;
  onClose: () => void;
}

export const Drawer = (props: PropsWithChildren<DrowerProps>) => {
  const { className, isOpened, onClose, children } = props;
  const { theme } = useTheme();

  return (
    <Portal>
      <div className={classNames(classes.Drawer, { [classes.opened]: isOpened }, [className, theme, 'app_drawer'])}>
        <Overlay onClick={onClose} />
        <div className={classes.content}>{children}</div>
      </div>
    </Portal>
  );
};
