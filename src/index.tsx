import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './app/styles/index.scss';
const root = createRoot(document.getElementById('root'));
import { App } from 'app/App';
import { ThemeProvider } from 'app/providers/ThemeProvider/ui/ThemeProvider';
import 'shared/config/i18n/i18n';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { StoreProvider } from 'app/providers/StoreProvider';

root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <StoreProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StoreProvider>
    </ErrorBoundary>
  </BrowserRouter>,
);
