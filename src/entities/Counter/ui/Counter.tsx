import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useCounterActions } from '../model/slice/counterSlice';
import { useGetCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
  const value = useGetCounterValue();
  const { decrement, increment } = useCounterActions();

  const incrementHandler = () => {
    increment();
  };
  const decrementHandler = () => {
    decrement();
  };
  return (
    <div>
      <h1 data-testid='value-title'>{value}</h1>
      <Button theme={ButtonTheme.OUTLINE} onClick={incrementHandler} data-testid='increment-btn'>
        +
      </Button>
      <Button theme={ButtonTheme.OUTLINE} onClick={decrementHandler} data-testid='decrement-btn'>
        -
      </Button>
    </div>
  );
};
