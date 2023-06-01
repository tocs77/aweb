import { Route, Routes } from 'react-router-dom';
import { AboutPageAsync } from './components/pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './components/pages/MainPage/MainPageAsync';
import './index.scss';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';
export const App = () => {
  return (
    <div className='app'>
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
