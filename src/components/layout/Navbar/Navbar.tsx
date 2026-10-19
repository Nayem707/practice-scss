import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { PUBLIC_NAV_LINKS } from '@/config/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useToggle } from '@/hooks/useToggle';
import { ROUTES } from '@/routes/constants/paths';
import { cn } from '@/utils/cn';
import styles from './Navbar.module.scss';

const MOBILE_MENU_ID = 'public-nav-menu';

export function Navbar() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, menu] = useToggle(false);

  useEscapeKey(menu.setOff, isMenuOpen);

  const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navbar__link, isActive && styles['navbar__link--active']);

  return (
    <header className={styles.navbar}>
      <div className={styles.navbar__inner}>
        <Logo />

        <nav
          id={MOBILE_MENU_ID}
          aria-label="Main"
          className={cn(styles.navbar__nav, isMenuOpen && styles['navbar__nav--open'])}
        >
          <ul className={styles.navbar__links}>
            {PUBLIC_NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end className={getLinkClassName} onClick={menu.setOff}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.navbar__actions}>
          <ThemeToggle />
          {isAuthenticated ? (
            <ButtonLink to={ROUTES.DASH.ROOT} size="sm">
              Dashboard
            </ButtonLink>
          ) : (
            <ButtonLink to={ROUTES.AUTH.LOGIN} size="sm">
              Log in
            </ButtonLink>
          )}
          <Button
            variant="ghost"
            iconOnly
            icon={isMenuOpen ? <X /> : <Menu />}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
            className={styles.navbar__menuButton}
            onClick={menu.toggle}
          />
        </div>
      </div>
    </header>
  );
}
