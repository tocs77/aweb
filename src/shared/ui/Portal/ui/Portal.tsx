import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  element?: HTMLElement;
}
export const Portal = (props: PropsWithChildren<PortalProps>) => {
  const { children } = props;
  let element: HTMLElement = props.element;
  if (!element) {
    element = document.getElementById('app');
    if (!element) {
      element = document.body;
    }
  }
  return createPortal(children, element);
};
