import type { RouteObject } from 'react-router-dom';
import { RouteErrorBoundary } from '../components/RouteErrorBoundary';
import { authRoutes } from './auth.routes';
import { dashRoutes } from './dash.routes';
import { errorRoutes } from './error.routes';
import { publicRoutes } from './public.routes';

/** The full route tree. A pathless root route gives every group the same error boundary. */
export const routes: RouteObject[] = [
  {
    errorElement: <RouteErrorBoundary />,
    children: [publicRoutes, authRoutes, dashRoutes, ...errorRoutes],
  },
];
