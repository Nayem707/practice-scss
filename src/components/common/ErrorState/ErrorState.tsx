import type { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';
import styles from './ErrorState.module.scss';

export interface ErrorStateProps {
  title: string;
  message: string;
  actions?: ReactNode;
  fullScreen?: boolean;
  /** Use `h2` when the page already renders its own `h1`. */
  headingLevel?: 'h1' | 'h2';
}

export function ErrorState({
  title,
  message,
  actions,
  fullScreen = false,
  headingLevel: Heading = 'h1',
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(styles.errorState, fullScreen && styles['errorState--full-screen'])}
    >
      <AlertTriangle className={styles.errorState__icon} aria-hidden="true" />
      <Heading className={styles.errorState__title}>{title}</Heading>
      <p className={styles.errorState__message}>{message}</p>
      {actions && <div className={styles.errorState__actions}>{actions}</div>}
    </div>
  );
}
