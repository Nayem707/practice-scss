import { USER_ROLES } from '@/config/constants';
import type { UserRole } from '@/types';
import { getSafeRedirect } from '@/utils/redirect';
import { DASH_ROUTES, DEFAULT_AUTHENTICATED_ROUTE } from '../constants/paths';

/** False when `path` is inside another role's dashboard (e.g. a seller and `/dash/admin/...`). */
export function canRoleAccessPath(path: string, role: UserRole): boolean {
  const [pathname = ''] = path.split(/[?#]/);
  return USER_ROLES.every((other) => {
    if (other === role) return true;
    const base = DASH_ROUTES[other].HOME;
    return pathname !== base && !pathname.startsWith(`${base}/`);
  });
}

/**
 * Where to send a user right after login/sign-up. The `?redirect=` target may belong
 * to a different account (e.g. left over from the previous user's logout), so targets
 * the role can't access fall back to the user's own dashboard instead of a 403.
 */
export function getPostAuthRedirect(target: string | null, role: UserRole): string {
  const destination = getSafeRedirect(target, DEFAULT_AUTHENTICATED_ROUTE);
  return canRoleAccessPath(destination, role) ? destination : DEFAULT_AUTHENTICATED_ROUTE;
}
