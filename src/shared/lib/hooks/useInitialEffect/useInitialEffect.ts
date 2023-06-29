import { useEffect } from 'react';
export const useInitialEffect = (callback: () => void) => {
  useEffect(() => {
    if (__PROJECT__ === 'storybook') return;
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
