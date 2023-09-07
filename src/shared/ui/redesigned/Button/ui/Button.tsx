import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import classes from './Button.module.scss';
import { PropsWithChildren } from 'react';

export type ButtonVariant = 'clear' | 'outline' | 'outline_warning' | 'background' | 'backgroundInverted' | 'clearInverted';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { className, children, variant = 'outline', size = 'm', square, disabled, ...otherProps } = props;
  const mods: Mods = {
    [classes.square]: square,
    [classes.disabled]: disabled,
  };
  return (
    <button
      className={classNames(classes.Button, mods, [className, classes[variant], classes[size]])}
      {...otherProps}
      disabled={disabled}>
      {children}
    </button>
  );
};
