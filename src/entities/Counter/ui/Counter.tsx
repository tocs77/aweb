import { Button, ButtonTheme } from 'shared/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
  const dispatch = useDispatch();
  const value = useSelector(getCounterValue);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  const decrementHandler = () => {
    dispatch(counterActions.decrement());
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
