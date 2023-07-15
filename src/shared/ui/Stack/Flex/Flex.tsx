import { PropsWithChildren } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Flex.module.scss';

type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
type FlexAlign = 'start' | 'center' | 'end';
type FlexDirection = 'row' | 'column';
type FlexGap = '4' | '8' | '16' | '32';

const jusifyClasses: Record<FlexJustify, string> = {
  start: classes.justifyStart,
  center: classes.justifyCenter,
  end: classes.justifyEnd,
  between: classes.justifyBetween,
  around: classes.justifyAround,
};

const alignClasses: Record<FlexAlign, string> = {
  start: classes.alignStart,
  center: classes.alignCenter,
  end: classes.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
  row: classes.directionRow,
  column: classes.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  '4': classes.gap4,
  '8': classes.gap8,
  '16': classes.gap16,
  '32': classes.gap32,
};

export type FlexProps = PropsWithChildren<{
  className?: string;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
}>;

export const Flex = (props: FlexProps) => {
  const { className, children, justify = 'start', align = 'center', direction = 'row', gap, max } = props;

  return (
    <div
      className={classNames(classes.Flex, { [classes.max]: max }, [
        className,
        jusifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
      ])}>
      {children}
    </div>
  );
};
