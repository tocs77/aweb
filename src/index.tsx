import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
import { App } from './App';

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
