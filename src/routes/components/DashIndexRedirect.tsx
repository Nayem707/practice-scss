import { Navigate } from 'react-router-dom';
import { useRole } from '@/hooks/useRole';
import { DASH_ROUTES, ROUTES } from '../constants/paths';

/** `/dash` → the signed-in user's own role home. */
export function DashIndexRedirect() {
  const role = useRole();
  return <Navigate to={role ? DASH_ROUTES[role].HOME : ROUTES.AUTH.LOGIN} replace />;
}
