import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AboutPageAsync } from './components/pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './components/pages/MainPage/MainPageAsync';
import './styles/index.scss';
import { Link } from 'react-router-dom';
import { useTheme } from './theme/useTheme';

export const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>Toggle theme</button>
      <Link to={'/'}>Main</Link>
      <Link to={'/about'}>About site</Link>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path={'/about'} element={<AboutPageAsync />} />
          <Route path={'/'} element={<MainPageAsync />} />
        </Routes>
      </Suspense>
    </div>
  );
};
