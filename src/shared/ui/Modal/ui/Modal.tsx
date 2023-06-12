import { PropsWithChildren, useState, useRef, useEffect, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Modal.module.scss';
import { Portal } from 'shared/ui/Portal';
import { useTheme } from 'app/providers/ThemeProvider';

interface ModalProps {
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 250;
export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { className, children, isOpen, lazy, onClose } = props;
  const { theme } = useTheme();

  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isOpen) setIsMounted(true);
  }, [isOpen]);

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

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(classes.Modal, mods, [className, theme, 'app_modal'])}>
        <div className={classes.overlay} onClick={closeHandler}>
          <div className={classes.content} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
