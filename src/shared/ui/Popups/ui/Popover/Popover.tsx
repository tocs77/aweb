import { Popover as HPopover } from '@headlessui/react';

import { classNames } from 'shared/lib/classNames/classNames';

import { DropDownDirection } from 'shared/types';

import { PropsWithChildren } from 'react';
import classes from './Popover.module.scss';
import popupCls from '../../styles/popup.module.scss';

interface PopoverProps {
  className?: string;
  direction?: DropDownDirection;
  label: string;
}

export const Popover = (props: PropsWithChildren<PopoverProps>) => {
  const { className, children, direction = 'bottom-right', label } = props;

  return (
    <HPopover as='div' className={classNames(popupCls.popup, {}, [className])}>
      <HPopover.Button>{label}</HPopover.Button>
      {children}
      <HPopover.Panel className={classNames(classes.options, {}, [popupCls[direction]])}></HPopover.Panel>
    </HPopover>
  );
};

// <HStack gap='4'>
// {label && <span className={classes.label}>{label}</span>}{' '}
// <HPopover
//   as='div'
//   className={classNames(popupCls.popup, {}, [className])}
//   onChange={onChange}
//   value={value}
//   disabled={readonly}>
//   <HPopover.Button as='div' className={classes.trigger}>
//     <Button disabled={readonly}>{(value as string) ?? defaultValue}</Button>
//   </HPopover.Button>
//   <HPopover.Options className={classNames(classes.options, {}, [popupCls[direction]])}>{optionsList}</HPopover.Options>
// </HPopover>
// </HStack>
