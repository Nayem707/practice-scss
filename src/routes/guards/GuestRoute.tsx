import type { ReactNode } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { REDIRECT_PARAM } from '../constants/paths';
import { getPostAuthRedirect } from '../utils/access';

interface GuestRouteProps {
  children: ReactNode;
}

/** Inverse of ProtectedRoute: keeps authenticated users out of /auth/* pages. */
export function GuestRoute({ children }: GuestRouteProps) {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  if (user) {
    return (
      <Navigate to={getPostAuthRedirect(searchParams.get(REDIRECT_PARAM), user.role)} replace />
    );
  }

  return children;
}
