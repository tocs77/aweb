import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollProps {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export const useInfiniteScroll = (props: UseInfiniteScrollProps) => {
  const { callback, triggerRef, wrapperRef } = props;

  useEffect(() => {
    if (!callback) return;
    const options: IntersectionObserverInit = {
      root: wrapperRef.current,
      rootMargin: '0px',
      threshold: 0.0,
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback();
    }, options);
    observer.observe(triggerRef.current);
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [callback, triggerRef, wrapperRef]);
};
