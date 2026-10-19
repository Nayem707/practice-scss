import type { Size } from '@/types';
import { cn } from '@/utils/cn';
import styles from './Loader.module.scss';

export interface LoaderProps {
  size?: Size;
  /** Announced to screen readers. */
  label?: string;
  /** Use the surrounding text color instead of the primary color (e.g. inside buttons). */
  inheritColor?: boolean;
  className?: string;
}

export function Loader({
  size = 'md',
  label = 'Loading…',
  inheritColor = false,
  className,
}: LoaderProps) {
  return (
    <span role="status" className={cn(styles.loader, className)}>
      <span
        className={cn(
          styles.loader__spinner,
          styles[`loader__spinner--${size}`],
          inheritColor && styles['loader__spinner--inherit'],
        )}
        aria-hidden="true"
      />
      <span className={styles.loader__label}>{label}</span>
    </span>
  );
}
