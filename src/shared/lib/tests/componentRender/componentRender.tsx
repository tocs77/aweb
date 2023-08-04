import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { StoreProvider, StateSchema } from '@/app/providers/StoreProvider';
import i18n from '@/shared/config/i18n/i18nForTest';
import { Theme } from '@/shared/consts/theme';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';

interface TestProviderProps {
  children: ReactNode;
  options?: ComponentRenderOptions;
}

export const TestProvider = (props: TestProviderProps) => {
  const { children, options = {} } = props;
  const { route = '/', theme = Theme.LIGHT, initialState, asyncReducers } = options;
  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState as StateSchema}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>{children}</div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
};

export interface ComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  theme?: Theme;
}
export function componentRender(component: JSX.Element, options?: ComponentRenderOptions) {
  return render(<TestProvider options={options}>{component}</TestProvider>);
}
