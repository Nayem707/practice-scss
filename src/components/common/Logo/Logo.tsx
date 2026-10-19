import { Link } from 'react-router-dom';
import logoUrl from '@/assets/logo.svg';
import { APP_CONFIG } from '@/config/app';
import { ROUTES } from '@/routes/constants/paths';
import { cn } from '@/utils/cn';
import styles from './Logo.module.scss';

export interface LogoProps {
  to?: string;
  showName?: boolean;
  className?: string;
}

export function Logo({ to = ROUTES.PUBLIC.HOME, showName = true, className }: LogoProps) {
  return (
    <Link to={to} className={cn(styles.logo, className)} aria-label={`${APP_CONFIG.name} home`}>
      <img src={logoUrl} alt="" className={styles.logo__mark} />
      {showName && <span className={styles.logo__name}>{APP_CONFIG.name}</span>}
    </Link>
  );
}
