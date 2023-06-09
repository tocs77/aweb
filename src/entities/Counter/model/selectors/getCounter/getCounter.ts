import { StoreWithCounter, COUNTER_SLICE_NAME } from '../../types/counterSchema';

export const getCounter = (state: StoreWithCounter) => state[COUNTER_SLICE_NAME];
