import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  clickable: true;
  onClick?: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = (props: IconProps) => {
  const { className, Svg, clickable, width = 32, height = 32, ...other } = props;
  const icon = (
    <Svg className={classNames(classes.Icon, {}, [className])} {...other} width={width} height={height} onClick={undefined} />
  );
  if (clickable) {
    return (
      <button onClick={props.onClick} type='button' className={classes.icon_wrapper} style={{ width, height }}>
        {icon}
      </button>
    );
  }

  return icon;
};
