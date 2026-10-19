import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRole } from '@/hooks/useRole';
import type { UserRole } from '@/types';
import { ROUTES } from '../constants/paths';
import { ProtectedRoute } from './ProtectedRoute';

interface RoleProtectedRouteProps {
  allow: readonly UserRole[];
  /** Defaults to `<Outlet />`, so it can be used directly as a layout route element. */
  children?: ReactNode;
}

/**
 * Guests are sent to login (via `ProtectedRoute`); signed-in users whose role
 * isn't in `allow` are sent to the 403 page.
 */
export function RoleProtectedRoute({ allow, children }: RoleProtectedRouteProps) {
  const role = useRole();
  const isForbidden = role !== null && !allow.includes(role);

  return (
    <ProtectedRoute>
      {isForbidden ? <Navigate to={ROUTES.ERROR.FORBIDDEN} replace /> : (children ?? <Outlet />)}
    </ProtectedRoute>
  );
}
