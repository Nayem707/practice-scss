import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { ActivityItem, ActivityStatus } from '@/types';
import { formatDateTime } from '@/utils/format';
import styles from './ActivityList.module.scss';

const STATUS_BADGE: Record<ActivityStatus, { label: string; variant: BadgeVariant }> = {
  completed: { label: 'Completed', variant: 'success' },
  pending: { label: 'Pending', variant: 'warning' },
  failed: { label: 'Failed', variant: 'danger' },
};

export interface ActivityListProps {
  items: readonly ActivityItem[];
}

export function ActivityList({ items }: ActivityListProps) {
  return (
    <Card title="Recent activity" padding="none">
      {items.length === 0 ? (
        <p className={styles.activityList__empty}>No recent activity.</p>
      ) : (
        <ul className={styles.activityList__list}>
          {items.map((item) => {
            const badge = STATUS_BADGE[item.status];
            return (
              <li key={item.id} className={styles.activityList__item}>
                <div>
                  <p className={styles.activityList__title}>{item.title}</p>
                  <time dateTime={item.occurredAt} className={styles.activityList__time}>
                    {formatDateTime(item.occurredAt)}
                  </time>
                </div>
                <Badge variant={badge.variant}>{badge.label}</Badge>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
