import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
import { Couner } from './components/Counter';

root.render(
  <h1>
    <Couner />
  </h1>,
);
