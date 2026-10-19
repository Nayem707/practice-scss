import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { RouteObject } from 'react-router-dom';
import { USER_ROLES } from '@/config/constants';
import type { UserRole } from '@/types';
import { DashIndexRedirect } from '../components/DashIndexRedirect';
import { DASH_ROUTES, ROUTES } from '../constants/paths';
import { ProtectedRoute } from '../guards/ProtectedRoute';
import { RoleProtectedRoute } from '../guards/RoleProtectedRoute';
import { renderLazyLayout } from '../utils/renderLazy';

const DashLayout = lazy(() => import('@/layouts/DashLayout'));

interface DashRolePages {
  Home: LazyExoticComponent<ComponentType>;
  Settings: LazyExoticComponent<ComponentType>;
}

const DASH_PAGES: Readonly<Record<UserRole, DashRolePages>> = {
  admin: {
    Home: lazy(() => import('@/pages/dash/admin/home')),
    Settings: lazy(() => import('@/pages/dash/admin/settings')),
  },
  seller: {
    Home: lazy(() => import('@/pages/dash/seller/home')),
    Settings: lazy(() => import('@/pages/dash/seller/settings')),
  },
  maintainer: {
    Home: lazy(() => import('@/pages/dash/maintainer/home')),
    Settings: lazy(() => import('@/pages/dash/maintainer/settings')),
  },
};

function createDashRoleRoute(role: UserRole): RouteObject {
  const { Home: RoleHome, Settings: RoleSettings } = DASH_PAGES[role];
  return {
    path: DASH_ROUTES[role].HOME,
    element: <RoleProtectedRoute allow={[role]} />,
    children: [
      { index: true, element: <RoleHome /> },
      { path: DASH_ROUTES[role].SETTINGS, element: <RoleSettings /> },
    ],
  };
}

/** Role dashboards: signed-in users only, each role limited to its own `/dash/<role>` area. */
export const dashRoutes: RouteObject = {
  path: ROUTES.DASH.ROOT,
  element: <ProtectedRoute>{renderLazyLayout(DashLayout)}</ProtectedRoute>,
  children: [
    { index: true, element: <DashIndexRedirect /> },
    ...USER_ROLES.map(createDashRoleRoute),
  ],
};
