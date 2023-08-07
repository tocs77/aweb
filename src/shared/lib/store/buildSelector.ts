/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';

type Selector<S, T, Args extends any[]> = (state: S, ...args: Args) => T;
type Hook<T, Args extends any[]> = (...args: Args) => T;
type Result<S, T, Args extends any[]> = [Hook<T, Args>, Selector<S, T, Args>];

export const buildSelector = <S, T, Args extends any[]>(selector: Selector<S, T, Args>): Result<S, T, Args> => {
  const useSelectorHook: Hook<T, Args> = (...args: Args) => {
    return useSelector((state: S) => selector(state, ...args));
  };
  return [useSelectorHook, selector];
};
