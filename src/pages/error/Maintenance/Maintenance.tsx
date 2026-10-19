import { RefreshCw, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { APP_CONFIG } from '@/config/app';
import { ErrorPageTemplate } from '../components/ErrorPageTemplate';
import styles from './Maintenance.module.scss';

/** 503 — planned downtime or the service is temporarily unavailable. */
export default function Maintenance() {
  return (
    <ErrorPageTemplate
      className={styles.maintenance}
      code="503"
      icon={Wrench}
      title="We'll be back soon"
      message={
        <>
          {APP_CONFIG.name} is undergoing scheduled maintenance. Thanks for your patience — for
          urgent issues, email{' '}
          <a href={`mailto:${APP_CONFIG.supportEmail}`}>{APP_CONFIG.supportEmail}</a>.
        </>
      }
      actions={
        <Button leftIcon={<RefreshCw />} onClick={() => window.location.reload()}>
          Check again
        </Button>
      }
    />
  );
}
