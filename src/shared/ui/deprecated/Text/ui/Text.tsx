import { memo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  ERROR = 'error',
}

export enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export enum TextSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
  'data-testid'?: string;
}

const mapSizeToHeaderTag: Record<TextSize, 'h1' | 'h2' | 'h3'> = {
  [TextSize.M]: 'h3',
  [TextSize.L]: 'h2',
  [TextSize.XL]: 'h1',
};

const TextEl = (props: TextProps) => {
  const {
    className,
    text,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
    'data-testid': dataTestId = 'text',
  } = props;
  const HeaderTag = mapSizeToHeaderTag[size];

  const mods: Mods = {
    [classes.left]: align === TextAlign.LEFT,
    [classes.center]: align === TextAlign.CENTER,
    [classes.right]: align === TextAlign.RIGHT,
  };

  return (
    <div className={classNames(classes.Text, mods, [className, classes[theme], classes[size]])} data-testid={dataTestId}>
      {title && (
        <HeaderTag className={classes.title} data-testid={`${dataTestId}-title`}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p className={classes.text} data-testid={`${dataTestId}-text`}>
          {text}
        </p>
      )}
    </div>
  );
};

/**
 * @deprecated component deprecated
 */

export const Text = memo(TextEl);
