import { DashHomePageShell } from '../../shared';
import styles from './SellerHomePage.module.scss';

export default function SellerHomePage() {
  return (
    <DashHomePageShell
      role="seller"
      className={styles.sellerHomePage}
      description="Sales, orders and payouts for your store."
    />
  );
}
