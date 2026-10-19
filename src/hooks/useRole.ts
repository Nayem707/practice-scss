import type { UserRole } from '@/types';
import { useAuth } from './useAuth';

/** The signed-in user's role, or `null` for guests. */
export function useRole(): UserRole | null {
  const { user } = useAuth();
  return user?.role ?? null;
}
