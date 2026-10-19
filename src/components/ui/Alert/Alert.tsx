import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/utils/cn';
import styles from './Alert.module.scss';

export type AlertVariant = 'info' | 'success' | 'danger';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  className?: string;
  children: ReactNode;
}

const ICONS = { info: Info, success: CheckCircle2, danger: AlertCircle } as const;

export function Alert({ variant = 'info', title, className, children }: AlertProps) {
  const Icon = ICONS[variant];
  // Errors interrupt assistive tech; other variants are announced politely.
  const role = variant === 'danger' ? 'alert' : 'status';

  return (
    <div role={role} className={cn(styles.alert, styles[`alert--${variant}`], className)}>
      <Icon className={styles.alert__icon} aria-hidden="true" />
      <div>
        {title && <p className={styles.alert__title}>{title}</p>}
        <div className={styles.alert__content}>{children}</div>
      </div>
    </div>
  );
}
