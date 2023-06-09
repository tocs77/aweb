export const COUNTER_SLICE_NAME = 'counter' as const;
export interface CounterSchema {
  value: number;
}

export interface StoreWithCounter {
  [COUNTER_SLICE_NAME]: CounterSchema;
}
