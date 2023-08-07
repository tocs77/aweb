// import { createSelector } from '@reduxjs/toolkit';
// import { getCounter } from '../getCounter/getCounter';
import { buildSelector } from '@/shared/lib/store';
import { StoreWithCounter } from '../../types/counterSchema';

//export const getCounterValue = createSelector(getCounter, (counter) => counter.value);

export const [useGetCounterValue, getCounterValue] = buildSelector<StoreWithCounter, number, [void]>(
  (state) => state.counter.value,
);
