import { MutableRefObject, PropsWithChildren, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Page.module.scss';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';

interface PageProps {
  className?: string;
  onScrollEnd?: () => void;
}

export const Page = (props: PropsWithChildren<PageProps>) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

  return (
    <section className={classNames(classes.Page, {}, [className])} ref={wrapperRef}>
      {children}
      <div ref={triggerRef} id='anchor' style={{ height: '20px' }} />
    </section>
  );
};
