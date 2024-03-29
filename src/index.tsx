import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './app/styles/index.scss';
import { App } from '@/app/App';
import { ThemeProvider } from '@/app/providers/ThemeProvider/ui/ThemeProvider';
import '@/shared/config/i18n/i18n';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ForceUpdateProvider } from './shared/lib/render/forceUpdate';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <StoreProvider>
        <ForceUpdateProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ForceUpdateProvider>
      </StoreProvider>
    </ErrorBoundary>
  </BrowserRouter>,
);
