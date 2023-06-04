import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
import { App } from 'app/App';
import { ThemeProvider } from 'app/providers/ThemeProvider/ui/ThemeProvider';
import 'shared/config/i18n/i18n';

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
);
