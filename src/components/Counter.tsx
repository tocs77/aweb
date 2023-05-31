import { useState } from 'react';

import './Counter.scss';
export const Couner = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h2>{counter}</h2>
      <button onClick={() => setCounter(counter + 1)}>Increase</button>
    </div>
  );
};
