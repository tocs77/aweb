import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRouteProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

const AppRouterEl = () => {
  const renderWithWrapper = useCallback(({ path, element, authOnly }: AppRouteProps) => {
    return <Route key={path} path={path} element={authOnly ? <RequireAuth>{element}</RequireAuth> : element} />;
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(routeConfig).map(renderWithWrapper)}
        {/* {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={<div className='page-wrapper'>{element}</div>} />
        ))} */}
      </Routes>
    </Suspense>
  );
};

export const AppRouter = memo(AppRouterEl);
