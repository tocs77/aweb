/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react';

export const useThrottle = (callback: (...args: any[]) => void, delay = 500) => {
  const throttlingLockedRef = useRef(false);

  return useCallback(
    (...args: any[]) => {
      if (!throttlingLockedRef.current) {
        callback(...args);
        throttlingLockedRef.current = true;

        setTimeout(() => {
          throttlingLockedRef.current = false;
        }, delay);
      }
    },
    [callback, delay],
  );
};
