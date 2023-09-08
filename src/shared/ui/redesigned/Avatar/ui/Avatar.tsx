import { CSSProperties, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import UserIcon from '@/shared/assets/icons/user-filled.svg';
import classes from './Avatar.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

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

  const errorFallback = <Icon Svg={UserIcon} width={`${size}px`} height={`${size}px`} />;
  const fallback = <Skeleton border='50%' width={`${size}px`} height={`${size}px`} />;

  return (
    <AppImage
      src={src}
      alt={alt || 'avatar'}
      style={styles}
      className={classNames(classes.Avatar, {}, [className])}
      errorFallback={errorFallback}
      fallback={fallback}
    />
  );
};
