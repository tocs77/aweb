import { Popover as HPopover } from '@headlessui/react';

import { classNames } from '@/shared/lib/classNames/classNames';

import { DropDownDirection } from '@/shared/types';

import { PropsWithChildren } from 'react';
import classes from './Popover.module.scss';
import popupCls from '../../styles/popup.module.scss';

interface PopoverProps {
  className?: string;
  direction?: DropDownDirection;
  label: JSX.Element | string;
}

export const Popover = (props: PropsWithChildren<PopoverProps>) => {
  const { className, children, direction = 'bottom-left', label } = props;

  return (
    <HPopover as='div' className={classNames(popupCls.popup, {}, [className])}>
      <HPopover.Button className={popupCls.btn}>{label}</HPopover.Button>

      <HPopover.Panel className={classNames(classes.panel, {}, [popupCls[direction]])}> {children}</HPopover.Panel>
    </HPopover>
  );
};
