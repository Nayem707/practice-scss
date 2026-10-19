import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { cn } from '@/utils/cn';
import styles from './ErrorPageTemplate.module.scss';

export interface ErrorPageTemplateProps {
  /** Status shown as large display text, e.g. "404". */
  code: string;
  title: string;
  message: ReactNode;
  icon: LucideIcon;
  actions?: ReactNode;
  /** Technical details (e.g. an error message); only pass in development. */
  details?: string;
  /** Page-level class, typically used to set `--error-accent`. */
  className?: string;
}

/** Shared full-screen layout for every page in `pages/error`. */
export function ErrorPageTemplate({
  code,
  title,
  message,
  icon: Icon,
  actions,
  details,
  className,
}: ErrorPageTemplateProps) {
  useDocumentTitle(title);

  return (
    <main className={cn(styles.errorPage, className)}>
      <Icon className={styles.errorPage__icon} aria-hidden="true" />
      <p className={styles.errorPage__code} aria-hidden="true">
        {code}
      </p>
      <h1 className={styles.errorPage__title}>{title}</h1>
      <p className={styles.errorPage__message}>{message}</p>
      {details && <pre className={styles.errorPage__details}>{details}</pre>}
      {actions && <div className={styles.errorPage__actions}>{actions}</div>}
    </main>
  );
}
