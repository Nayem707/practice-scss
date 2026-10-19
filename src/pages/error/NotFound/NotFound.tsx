import { ArrowLeft, Home, SearchX } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ROUTES } from '@/routes/constants/paths';
import { ErrorPageTemplate } from '../components/ErrorPageTemplate';
import styles from './NotFound.module.scss';

/** React Router's key for the first history entry (nothing to go back to). */
const INITIAL_LOCATION_KEY = 'default';

export default function NotFound() {
  const navigate = useNavigate();
  const { key } = useLocation();
  const canGoBack = key !== INITIAL_LOCATION_KEY;

  return (
    <ErrorPageTemplate
      className={styles.notFound}
      code="404"
      icon={SearchX}
      title="Page not found"
      message="The page you're looking for doesn't exist or has been moved."
      actions={
        <>
          <ButtonLink to={ROUTES.PUBLIC.HOME} leftIcon={<Home />}>
            Back to homepage
          </ButtonLink>
          {canGoBack && (
            <Button variant="secondary" leftIcon={<ArrowLeft />} onClick={() => navigate(-1)}>
              Go back
            </Button>
          )}
        </>
      }
    />
  );
}
