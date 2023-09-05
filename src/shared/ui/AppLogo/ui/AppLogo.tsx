import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './AppLogo.module.scss';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { HStack } from '../../Stack';

interface AppLogoProps {
  className?: string;
}
export const AppLogo = (props: AppLogoProps) => {
  const { className } = props;
  return (
    <HStack max justify='center' className={classNames(classes.AppLogo, {}, [className])}>
      <AppSvg className={classes.logo} />
      <div className={classes.gradientBig} />
      <div className={classes.gradientSmall} />
    </HStack>
  );
};
