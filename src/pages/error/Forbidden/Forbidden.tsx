import { Home, LayoutDashboard, LogIn, ShieldAlert } from 'lucide-react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { useAuth } from '@/hooks/useAuth';
import { DEFAULT_AUTHENTICATED_ROUTE, ROUTES } from '@/routes/constants/paths';
import { ErrorPageTemplate } from '../components/ErrorPageTemplate';
import styles from './Forbidden.module.scss';

/** 403 — the user is known but lacks permission (see RoleProtectedRoute). */
export default function Forbidden() {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorPageTemplate
      className={styles.forbidden}
      code="403"
      icon={ShieldAlert}
      title="Access denied"
      message={
        isAuthenticated
          ? "Your account doesn't have permission to view this page. Contact an administrator if you think this is a mistake."
          : 'You need to sign in with an account that has access to this page.'
      }
      actions={
        <>
          {isAuthenticated ? (
            <ButtonLink to={DEFAULT_AUTHENTICATED_ROUTE} leftIcon={<LayoutDashboard />}>
              Go to dashboard
            </ButtonLink>
          ) : (
            <ButtonLink to={ROUTES.AUTH.LOGIN} leftIcon={<LogIn />}>
              Log in
            </ButtonLink>
          )}
          <ButtonLink to={ROUTES.PUBLIC.HOME} variant="secondary" leftIcon={<Home />}>
            Homepage
          </ButtonLink>
        </>
      }
    />
  );
}
