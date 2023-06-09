import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Button.module.scss';
import { PropsWithChildren } from 'react';

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
  CLEAR_INVERTED = 'clearInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { className, children, theme, size, square, ...otherProps } = props;
  const mods: Record<string, boolean> = {
    [classes.square]: square,
  };
  return (
    <button className={classNames(classes.Button, mods, [className, classes[theme], classes[size]])} {...otherProps}>
      {children}
    </button>
  );
};
