/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react';

export const useDebounce = (callback: (...args: any[]) => void, delay = 500) => {
  const timer = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
      return () => {
        if (timer.current) clearTimeout(timer.current);
      };
    },
    [callback, delay],
  );
};
