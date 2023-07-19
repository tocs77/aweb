import { Fragment } from 'react';
import { Menu } from '@headlessui/react';

import { classNames } from 'shared/lib/classNames/classNames';

import classes from './Dropdown.module.scss';
import { DropDownDirection } from 'shared/types';
import { AppLink } from 'shared/ui/AppLink';

export interface DropdownItem {
  content: string;
  disabled?: boolean;
  hidden?: boolean;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  title: JSX.Element;
  direction?: DropDownDirection;
}

export const Dropdown = (props: DropdownProps) => {
  const { className, items, title, direction = 'bottom-left' } = props;
  return (
    <Menu as='div' className={classNames(classes.Dropdown, {}, [className])}>
      <Menu.Button className={classes.btn}>{title}</Menu.Button>
      <Menu.Items className={classNames(classes.menu, {}, [classes[direction]])}>
        {items.map((item) => {
          if (item.hidden) return null;
          const content = ({ active }: { active: boolean }) => (
            <li className={classNames(classes.item, { [classes.active]: active }, [])} onClick={item.onClick}>
              {item.content}
            </li>
          );
          return item.href ? (
            <Menu.Item as={AppLink} to={item.href} key={item.content} disabled={item.disabled}>
              {content}
            </Menu.Item>
          ) : (
            <Menu.Item as={Fragment} key={item.content} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
