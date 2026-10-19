import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PageLoader } from '@/components/common/PageLoader';
import { MAIN_CONTENT_ID, SkipLink } from '@/components/common/SkipLink';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import styles from './PublicLayout.module.scss';

export default function PublicLayout() {
  return (
    <div className={styles.publicLayout}>
      <SkipLink />
      <Navbar />
      <main id={MAIN_CONTENT_ID} className={styles.publicLayout__main} tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
