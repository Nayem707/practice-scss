import type { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/routes/constants/paths';
import { getErrorMessage, reportError } from '@/utils';
import { ErrorState } from '../ErrorState';
import styles from './ErrorBoundary.module.scss';

function AppErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className={styles.errorBoundary}>
      <ErrorState
        fullScreen
        title="Something went wrong"
        message={getErrorMessage(error)}
        actions={
          <>
            <Button onClick={resetErrorBoundary}>Try again</Button>
            <Button variant="secondary" onClick={() => window.location.assign(ROUTES.PUBLIC.HOME)}>
              Go to homepage
            </Button>
          </>
        }
      />
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

/**
 * App-level boundary. Wraps `react-error-boundary` so the codebase stays free
 * of class components (React still requires a class internally for boundaries).
 */
export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={AppErrorFallback}
      onError={(error, info) => reportError(error, { componentStack: info.componentStack })}
    >
      {children}
    </ReactErrorBoundary>
  );
}
