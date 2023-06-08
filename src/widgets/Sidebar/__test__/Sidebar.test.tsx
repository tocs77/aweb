import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from '../ui/Sidebar/Sidebar';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';

describe('Sidebar', () => {
  test('should render', () => {
    componentRender(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });
  test('should toggle', () => {
    componentRender(<Sidebar />);
    const toggleBtn = screen.getByTestId('sidebar-toggle');
    fireEvent(toggleBtn, new MouseEvent('click', { bubbles: true }));
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    fireEvent(toggleBtn, new MouseEvent('click', { bubbles: true }));
    expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
  });
});
