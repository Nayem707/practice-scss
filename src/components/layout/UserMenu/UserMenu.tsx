import { useRef } from 'react';
import { ChevronDown, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useToggle } from '@/hooks/useToggle';
import { DASH_ROUTES } from '@/routes/constants/paths';
import { getInitials } from '@/utils/format';
import styles from './UserMenu.module.scss';

const USER_MENU_ID = 'user-menu-panel';

/** Disclosure-style account menu (button + popover) with logout. */
export function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, menu] = useToggle(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, menu.setOff, isOpen);
  useEscapeKey(menu.setOff, isOpen);

  if (!user) return null;

  return (
    <div ref={containerRef} className={styles.userMenu}>
      <button
        type="button"
        className={styles.userMenu__trigger}
        aria-expanded={isOpen}
        aria-controls={USER_MENU_ID}
        aria-label={`Account menu for ${user.name}`}
        onClick={menu.toggle}
      >
        <span className={styles.userMenu__avatar} aria-hidden="true">
          {getInitials(user.name)}
        </span>
        <span className={styles.userMenu__name}>{user.name}</span>
        <ChevronDown className={styles.userMenu__chevron} aria-hidden="true" />
      </button>

      {isOpen && (
        <div id={USER_MENU_ID} className={styles.userMenu__panel}>
          <div className={styles.userMenu__identity}>
            <p className={styles.userMenu__identityName}>{user.name}</p>
            <p className={styles.userMenu__identityEmail}>{user.email}</p>
          </div>
          <ul className={styles.userMenu__list}>
            <li>
              <Link
                to={DASH_ROUTES[user.role].SETTINGS}
                className={styles.userMenu__item}
                onClick={menu.setOff}
              >
                <Settings aria-hidden="true" />
                Settings
              </Link>
            </li>
            <li>
              <button type="button" className={styles.userMenu__item} onClick={logout}>
                <LogOut aria-hidden="true" />
                Log out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
