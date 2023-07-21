import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Icon.module.scss';

interface IconProps {
  className?: string;
  inverted?: boolean;
  Svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = (props: IconProps) => {
  const { className, Svg, inverted } = props;

  return (
    <div className={classNames(classes.Icon, { [classes.inverted]: inverted }, [className])}>
      <Svg />
    </div>
  );
};
