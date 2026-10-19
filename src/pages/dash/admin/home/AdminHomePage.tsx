import { DashHomePageShell } from '../../shared';
import styles from './AdminHomePage.module.scss';

export default function AdminHomePage() {
  return (
    <DashHomePageShell
      role="admin"
      className={styles.adminHomePage}
      description="Platform-wide revenue, users and support load at a glance."
    />
  );
}
