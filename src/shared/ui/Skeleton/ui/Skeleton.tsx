import { memo, CSSProperties } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Skeletion.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

const SkeletonEl = (props: SkeletonProps) => {
  const { className, height, width, border } = props;
  const styles: CSSProperties = { width, height, borderRadius: border };
  return <div className={classNames(classes.Skeleton, {}, [className])} style={styles}></div>;
};

export const Skeleton = memo(SkeletonEl);
