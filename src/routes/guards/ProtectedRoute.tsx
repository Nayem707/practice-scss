import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { REDIRECT_PARAM, ROUTES } from '../constants/paths';

interface ProtectedRouteProps {
  children: ReactNode;
}

/** Renders children only for authenticated users. For role checks use `RoleProtectedRoute`. */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const { pathname, search, hash } = useLocation();

  if (!user) {
    const params = new URLSearchParams({ [REDIRECT_PARAM]: `${pathname}${search}${hash}` });
    return <Navigate to={`${ROUTES.AUTH.LOGIN}?${params.toString()}`} replace />;
  }

  return children;
}
