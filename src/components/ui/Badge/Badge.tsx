import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Badge.module.scss';

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

export function Badge({ variant = 'neutral', className, children }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[`badge--${variant}`], className)}>{children}</span>
  );
}
