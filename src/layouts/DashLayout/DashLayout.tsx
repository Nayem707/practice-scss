import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PageLoader } from '@/components/common/PageLoader';
import { MAIN_CONTENT_ID, SkipLink } from '@/components/common/SkipLink';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { MEDIA_QUERIES } from '@/config/constants';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useToggle } from '@/hooks/useToggle';
import styles from './DashLayout.module.scss';

/** Shared shell for every role dashboard: role-aware sidebar, topbar, and page outlet. */
export default function DashLayout() {
  const isDesktop = useMediaQuery(MEDIA_QUERIES.DESKTOP);
  const [isSidebarOpen, sidebar] = useToggle(false);

  return (
    <div className={styles.dashLayout}>
      <SkipLink />
      <Sidebar isDrawer={!isDesktop} isOpen={isSidebarOpen} onClose={sidebar.setOff} />
      <div className={styles.dashLayout__content}>
        <Topbar
          showMenuButton={!isDesktop}
          isSidebarOpen={isSidebarOpen}
          onMenuClick={sidebar.setOn}
        />
        <main id={MAIN_CONTENT_ID} className={styles.dashLayout__main} tabIndex={-1}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
