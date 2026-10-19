import { DashSettingsShell } from '../../shared';
import styles from './MaintainerSettingsPage.module.scss';

export default function MaintainerSettingsPage() {
  return (
    <DashSettingsShell
      role="maintainer"
      className={styles.maintainerSettingsPage}
      description="Manage your maintainer profile and preferences."
    />
  );
}
