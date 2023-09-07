import { render, screen } from '@testing-library/react';
import { Button } from '../ui/Button';

describe('Button', () => {
  test('should render', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  test('should render with theme', () => {
    render(<Button variant='clear'>Test</Button>);
    expect(screen.getByText('Test')).toHaveClass('clear');
  });
});
