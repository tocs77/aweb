import { classNames } from 'shared/lib/classNames/classNames';

import classes from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick: () => void;
}

export const Overlay = (props: OverlayProps) => {
  const { className, onClick } = props;

  return <div className={classNames(classes.Overlay, {}, [className])} onClick={onClick} />;
};
