import { TrendingDown, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import type { DashboardStat } from '@/types';
import { cn } from '@/utils/cn';
import { formatNumber, formatPercent } from '@/utils/format';
import styles from './StatsCard.module.scss';

export interface StatsCardProps {
  stat: DashboardStat;
}

/** A single metric with its month-over-month trend. Accent colour follows `--dash-accent`. */
export function StatsCard({ stat }: StatsCardProps) {
  const trend = stat.changePercent >= 0 ? 'up' : 'down';
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <Card as="article" className={styles.statsCard}>
      <p className={styles.statsCard__label}>{stat.label}</p>
      <p className={styles.statsCard__value}>{formatNumber(stat.value)}</p>
      <p className={cn(styles.statsCard__change, styles[`statsCard__change--${trend}`])}>
        <TrendIcon className={styles.statsCard__icon} aria-hidden="true" />
        <span>
          {formatPercent(stat.changePercent)}
          <span className="visually-hidden"> compared to last month</span>
        </span>
      </p>
    </Card>
  );
}
