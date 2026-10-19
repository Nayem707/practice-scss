import { MOCK_LATENCY_MS } from '@/config/constants';
import type { ActivityItem, DashboardData, DashStatId, StatMetric, UserRole } from '@/types';
import { delay } from '@/utils';

const MINUTE_MS = 60_000;

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * MINUTE_MS).toISOString();
}

const MOCK_METRICS: Readonly<Record<DashStatId, StatMetric>> = {
  revenue: { value: 48_250, changePercent: 12.4 },
  activeUsers: { value: 3_412, changePercent: 4.1 },
  orders: { value: 1_284, changePercent: -2.3 },
  openTickets: { value: 37, changePercent: -8.7 },
  listings: { value: 126, changePercent: 6.5 },
  pendingPayouts: { value: 7_940, changePercent: 3.2 },
  incidents: { value: 2, changePercent: -50 },
  deployments: { value: 64, changePercent: 18.5 },
};

type MockActivity = Omit<ActivityItem, 'occurredAt'> & { minutesAgo: number };

const MOCK_ACTIVITY: Readonly<Record<UserRole, readonly MockActivity[]>> = {
  admin: [
    { id: 'a1', title: 'Invoice #1042 paid', minutesAgo: 5, status: 'completed' },
    { id: 'a2', title: 'New seller application', minutesAgo: 42, status: 'pending' },
    { id: 'a3', title: 'Nightly export job', minutesAgo: 180, status: 'failed' },
    { id: 'a4', title: 'Plan upgraded to Pro', minutesAgo: 600, status: 'completed' },
  ],
  seller: [
    { id: 's1', title: 'Order #5531 shipped', minutesAgo: 12, status: 'completed' },
    { id: 's2', title: 'Payout of $1,250 scheduled', minutesAgo: 95, status: 'pending' },
    { id: 's3', title: 'Listing "Desk lamp" rejected', minutesAgo: 240, status: 'failed' },
    { id: 's4', title: 'New 5-star review', minutesAgo: 720, status: 'completed' },
  ],
  maintainer: [
    { id: 'm1', title: 'Deploy v2.14.0 to production', minutesAgo: 8, status: 'completed' },
    { id: 'm2', title: 'Database migration queued', minutesAgo: 55, status: 'pending' },
    { id: 'm3', title: 'Search indexer health check', minutesAgo: 150, status: 'failed' },
    { id: 'm4', title: 'Incident #87 resolved', minutesAgo: 480, status: 'completed' },
  ],
};

function buildMockDashboard(role: UserRole): DashboardData {
  return {
    role,
    metrics: MOCK_METRICS,
    activity: MOCK_ACTIVITY[role].map(({ minutesAgo: minutes, ...item }) => ({
      ...item,
      occurredAt: minutesAgo(minutes),
    })),
  };
}

export const dashboardService = {
  async getDashboard(role: UserRole, signal?: AbortSignal): Promise<DashboardData> {
    await delay(MOCK_LATENCY_MS);
    signal?.throwIfAborted();
    return buildMockDashboard(role);
  },
};
