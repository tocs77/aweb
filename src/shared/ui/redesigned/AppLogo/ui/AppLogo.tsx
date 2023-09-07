import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './AppLogo.module.scss';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { HStack } from '../../../deprecated/Stack';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = (props: AppLogoProps) => {
  const { className, size = 50 } = props;
  return (
    <HStack max justify='center' className={classNames(classes.AppLogo, {}, [className])}>
      <AppSvg className={classes.logo} width={size} height={size} fill='black' />
      <div className={classes.gradientBig} />
      <div className={classes.gradientSmall} />
    </HStack>
  );
};
