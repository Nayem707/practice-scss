import { useRef } from 'react';
import { X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ROLE_LABELS } from '@/config/constants';
import { DASH_NAV_CONFIG } from '@/config/dash-nav.config';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useRole } from '@/hooks/useRole';
import { DASH_ROUTES, ROUTES } from '@/routes/constants/paths';
import { cn } from '@/utils/cn';
import styles from './Sidebar.module.scss';

export const SIDEBAR_ID = 'dash-sidebar';

export interface SidebarProps {
  /** When true the sidebar renders as an off-canvas drawer (mobile). */
  isDrawer: boolean;
  isOpen: boolean;
  /** Must be referentially stable. */
  onClose: () => void;
}

/** Dashboard navigation; items come from `DASH_NAV_CONFIG` for the current user's role. */
export function Sidebar({ isDrawer, isOpen, onClose }: SidebarProps) {
  const role = useRole();
  const items = role ? DASH_NAV_CONFIG[role] : [];
  const asideRef = useRef<HTMLElement>(null);
  const isDrawerOpen = isDrawer && isOpen;

  useEscapeKey(onClose, isDrawerOpen);
  useFocusTrap(asideRef, isDrawerOpen);
  useBodyScrollLock(isDrawerOpen);

  const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(styles.sidebar__item, isActive && styles['sidebar__item--active']);

  return (
    <>
      {isDrawerOpen && (
        <div className={styles.sidebar__backdrop} onClick={onClose} aria-hidden="true" />
      )}
      <aside
        id={SIDEBAR_ID}
        ref={asideRef}
        aria-label="Dashboard navigation"
        inert={isDrawer && !isOpen}
        className={cn(
          styles.sidebar,
          isDrawer && styles['sidebar--drawer'],
          isDrawerOpen && styles['sidebar--open'],
        )}
      >
        <div className={styles.sidebar__header}>
          <div className={styles.sidebar__brand}>
            <Logo to={role ? DASH_ROUTES[role].HOME : ROUTES.DASH.ROOT} />
            {role && <Badge variant="info">{ROLE_LABELS[role]}</Badge>}
          </div>
          {isDrawer && (
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              icon={<X />}
              aria-label="Close navigation"
              onClick={onClose}
            />
          )}
        </div>

        <nav>
          <ul className={styles.sidebar__list}>
            {items.map(({ label, to, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  className={getLinkClassName}
                  onClick={isDrawer ? onClose : undefined}
                >
                  <Icon className={styles.sidebar__icon} aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
