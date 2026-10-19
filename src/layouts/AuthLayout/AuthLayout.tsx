import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { PageLoader } from '@/components/common/PageLoader';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { APP_CONFIG } from '@/config/app';
import styles from './AuthLayout.module.scss';

export default function AuthLayout() {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authLayout__themeToggle}>
        <ThemeToggle />
      </div>
      <main className={styles.authLayout__main}>
        <div className={styles.authLayout__brand}>
          <Logo />
          <p className={styles.authLayout__tagline}>{APP_CONFIG.tagline}</p>
        </div>
        <div className={styles.authLayout__card}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
