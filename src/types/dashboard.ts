import type { UserRole } from './auth';

export type DashStatId =
  | 'revenue'
  | 'activeUsers'
  | 'orders'
  | 'openTickets'
  | 'listings'
  | 'pendingPayouts'
  | 'incidents'
  | 'deployments';

export interface StatMetric {
  value: number;
  /** Month-over-month change; negative means the value went down. */
  changePercent: number;
}

/** Which metric a role sees, and how it is labelled for that role. */
export interface DashStatConfig {
  id: DashStatId;
  label: string;
}

export type DashboardStat = DashStatConfig & StatMetric;

export type ActivityStatus = 'completed' | 'pending' | 'failed';

export interface ActivityItem {
  id: string;
  title: string;
  occurredAt: string;
  status: ActivityStatus;
}

export interface DashboardData {
  role: UserRole;
  /** A real API may omit metrics the caller isn't entitled to. */
  metrics: Partial<Record<DashStatId, StatMetric>>;
  activity: ActivityItem[];
}
