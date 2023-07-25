import { screen, fireEvent } from '@testing-library/react';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';
import { COUNTER_SLICE_NAME } from '../model/types/counterSchema';

describe('Counter', () => {
  test('should render', () => {
    componentRender(<Counter />, { initialState: { [COUNTER_SLICE_NAME]: { value: 10 } } });
    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
  });

  test('should increment', () => {
    componentRender(<Counter />, { initialState: { [COUNTER_SLICE_NAME]: { value: 10 } } });
    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
    const incBtn = screen.getByTestId('increment-btn');
    fireEvent.click(incBtn);
    expect(screen.getByTestId('value-title')).toHaveTextContent('11');
  });

  test('should decrement', () => {
    componentRender(<Counter />, { initialState: { [COUNTER_SLICE_NAME]: { value: 10 } } });
    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
    const decBtn = screen.getByTestId('decrement-btn');
    fireEvent.click(decBtn);

    expect(screen.getByTestId('value-title')).toHaveTextContent('9');
  });
});
