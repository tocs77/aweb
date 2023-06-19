import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
}

const TextEl = (props: TextProps) => {
  const { className, text, title, theme = TextTheme.PRIMARY } = props;
  return (
    <div className={classNames(classes.Text, {}, [className, classes[theme]])}>
      {title && <p className={classes.title}>{title}</p>}
      {text && <p className={classes.text}>{text}</p>}
    </div>
  );
};

export const Text = memo(TextEl);
