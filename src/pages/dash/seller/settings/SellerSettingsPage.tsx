import { DashSettingsShell } from '../../shared';
import styles from './SellerSettingsPage.module.scss';

export default function SellerSettingsPage() {
  return (
    <DashSettingsShell
      role="seller"
      className={styles.sellerSettingsPage}
      description="Manage your seller profile and preferences."
    />
  );
}
