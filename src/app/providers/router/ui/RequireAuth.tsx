import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export const RequireAuth = ({ children }: PropsWithChildren): JSX.Element => {
  const auth = useSelector(getAuthData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }
  return children as JSX.Element;
};
