import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  inverted?: boolean;
  Svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = (props: IconProps) => {
  const { className, Svg, inverted, ...other } = props;

  return <Svg className={classNames(classes.Icon, { [classes.inverted]: inverted }, [className])} {...other} />;
};
