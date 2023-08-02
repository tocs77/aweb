import { screen } from '@testing-library/react';

import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { getRouteAbout, getRouteAdminPanel, getRouteProfile } from '@/shared/consts/router';

import { AppRouter } from './AppRouter';

describe('app/AppRouter', () => {
  it('should render page', async () => {
    componentRender(<AppRouter />, { route: getRouteAbout() });

    const page = await screen.findByTestId('about-page');
    expect(page).toBeInTheDocument();
  });

  test('not found page', async () => {
    componentRender(<AppRouter />, { route: '/djdkdkdj' });

    const page = await screen.findByTestId('not-found-page');
    expect(page).toBeInTheDocument();
  });

  test('unathorized user redirect', async () => {
    componentRender(<AppRouter />, { route: getRouteProfile('1') });

    const page = await screen.findByTestId('main-page');
    expect(page).toBeInTheDocument();
  });

  test('athorized user acces page', async () => {
    componentRender(<AppRouter />, { route: getRouteProfile('1'), initialState: { user: { authData: { id: '1' } } } });

    const page = await screen.findByTestId('profile-page');
    expect(page).toBeInTheDocument();
  });

  test('access forbidden no role', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: { user: { authData: { id: '1', roles: ['USER'] } } },
    });

    const page = await screen.findByTestId('forbidden-page');
    expect(page).toBeInTheDocument();
  });

  test('access allowed has role', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: { user: { authData: { id: '1', roles: ['ADMIN'] } } },
    });

    const page = await screen.findByTestId('admin-panel-page');
    expect(page).toBeInTheDocument();
  });
});
