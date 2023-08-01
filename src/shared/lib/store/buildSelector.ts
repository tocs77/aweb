import { useSelector } from 'react-redux';

type Selector<S, T> = (state: S) => T;
type Result<S, T> = [() => T, Selector<S, T>];

export const buildSelector = <S, T>(selector: Selector<S, T>): Result<S, T> => {
  const useSelectorHook = () => {
    return useSelector(selector);
  };
  return [useSelectorHook, selector];
};
