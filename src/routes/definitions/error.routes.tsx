import type { RouteObject } from 'react-router-dom';
import Forbidden from '@/pages/error/Forbidden';
import Maintenance from '@/pages/error/Maintenance';
import NotFound from '@/pages/error/NotFound';
import ServerError from '@/pages/error/ServerError';
import { ROUTES } from '../constants/paths';

// Error pages are eager (not lazy): RouteErrorBoundary needs them when chunk loading fails.

/** Standalone error pages. The 404 catch-all must stay last. */
export const errorRoutes: RouteObject[] = [
  { path: ROUTES.ERROR.FORBIDDEN, element: <Forbidden /> },
  { path: ROUTES.ERROR.SERVER_ERROR, element: <ServerError /> },
  { path: ROUTES.ERROR.MAINTENANCE, element: <Maintenance /> },
  { path: ROUTES.NOT_FOUND, element: <NotFound /> },
];
