import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18n from 'shared/config/i18n/i18nForTest';

export interface ComponentRenderOptions {
  route?: string;
}
export function componentRender(component: JSX.Element, options?: ComponentRenderOptions) {
  const route = options?.route ?? '/';
  return render(
    <MemoryRouter initialEntries={[route]}>
      <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
    </MemoryRouter>,
  );
}
