import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import { AppRouteByPathPattern, AppRoutes } from '@/shared/consts/router';

export const useRouteChange = () => {
  const location = useLocation();
  const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

  useEffect(() => {
    for (const [pattern, route] of Object.entries(AppRouteByPathPattern)) {
      if (matchPath(pattern, location.pathname)) {
        setAppRoute(route);
        return;
      }
    }
  }, [location.pathname]);
  return appRoute;
};
