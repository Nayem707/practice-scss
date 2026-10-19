import { DashSettingsShell } from '../../shared';
import styles from './AdminSettingsPage.module.scss';

export default function AdminSettingsPage() {
  return (
    <DashSettingsShell
      role="admin"
      className={styles.adminSettingsPage}
      description="Manage your admin profile and preferences."
    />
  );
}
