import { useCallback, type ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';
import { ErrorState } from '@/components/common/ErrorState';
import { PageHeader } from '@/components/common/PageHeader';
import { PageLoader } from '@/components/common/PageLoader';
import { Button } from '@/components/ui/Button';
import { ROLE_LABELS } from '@/config/constants';
import { DASH_STATS_CONFIG } from '@/config/dash-stats.config';
import { useAsync } from '@/hooks/useAsync';
import { useAuth } from '@/hooks/useAuth';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { dashboardService } from '@/services/dashboardService';
import type { DashboardData, DashboardStat, UserRole } from '@/types';
import { cn } from '@/utils/cn';
import { ActivityList } from './components/ActivityList';
import { StatsCard } from './StatsCard';
import styles from './DashHomePageShell.module.scss';

export interface DashHomePageShellProps {
  role: UserRole;
  description: string;
  /** Use it to set `--dash-accent` and any role-specific layout tweaks. */
  className?: string;
  /** Role-specific sections rendered below the stats and activity. */
  children?: ReactNode;
}

function selectStats(role: UserRole, data: DashboardData): DashboardStat[] {
  return DASH_STATS_CONFIG[role].flatMap((config) => {
    const metric = data.metrics[config.id];
    return metric ? [{ ...config, ...metric }] : [];
  });
}

/** Home page for any role: header, the role's configured stats, and recent activity. */
export function DashHomePageShell({
  role,
  description,
  className,
  children,
}: DashHomePageShellProps) {
  useDocumentTitle(`${ROLE_LABELS[role]} dashboard`);
  const { user } = useAuth();
  const fetchDashboard = useCallback(
    (signal: AbortSignal) => dashboardService.getDashboard(role, signal),
    [role],
  );
  const { state, retry } = useAsync(fetchDashboard);

  const refreshButton = (
    <Button
      variant="secondary"
      size="sm"
      leftIcon={<RefreshCw />}
      isLoading={state.status === 'loading'}
      onClick={retry}
    >
      Refresh
    </Button>
  );

  return (
    <div className={cn(styles.dashHomePageShell, className)}>
      <PageHeader
        title={`Welcome back${user ? `, ${user.name}` : ''}`}
        description={description}
        actions={refreshButton}
      />

      {state.status === 'loading' && <PageLoader label="Loading dashboard…" />}

      {state.status === 'error' && (
        <ErrorState
          headingLevel="h2"
          title="Couldn't load dashboard"
          message={state.error.message}
          actions={<Button onClick={retry}>Try again</Button>}
        />
      )}

      {state.status === 'success' && (
        <div className={styles.dashHomePageShell__content}>
          <ul className={styles.dashHomePageShell__stats} aria-label="Key metrics">
            {selectStats(role, state.data).map((stat) => (
              <li key={stat.id}>
                <StatsCard stat={stat} />
              </li>
            ))}
          </ul>
          <ActivityList items={state.data.activity} />
          {children}
        </div>
      )}
    </div>
  );
}
