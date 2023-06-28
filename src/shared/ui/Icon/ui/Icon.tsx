import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Icon.module.scss';

interface IconProps {
  className?: string;
  Svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = (props: IconProps) => {
  const { className, Svg } = props;

  return (
    <div className={classNames(classes.Icon, {}, [className])}>
      <Svg />
    </div>
  );
};
