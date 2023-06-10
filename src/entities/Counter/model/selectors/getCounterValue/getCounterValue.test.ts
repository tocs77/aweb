import { getCounterValue } from './getCounterValue';
import { StoreWithCounter } from '../../types/counterSchema';

describe('getCounter', () => {
  it('should return counter value', () => {
    const state: StoreWithCounter = {
      counter: {
        value: 10,
      },
    };
    expect(getCounterValue(state)).toEqual(10);
  });
});
