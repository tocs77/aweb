import { PropsWithChildren, memo, useCallback, useEffect } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Overlay } from 'shared/ui/Overlay';
import { Portal } from 'shared/ui/Portal';
import { useTheme } from 'app/providers/ThemeProvider';

import classes from './Drawer.module.scss';
import { useAnimationLibs } from 'shared/lib/components/AnimationsProvider';

interface DrawerProps {
  className?: string;
  isOpened: boolean;
  onClose: () => void;
  lazy?: boolean;
}
const height = window.innerHeight - 100;

export const DrawerContent = memo((props: PropsWithChildren<DrawerProps>) => {
  const { Spring, Gesture } = useAnimationLibs();
  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
  const { theme } = useTheme();
  const { className, children, onClose, isOpened } = props;

  const openDrawer = useCallback(() => {
    api.start({ y: 0, immediate: false });
  }, [api]);

  useEffect(() => {
    if (isOpened) {
      openDrawer();
    }
  }, [api, isOpened, openDrawer]);

  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...Spring.config.stiff, velocity },
      onResolve: onClose,
    });
  };

  const bind = Gesture.useDrag(
    ({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel }) => {
      if (my < -70) cancel();

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close();
        } else {
          openDrawer();
        }
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    },
  );

  console.log('is opened drawer', isOpened);

  if (!isOpened) {
    return null;
  }

  const display = y.to((py) => (py < height ? 'block' : 'none'));

  return (
    <Portal>
      <div className={classNames(classes.Drawer, {}, [className, theme, 'app_drawer'])}>
        <Overlay onClick={close} />
        <Spring.a.div className={classes.sheet} style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }} {...bind()}>
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
});

export const Drawer = memo((props: PropsWithChildren<DrawerProps>) => {
  const { isLoaded } = useAnimationLibs();
  if (!isLoaded) return null;
  return <DrawerContent {...props} />;
});
