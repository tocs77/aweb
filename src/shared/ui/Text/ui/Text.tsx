import { memo } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
}

export enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
}

const TextEl = (props: TextProps) => {
  const { className, text, title, theme = TextTheme.PRIMARY, align = TextAlign.LEFT } = props;

  const mods: Mods = {
    [classes.left]: align === TextAlign.LEFT,
    [classes.center]: align === TextAlign.CENTER,
    [classes.right]: align === TextAlign.RIGHT,
  };

  return (
    <div className={classNames(classes.Text, mods, [className, classes[theme]])}>
      {title && <p className={classes.title}>{title}</p>}
      {text && <p className={classes.text}>{text}</p>}
    </div>
  );
};

export const Text = memo(TextEl);
