import type { UserRole } from '@/types';

/** Single source of truth for every route path in the app. */
export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
  },
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  DASH: {
    /** Redirects to the signed-in user's own role dashboard. */
    ROOT: '/dash',
  },
  ERROR: {
    FORBIDDEN: '/forbidden',
    SERVER_ERROR: '/server-error',
    MAINTENANCE: '/maintenance',
  },
  NOT_FOUND: '*',
} as const;

export interface DashRoleRoutes {
  HOME: string;
  SETTINGS: string;
}

/** Dashboard paths per role, e.g. `DASH_ROUTES[user.role].SETTINGS`. */
export const DASH_ROUTES = {
  admin: {
    HOME: '/dash/admin',
    SETTINGS: '/dash/admin/settings',
  },
  seller: {
    HOME: '/dash/seller',
    SETTINGS: '/dash/seller/settings',
  },
  maintainer: {
    HOME: '/dash/maintainer',
    SETTINGS: '/dash/maintainer/settings',
  },
} as const satisfies Record<UserRole, DashRoleRoutes>;

/** Query-string key used to return users to their original destination after login. */
export const REDIRECT_PARAM = 'redirect';

export const DEFAULT_AUTHENTICATED_ROUTE = ROUTES.DASH.ROOT;
