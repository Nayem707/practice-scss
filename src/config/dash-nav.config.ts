import { LayoutDashboard, Settings } from 'lucide-react';
import { DASH_ROUTES, ROUTES } from '@/routes/constants/paths';
import type { SidebarItem, UserRole } from '@/types';
import { ROLE_LABELS, USER_ROLES } from './constants';

/** Sidebar items per role. Add an item here after registering its route in the router. */
export const DASH_NAV_CONFIG: Readonly<Record<UserRole, readonly SidebarItem[]>> = {
  admin: [
    { label: 'Overview', to: DASH_ROUTES.admin.HOME, icon: LayoutDashboard },
    { label: 'Settings', to: DASH_ROUTES.admin.SETTINGS, icon: Settings },
  ],
  seller: [
    { label: 'Store overview', to: DASH_ROUTES.seller.HOME, icon: LayoutDashboard },
    { label: 'Settings', to: DASH_ROUTES.seller.SETTINGS, icon: Settings },
  ],
  maintainer: [
    { label: 'System overview', to: DASH_ROUTES.maintainer.HOME, icon: LayoutDashboard },
    { label: 'Settings', to: DASH_ROUTES.maintainer.SETTINGS, icon: Settings },
  ],
};

/** Breadcrumb labels for every dashboard path, keyed by full path. */
export const DASH_BREADCRUMB_LABELS: Readonly<Record<string, string>> = Object.fromEntries([
  [ROUTES.DASH.ROOT, 'Dashboard'],
  ...USER_ROLES.flatMap((role) => [
    [DASH_ROUTES[role].HOME, ROLE_LABELS[role]],
    [DASH_ROUTES[role].SETTINGS, 'Settings'],
  ]),
]);
