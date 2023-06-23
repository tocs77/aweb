import { Suspense, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getAuthData } from 'entities/User';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';

const AppRouterEl = () => {
  const isAuth = useSelector(getAuthData);

  const routes = useMemo(() => {
    return Object.values(routeConfig).filter((route) => isAuth || !route.authOnly);
  }, [isAuth]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={<div className='page-wrapper'>{element}</div>} />
        ))}
      </Routes>
    </Suspense>
  );
};

export const AppRouter = memo(AppRouterEl);
