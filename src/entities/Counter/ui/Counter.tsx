import { Button, ButtonTheme } from 'shared/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue.test';

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
      <h1>{value}</h1>
      <Button theme={ButtonTheme.OUTLINE} onClick={incrementHandler}>
        +
      </Button>
      <Button theme={ButtonTheme.OUTLINE} onClick={decrementHandler}>
        -
      </Button>
    </div>
  );
};
