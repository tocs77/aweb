/* eslint-disable i18next/no-literal-string */
import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from '../ui/Sidebar/Sidebar';
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';

describe('Sidebar', () => {
  test('should render', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });
  test('should toggle', () => {
    renderWithTranslation(<Sidebar />);
    const toggleBtn = screen.getByTestId('sidebar-toggle');
    fireEvent(toggleBtn, new MouseEvent('click', { bubbles: true }));
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    fireEvent(toggleBtn, new MouseEvent('click', { bubbles: true }));
    expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
  });
});
