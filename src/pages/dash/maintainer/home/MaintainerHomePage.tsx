import { DashHomePageShell } from '../../shared';
import styles from './MaintainerHomePage.module.scss';

export default function MaintainerHomePage() {
  return (
    <DashHomePageShell
      role="maintainer"
      className={styles.maintainerHomePage}
      description="System health, incidents and deployments."
    />
  );
}
