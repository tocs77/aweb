import { PropsWithChildren, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserRole, getAuthData, getUserRoles } from '@/entities/User';
import { RoutePath } from '@/shared/consts/router';

interface RequireAuthProps {
  roles?: UserRole[];
}

export const RequireAuth = ({ children, roles }: PropsWithChildren<RequireAuthProps>): JSX.Element => {
  const auth = useSelector(getAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasRequiredRoles = useMemo(() => {
    if (!roles) return true;
    if (!userRoles) return false;
    return roles.some((role) => userRoles.includes(role));
  }, [roles, userRoles]);

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }
  if (!hasRequiredRoles) {
    return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
  }
  return children as JSX.Element;
};
