import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import classes from './Button.module.scss';
import { PropsWithChildren, ReactElement } from 'react';

export type ButtonVariant = 'clear' | 'outline' | 'outline_warning' | 'background' | 'backgroundInverted' | 'clearInverted';
export type ButtonColor = 'normal' | 'success' | 'error';
export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  addonLeft?: ReactElement;
  addonRight?: ReactElement;
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
  const {
    className,
    children,
    variant = 'outline',
    size = 'm',
    color = 'normal',
    square,
    disabled,
    addonLeft,
    addonRight,
    ...otherProps
  } = props;
  const mods: Mods = {
    [classes.square]: square,
    [classes.disabled]: disabled,
    [classes.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
  };
  return (
    <button
      className={classNames(classes.Button, mods, [className, classes[variant], classes[size], classes[color]])}
      {...otherProps}
      disabled={disabled}>
      {addonLeft && <div className={classes.addonLeft}>{addonLeft}</div>}
      {children}
      {addonRight && <div className={classes.addonRight}>{addonRight}</div>}
    </button>
  );
};
