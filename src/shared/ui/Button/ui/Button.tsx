import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Button.module.scss';
import { PropsWithChildren } from 'react';

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
  CLEAR_INVERTED = 'clearInverted',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { className, children, theme, ...otherProps } = props;
  return (
    <button className={classNames(classes.Button, {}, [className, classes[theme]])} {...otherProps}>
      {children}
    </button>
  );
};
