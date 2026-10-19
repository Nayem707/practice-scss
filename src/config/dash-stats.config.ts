import type { DashStatConfig, UserRole } from '@/types';

/** Which metrics each role's home page shows, in display order. */
export const DASH_STATS_CONFIG: Readonly<Record<UserRole, readonly DashStatConfig[]>> = {
  admin: [
    { id: 'revenue', label: 'Revenue ($)' },
    { id: 'activeUsers', label: 'Active users' },
    { id: 'orders', label: 'Orders' },
    { id: 'openTickets', label: 'Open tickets' },
  ],
  seller: [
    { id: 'revenue', label: 'Sales ($)' },
    { id: 'orders', label: 'Orders' },
    { id: 'listings', label: 'Active listings' },
    { id: 'pendingPayouts', label: 'Pending payouts ($)' },
  ],
  maintainer: [
    { id: 'openTickets', label: 'Open tickets' },
    { id: 'incidents', label: 'Incidents' },
    { id: 'deployments', label: 'Deployments' },
    { id: 'activeUsers', label: 'Active users' },
  ],
};
