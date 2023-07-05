import { MutableRefObject, PropsWithChildren, useRef } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { scrollKeepActions, getScrollByPath, StoreWithScrollKeep } from 'features/ScrollKeep';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';

import classes from './Page.module.scss';
import { useSelector } from 'react-redux';

interface PageProps {
  className?: string;
  onScrollEnd?: () => void;
  name?: string;
}

export const Page = (props: PropsWithChildren<PageProps>) => {
  const { className, children, onScrollEnd, name } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const scrollPos = useSelector((state: StoreWithScrollKeep) => getScrollByPath(state, name || ''));

  useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

  useInitialEffect(() => {
    if (!name) return;
    wrapperRef.current.scrollTop = scrollPos;
  });

  const onScroll = useThrottle((e: React.UIEvent<HTMLDivElement>) => {
    if (!name) return;
    dispatch(scrollKeepActions.setScrollPosition({ path: name, position: e.currentTarget.scrollTop }));
  }, 500);

  return (
    <section className={classNames(classes.Page, {}, [className])} ref={wrapperRef} onScroll={name ? onScroll : undefined}>
      {children}
      <div ref={triggerRef} id='anchor' style={{ height: '20px' }} />
    </section>
  );
};
