import { getCounter } from './getCounter';
import { StoreWithCounter } from '../../types/counterSchema';

describe('getCounter', () => {
  it('should return counter value', () => {
    const state: StoreWithCounter = {
      counter: {
        value: 10,
      },
    };
    expect(getCounter(state)).toEqual({ value: 10 });
  });
});
