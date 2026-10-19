import type { ReactNode } from 'react';
import styles from './PageHeader.module.scss';

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageHeader__title}>{title}</h1>
        {description && <p className={styles.pageHeader__description}>{description}</p>}
      </div>
      {actions && <div className={styles.pageHeader__actions}>{actions}</div>}
    </div>
  );
}
