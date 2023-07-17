import { Fragment, memo, useMemo } from 'react';
import { Listbox as HListBox } from '@headlessui/react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { HStack } from 'shared/ui/Stack';
import { DropDownDirection } from 'shared/types';

import classes from './ListBox.module.scss';

export interface ListBoxItem<T = string> {
  value: T;
  content: string;
  disabled?: boolean;
}

interface ListBoxProps<T = string> {
  className?: string;
  items: ListBoxItem[];
  value: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  direction?: DropDownDirection;
  label?: string;
}

export const ListBoxEl = <T,>(props: ListBoxProps<T>) => {
  const { className, items, value, defaultValue, onChange, readonly, direction = 'bottom-right', label } = props;

  const optionsList = useMemo(
    () =>
      items.map((option) => (
        <HListBox.Option key={option.value as string} value={option.value} as={Fragment} disabled={option.disabled}>
          {({ active, selected }) => (
            <li
              className={classNames(
                classes.item,
                { [classes.active]: active, [classes.selected]: selected, [classes.disabled]: option.disabled },
                [],
              )}>
              {option.content}
            </li>
          )}
        </HListBox.Option>
      )),
    [items],
  );

  return (
    <HStack gap='4'>
      {label && <span className={classes.label}>{label}</span>}{' '}
      <HListBox
        as='div'
        className={classNames(classes.ListBox, {}, [className])}
        onChange={onChange}
        value={value}
        disabled={readonly}>
        <HListBox.Button as='div' className={classes.trigger}>
          <Button disabled={readonly}>{(value as string) ?? defaultValue}</Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(classes.options, {}, [classes[direction]])}>{optionsList}</HListBox.Options>
      </HListBox>
    </HStack>
  );
};

export const ListBox = memo(ListBoxEl) as typeof ListBoxEl;
