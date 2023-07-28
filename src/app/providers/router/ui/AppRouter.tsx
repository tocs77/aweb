import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@/app/providers/router/config/routeConfig';
import { AppRouteProps } from '@/shared/types';
import { RequireAuth } from './RequireAuth';
import { PageLoader } from '@/widgets/PageLoader';

const AppRouterEl = () => {
  const renderWithWrapper = useCallback(({ path, element, authOnly, roles }: AppRouteProps) => {
    return <Route key={path} path={path} element={authOnly ? <RequireAuth roles={roles}>{element}</RequireAuth> : element} />;
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
