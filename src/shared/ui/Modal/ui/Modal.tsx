import { PropsWithChildren, useState, useRef, useEffect, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Modal.module.scss';
import { Portal } from 'shared/ui/Portal';

interface ModalProps {
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 250;
export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { className, children, isOpen, onClose } = props;

  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const mods: Record<string, boolean> = {
    [classes.opened]: isOpen,
    [classes.isClosing]: isClosing,
  };

  const closeHandler = useCallback(() => {
    setIsClosing(true);
    timerRef.current = setTimeout(() => {
      onClose?.();
      setIsClosing(false);
    }, ANIMATION_DELAY);
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
      return;
    }
    window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onKeyDown]);

  return (
    <Portal>
      <div className={classNames(classes.Modal, mods, [className])}>
        <div className={classes.overlay} onClick={closeHandler}>
          <div className={classes.content} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
