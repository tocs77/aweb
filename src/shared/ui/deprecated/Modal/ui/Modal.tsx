import { PropsWithChildren } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import classes from './Modal.module.scss';
import { Portal } from '@/shared/ui/deprecated/Portal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Overlay } from '@/shared/ui/deprecated/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

interface ModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 250;

/**
 * @deprecated component deprecated
 */

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { className, children, isOpen, lazy, onClose } = props;
  const { theme } = useTheme();
  const { close, isClosing, isMounted } = useModal({ isOpened: isOpen, onClose, animationDelay: ANIMATION_DELAY });

  const mods: Mods = {
    [classes.opened]: isOpen,
    [classes.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(classes.Modal, mods, [className, theme, 'app_modal'])}>
        <Overlay onClick={close} />
        <div className={classes.content}>{children}</div>
      </div>
    </Portal>
  );
};
