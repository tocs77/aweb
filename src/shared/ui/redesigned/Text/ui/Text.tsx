import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'left' | 'center' | 'right';

export type TextSize = 'm' | 'l' | 'xl';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;
  'data-testid'?: string;
}

const mapSizeToHeaderTag: Record<TextSize, 'h1' | 'h2' | 'h3'> = {
  m: 'h3',
  l: 'h2',
  xl: 'h1',
};

const TextEl = (props: TextProps) => {
  const {
    className,
    text,
    title,
    variant = 'primary',
    bold,
    align = 'left',
    size = 'm',
    'data-testid': dataTestId = 'text',
  } = props;
  const HeaderTag = mapSizeToHeaderTag[size];

  return (
    <div
      className={classNames(classes.Text, { [classes.bold]: bold }, [className, classes[variant], classes[size], classes[align]])}
      data-testid={dataTestId}>
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

export const Text = memo(TextEl);
