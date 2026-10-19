import { useEffect } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { HTTP_STATUS } from '@/config/constants';
import { ENV } from '@/config/env';
import Forbidden from '@/pages/error/Forbidden';
import Maintenance from '@/pages/error/Maintenance';
import NotFound from '@/pages/error/NotFound';
import ServerError from '@/pages/error/ServerError';
import { getErrorMessage, reportError } from '@/utils';

/**
 * Router `errorElement`: maps thrown responses (e.g. `throw new Response(null, { status: 403 })`
 * from a loader) to the matching error page; everything else is a 500. Error pages are imported
 * eagerly so this still works when a lazy chunk fails to load.
 */
export function RouteErrorBoundary() {
  const error = useRouteError();

  useEffect(() => {
    reportError(error, { source: 'router' });
  }, [error]);

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case HTTP_STATUS.NOT_FOUND:
        return <NotFound />;
      case HTTP_STATUS.UNAUTHORIZED:
      case HTTP_STATUS.FORBIDDEN:
        return <Forbidden />;
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        return <Maintenance />;
    }
  }

  return <ServerError details={ENV.isDev ? getErrorMessage(error) : undefined} />;
}
