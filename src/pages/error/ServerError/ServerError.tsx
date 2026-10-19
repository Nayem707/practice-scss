import { Home, RefreshCw, ServerCrash } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { APP_CONFIG } from '@/config/app';
import { ROUTES } from '@/routes/constants/paths';
import { ErrorPageTemplate } from '../components/ErrorPageTemplate';
import styles from './ServerError.module.scss';

export interface ServerErrorProps {
  /** Technical details shown under the message; pass only in development. */
  details?: string;
}

/** 500 — unexpected failure. Also rendered by RouteErrorBoundary for uncaught route errors. */
export default function ServerError({ details }: ServerErrorProps) {
  return (
    <ErrorPageTemplate
      className={styles.serverError}
      code="500"
      icon={ServerCrash}
      title="Something went wrong"
      message={
        <>
          An unexpected error occurred on our end. Please try again, or contact{' '}
          <a href={`mailto:${APP_CONFIG.supportEmail}`}>{APP_CONFIG.supportEmail}</a> if the problem
          persists.
        </>
      }
      details={details}
      actions={
        <>
          <Button leftIcon={<RefreshCw />} onClick={() => window.location.reload()}>
            Try again
          </Button>
          <ButtonLink
            to={ROUTES.PUBLIC.HOME}
            variant="secondary"
            leftIcon={<Home />}
            reloadDocument
          >
            Homepage
          </ButtonLink>
        </>
      }
    />
  );
}
