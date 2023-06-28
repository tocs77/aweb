import { CSSProperties, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src: string;
  size?: number;
  alt?: string;
}

export const Avatar = (props: AvatarProps) => {
  const { className, src, size = 30, alt } = props;
  const styles = useMemo<CSSProperties>(() => {
    return {
      width: `${size}px`,
      height: `${size}px`,
    };
  }, [size]);
  return <img src={src} alt={alt || 'avatar'} style={styles} className={classNames(classes.Avatar, {}, [className])}></img>;
};
