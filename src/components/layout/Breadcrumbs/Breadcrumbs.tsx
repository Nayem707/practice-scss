import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { DASH_BREADCRUMB_LABELS } from '@/config/dash-nav.config';
import { buildBreadcrumbs } from '@/utils/breadcrumbs';
import styles from './Breadcrumbs.module.scss';

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const crumbs = buildBreadcrumbs(pathname, DASH_BREADCRUMB_LABELS);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className={styles.breadcrumbs__list}>
        {crumbs.map((crumb, index) => {
          const isCurrent = index === crumbs.length - 1;
          return (
            <li key={crumb.to} className={styles.breadcrumbs__item}>
              {index > 0 && (
                <ChevronRight className={styles.breadcrumbs__separator} aria-hidden="true" />
              )}
              {isCurrent ? (
                <span aria-current="page" className={styles.breadcrumbs__current}>
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.to} className={styles.breadcrumbs__link}>
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
